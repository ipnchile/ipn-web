import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { Miniflare } from 'miniflare'
import worker, { adminRoute, revise } from '../worker/index.js'
const mf = new Miniflare({modules:true,script:'export default {fetch(){return new Response("test")}}',compatibilityDate:'2026-08-06',d1Databases:['DB'],r2Buckets:['DRAFT_MEDIA']})
after(() => mf.dispose())
const db = await mf.getD1Database('DB'), bucket = await mf.getR2Bucket('DRAFT_MEDIA')
const schema = await readFile(new URL('../migrations/0001_content.sql',import.meta.url),'utf8')
// exec accepts one statement per line, including triggers with internal semicolons.
await db.exec(schema.replace(/--[^\n]*/g,'').replace(/\n/g,' ').replace(/; CREATE/g,';\nCREATE'))
const env = {DB:db,DRAFT_MEDIA:bucket,ADMIN_ORIGIN:'https://admin.ipnchile.cl',PUBLIC_ORIGIN:'https://ipn-admin.example.com'}
const admin = {email:'admin@example.com',role:'admin'}, editor = {email:'editor@example.com',role:'editor'}
async function call(path,method='GET',body,identity=admin) {
  const request = new Request(env.ADMIN_ORIGIN+path,{method,headers:{Origin:env.ADMIN_ORIGIN,'X-IPN-Request':'admin','Content-Type':'application/json'},body:body ? JSON.stringify(body) : undefined})
  return adminRoute(request,env,new URL(request.url),identity)
}
test('Ciclo completo: borrador privado, publicación, edición aislada, retiro e historial', async () => {
  const draft = {title:'Noticia de prueba',date:'2026-09-07',paragraphs:['Texto seguro']}
  let response = await call('/api/documents','POST',{kind:'news',draft},editor)
  assert.equal(response.status,201)
  let row = await response.json(), id = row.id
  const publicContent = async () => (await worker.fetch(new Request(env.PUBLIC_ORIGIN+'/public/content'),env)).json()
  assert.equal((await publicContent()).news.length,0)
  await assert.rejects(call(`/api/documents/${id}/publish`,'POST',{revision:1},editor),e => e.status === 403)
  row = await (await call(`/api/documents/${id}/publish`,'POST',{revision:1})).json()
  assert.equal((await publicContent()).news[0].title,draft.title)
  assert.equal('updated_by' in (await publicContent()).news[0],false)
  row = await (await call(`/api/documents/${id}`,'PUT',{revision:row.revision,draft:{...draft,title:'Cambio privado'}},editor)).json()
  assert.equal((await publicContent()).news[0].title,draft.title)
  await assert.rejects(call(`/api/documents/${id}`,'PUT',{revision:1,draft}),e => e.status === 409)
  row = await (await call(`/api/documents/${id}/unpublish`,'POST',{revision:row.revision})).json()
  assert.equal((await publicContent()).news.length,0)
  row = await (await call(`/api/documents/${id}/restore`,'POST',{revision:row.revision,targetRevision:1},editor)).json()
  assert.equal(row.draft.title,draft.title); assert.equal(row.published,null)
  const history = await (await call(`/api/documents/${id}/history`)).json()
  assert.deepEqual(history.map(x => x.action),['restore','unpublish','save','publish','create'])
  await assert.rejects(db.prepare('DELETE FROM history WHERE document_id=?').bind(id).run())
})
test('La escritura concurrente conserva solo una versión y un registro de auditoría', async () => {
  const row = await db.prepare('SELECT * FROM documents LIMIT 1').first()
  const result = await Promise.allSettled([revise(db,row,row.draft,null,admin,'save'),revise(db,row,row.draft,null,editor,'save')])
  assert.equal(result.filter(x => x.status === 'fulfilled').length,1)
  assert.equal(result.find(x => x.status === 'rejected').reason.status,409)
  const saved = await db.prepare('SELECT revision FROM documents WHERE id=?').bind(row.id).first()
  const history = await db.prepare('SELECT count(*) AS total FROM history WHERE document_id=?').bind(row.id).first()
  assert.equal(saved.revision,history.total)
})
test('Las imágenes privadas solo se exponen mientras estén referenciadas por una publicación', async () => {
  const id = crypto.randomUUID(), draft = {title:'Foto',date:'2026-09-07',image:`asset:${id}`}
  await bucket.put(id,new Uint8Array([1,2,3]),{httpMetadata:{contentType:'image/webp'}})
  await db.prepare('INSERT INTO media VALUES(?,?,?,?,?)').bind(id,'image/webp',3,new Date().toISOString(),admin.email).run()
  const url = env.PUBLIC_ORIGIN+`/public/media/${id}`
  assert.equal((await worker.fetch(new Request(url),env)).status,404)
  let row = await (await call('/api/documents','POST',{kind:'news',draft})).json()
  row = await (await call(`/api/documents/${row.id}/publish`,'POST',{revision:row.revision})).json()
  assert.equal((await worker.fetch(new Request(url),env)).status,200)
  await call(`/api/documents/${row.id}/unpublish`,'POST',{revision:row.revision})
  assert.equal((await worker.fetch(new Request(url),env)).status,404)
})
