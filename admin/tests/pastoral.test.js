import { test,after } from 'node:test'
import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {Miniflare} from 'miniflare'
import worker,{adminRoute} from '../worker/index.js'
import {validDate} from '../worker/pastoral.js'
const mf=new Miniflare({modules:true,script:'export default {fetch(){return new Response("ok")}}',compatibilityDate:'2026-08-06',d1Databases:['DB']})
after(()=>mf.dispose())
const DB=await mf.getD1Database('DB')
for(const name of ['0003_directory.sql','0004_initial_directory.sql','0008_pastoral_registry.sql']) {
  const sql=await readFile(new URL('../migrations/'+name,import.meta.url),'utf8')
  await DB.exec(sql.replace(/--[^\n]*/g,'').replace(/\n/g,' ').replace(/; (?=CREATE|INSERT)/g,';\n'))
}
const origin='https://admin.ipnchile.cl',env={DB,ADMIN_ORIGIN:origin},identity={email:'admin@example.com',role:'admin'}
function call(path,method='GET',body,role='admin',goodOrigin=true) {
  const request=new Request(origin+path,{method,headers:{Origin:goodOrigin?origin:'https://evil.example','X-IPN-Request':'admin','Content-Type':'application/json'},body:body?JSON.stringify(body):undefined})
  return adminRoute(request,env,new URL(request.url),{...identity,role})
}
test('Privacidad, cumpleaños, conservación de otros datos y concurrencia',async()=>{
  await assert.rejects(call('/api/pastoral','GET',undefined,'editor'),e=>e.status===403)
  await assert.rejects(call('/api/pastoral/pastor-1','PUT',{role:'pastor',fecha_nacimiento:'1957-09-11'},'admin',false),e=>e.status===403)
  const first=await (await call('/api/pastoral/pastor-1','PUT',{role:'pastor',fecha_nacimiento:'1957-09-11',updated_at:null})).json()
  await DB.prepare('UPDATE pastoral_profiles SET telefono=? WHERE person_id=?').bind('privado','pastor-1').run()
  const updated=await (await call('/api/pastoral/pastor-1','PUT',{role:'pastor',fecha_nacimiento:'1957-10-11',updated_at:first.updated_at})).json()
  assert.equal(updated.telefono,'privado')
  await assert.rejects(call('/api/pastoral/pastor-1','PUT',{role:'pastor',fecha_nacimiento:'1957-01-01',updated_at:first.updated_at}),e=>e.status===409)
  assert.equal((await (await call('/api/pastoral/birthdays?month=10')).json()).length,1)
  assert.equal((await (await call('/api/pastoral/birthdays?month=09')).json()).length,0)
  await assert.rejects(call('/api/pastoral/birthdays?month=13'),e=>e.status===400)
  const data=await (await worker.fetch(new Request(origin+'/public/directory'),env)).json()
  assert.ok(!JSON.stringify(data).includes('fecha_nacimiento'))
  assert.ok(!JSON.stringify(data).includes('privado'))
})
test('Fechas reales, años de nacimiento y ausencia explícita',()=>{
  assert.equal(validDate('1960-02-29'),'1960-02-29')
  assert.equal(validDate(''),null)
  for(const date of ['1959-02-29','0057-09-11','2100-01-01','11/09/1957']) assert.throws(()=>validDate(date))
})
