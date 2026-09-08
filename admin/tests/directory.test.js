import {test,after} from 'node:test'
import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {Miniflare} from 'miniflare'
import worker,{adminRoute} from '../worker/index.js'
import {validateDirectory,photoUrl} from '../worker/directory.js'
const mf=new Miniflare({modules:true,script:'export default {fetch(){return new Response("ok")}}',compatibilityDate:'2026-08-06',d1Databases:['DB']})
after(()=>mf.dispose())
const db=await mf.getD1Database('DB')
for(const migration of ['0003_directory.sql','0004_initial_directory.sql']) {
  const sql=await readFile(new URL('../migrations/'+migration,import.meta.url),'utf8')
  // Migration statements are already one per line, except the CREATE TABLE.
  await db.exec(sql.replace(/--[^\n]*/g,'').replace(/\n/g,' ').replace(/; (?=CREATE|INSERT)/g,';\n'))
}
const env={DB:db,ADMIN_ORIGIN:'https://admin.ipnchile.cl'}
const admin={email:'master.ipnchile@gmail.com',role:'admin'},editor={email:'editor@example.com',role:'editor'}
async function call(path,method='GET',body,identity=admin) {
  const req=new Request(env.ADMIN_ORIGIN+path,{method,headers:{Origin:env.ADMIN_ORIGIN,'X-IPN-Request':'admin','Content-Type':'application/json'},body:body ? JSON.stringify(body):undefined})
  return adminRoute(req,env,new URL(req.url),identity)
}
const publicData=async()=> (await worker.fetch(new Request('https://public.example/public/directory'),env)).json()
test('Migración preserva 41 iglesias, referencias y fotos exclusivamente mediante URLs R2',async()=>{
  const data=await publicData()
  assert.equal(data.churches.length,41)
  assert.equal(data.people.length,91)
  for(const c of data.churches)for(const id of [c.pastor_id,c.pastora_id].filter(Boolean))assert.ok(data.people.some(p=>p.id===id))
  for(const item of [...data.people,...data.churches])assert.equal(photoUrl(item.foto_url),item.foto_url)
})
test('Rechaza base64, rutas locales, credenciales, hosts ajenos y datos privados no previstos',()=>{
  for(const url of ['data:image/png;base64,AA','/images/a.jpg','asset:abc','https://evil.example/a.jpg','https://user:pass@media.ipnchile.cl/a.jpg'])assert.throws(()=>photoUrl(url))
  const value=validateDirectory('person',{nombre:'Persona',foto_url:'',cargos:[],rut:'privado',password:'secreto'})
  assert.equal(value.rut,undefined)
  assert.equal(value.password,undefined)
})
test('Borrador, publicación, retiro y concurrencia; solo administrador modifica',async()=>{
  const draft={nombre:'Persona prueba',foto_url:'https://media.ipnchile.cl/test.webp',grado:'',email:'',cargos:[]}
  await assert.rejects(call('/api/directory','POST',{kind:'person',draft},editor),e=>e.status===403)
  let row=await (await call('/api/directory','POST',{kind:'person',draft})).json()
  assert.ok(!(await publicData()).people.some(p=>p.id===row.id))
  row=await (await call('/api/directory/'+row.id+'/publish','POST',{revision:row.revision})).json()
  const previous=row.revision
  row=await (await call('/api/directory/'+row.id,'PUT',{revision:row.revision,draft:{...draft,nombre:'Borrador cambiado'}})).json()
  assert.equal((await publicData()).people.find(p=>p.id===row.id).nombre,'Persona prueba')
  await assert.rejects(call('/api/directory/'+row.id,'PUT',{revision:previous,draft}),e=>e.status===409)
  await call('/api/directory/'+row.id+'/unpublish','POST',{revision:row.revision})
  assert.ok(!(await publicData()).people.some(p=>p.id===row.id))
})
test('No publica iglesias con personas en borrador ni permite imágenes subidas',async()=>{
  const person=await (await call('/api/directory','POST',{kind:'person',draft:{nombre:'Privado',foto_url:'',cargos:[]}})).json()
  const church=await (await call('/api/directory','POST',{kind:'church',draft:{nombre:'Prueba',slug:'test-church',pastor_id:person.id}})).json()
  await assert.rejects(call('/api/directory/'+church.id+'/publish','POST',{revision:church.revision}),e=>e.status===400)
  await assert.rejects(call('/api/media','POST',{}),e=>e.status===403)
})
