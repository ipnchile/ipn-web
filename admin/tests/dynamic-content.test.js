import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { Miniflare } from 'miniflare'
import worker, { adminRoute } from '../worker/index.js'
import { validateContent } from '../worker/content.js'
import paths from '../../src/data/sitemapPaths.js'
import { routes } from '../../src/router/routes.js'
const mf = new Miniflare({modules:true,script:'export default {fetch(){return new Response("test")}}',compatibilityDate:'2026-08-06',d1Databases:['DB']})
after(() => mf.dispose())
const db = await mf.getD1Database('DB')
async function migrate(name) {
  const sql = await readFile(new URL('../migrations/'+name,import.meta.url),'utf8')
  await db.batch(sql.replace(/--[^\n]*/g,'').replace(/\r?\n/g,' ').replace(/;\s+(?=CREATE|INSERT|DROP|ALTER|PRAGMA)/g,';\n').split('\n').filter(s=>s.trim()).map(s=>db.prepare(s)))
}
for (const name of ['0001_content.sql','0002_initial_content.sql','0003_directory.sql','0004_initial_directory.sql']) await migrate(name)
const before = await db.prepare('SELECT * FROM documents ORDER BY id').all(), historyBefore = await db.prepare('SELECT * FROM history ORDER BY id').all()
await migrate('0005_video_library.sql');await migrate('0006_initial_videos.sql')
const origin='https://admin.example.test', env={DB:db,ADMIN_ORIGIN:origin,PUBLIC_ORIGIN:origin}, admin={email:'test@example.test',role:'admin'}
const call=async(path,method,body,identity=admin)=>adminRoute(new Request(origin+path,{method,headers:{Origin:origin,'X-IPN-Request':'admin','Content-Type':'application/json'},body:JSON.stringify(body)}),env,new URL(origin+path),identity)
const content=async()=> (await worker.fetch(new Request(origin+'/public/content'),env)).json()
const sitemap=async()=> (await worker.fetch(new Request(origin+'/public/sitemap.xml'),env)).text()
test('La migración conserva documentos e historial y siembra los dos videos',async()=>{
  assert.deepEqual((await db.prepare("SELECT * FROM documents WHERE kind!='video' ORDER BY id").all()).results,before.results)
  assert.deepEqual((await db.prepare('SELECT * FROM history WHERE id<=? ORDER BY id').bind(historyBefore.results.at(-1).id).all()).results,historyBefore.results)
  assert.equal((await db.prepare('PRAGMA foreign_key_check').all()).results.length,0)
  assert.equal((await content()).videos.length,2)
  await assert.rejects(db.prepare("UPDATE history SET actor='changed'").run(),/immutable/)
})
test('Valida videos, orden y botón sin aceptar enlaces ejecutables',()=>{
  const draft={title:'Video',videoUrl:'https://youtu.be/VEPseBfwQZE',order:0}
  assert.match(validateContent('video',draft).videoUrl,/watch\?v=VEPseBfwQZE/)
  for(const extra of [{videoUrl:'https://evil.test/video'},{order:-1},{order:1.5},{action:{label:'Donar',to:'javascript:alert(1)'}}]) assert.throws(()=>validateContent('video',{...draft,...extra}),e=>e.status===400)
})
test('Crear, publicar, editar y retirar biblioteca no requiere recompilar',async()=>{
  let row=await(await call('/api/documents','POST',{kind:'video',draft:{title:'Prueba dinámica',videoUrl:'https://youtu.be/abcdefghijk',category:'Conferencias',order:4,action:{label:'Quiero donar',to:'/donaciones'}}})).json()
  assert.ok(!(await content()).videos.some(v=>v.id===row.id))
  await assert.rejects(call('/api/documents/'+row.id+'/publish','POST',{revision:row.revision},{email:'editor',role:'editor'}),e=>e.status===403)
  row=await(await call('/api/documents/'+row.id+'/publish','POST',{revision:row.revision})).json()
  assert.equal((await content()).videos.find(v=>v.id===row.id).action.to,'/donaciones')
  row=await(await call('/api/documents/'+row.id,'PUT',{revision:row.revision,draft:{...row.draft,title:'Cambio privado'}})).json()
  assert.equal((await content()).videos.find(v=>v.id===row.id).title,'Prueba dinámica')
  await call('/api/documents/'+row.id+'/unpublish','POST',{revision:row.revision})
  assert.ok(!(await content()).videos.some(v=>v.id===row.id))
})
test('Sitemap consulta solo eventos e iglesias publicados y responde XML',async()=>{
  assert.deepEqual(paths,routes.filter(r=>!r.meta?.noindex&&!r.path.includes(':')).map(r=>r.path))
  let row=await(await call('/api/documents','POST',{kind:'event',draft:{title:'Evento dinámico',startDate:'2026-10-10',endDate:'2026-10-10',location:'Nacimiento'}})).json()
  assert.ok(!(await sitemap()).includes(row.id))
  row=await(await call('/api/documents/'+row.id+'/publish','POST',{revision:row.revision})).json()
  assert.ok((await sitemap()).includes('?evento='+row.id))
  await call('/api/documents/'+row.id+'/unpublish','POST',{revision:row.revision});assert.ok(!(await sitemap()).includes(row.id))
  const church=(await db.prepare("SELECT * FROM directory_records WHERE kind='church' AND published IS NOT NULL LIMIT 1").all()).results[0]
  const slug=JSON.parse(church.published).slug;assert.ok((await sitemap()).includes('/iglesias/'+slug))
  await db.prepare('UPDATE directory_records SET published=NULL WHERE id=?').bind(church.id).run();assert.ok(!(await sitemap()).includes('/iglesias/'+slug))
  const response=await worker.fetch(new Request(origin+'/public/sitemap.xml'),env)
  assert.match(response.headers.get('Content-Type'),/application\/xml/);assert.equal(response.headers.get('Cache-Control'),'no-store')
  assert.ok(!(await response.text()).includes('/mantenedor'))
})
