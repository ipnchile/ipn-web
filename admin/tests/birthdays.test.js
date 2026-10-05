import { test } from 'node:test'
import assert from 'node:assert/strict'
import { todayBirthdays,publicBirthdays } from '../worker/birthdays.js'
const person = (monthDay,nombre='Ana') => ({id:nombre,nombre,role:'pastora',monthDay,fecha_nacimiento:'1960-01-01',rut:'private'})
test('Cumpleaños usa el día de Chile, incluye coincidencias y excluye datos privados',()=>{
  const rows=todayBirthdays([person('10-05'),person('10-05','María'),person('10-06','Otra')],new Date('2026-10-06T01:00:00Z'))
  assert.equal(rows.length,2)
  assert.equal(rows[0].daysUntil,0)
  assert.deepEqual(Object.keys(rows[0]).sort(),['daysUntil','id','monthDay','nombre','role'].sort())
})
test('No muestra cumpleaños futuros ni pasados, incluso al cambiar de año',()=>{
  assert.deepEqual(todayBirthdays([person('01-01'),person('12-30')],new Date('2026-12-31T15:00:00Z')),[])
  assert.deepEqual(todayBirthdays([person('02-29')],new Date('2027-02-28T15:00:00Z')),[])
  assert.equal(todayBirthdays([person('02-29')],new Date('2028-02-29T15:00:00Z')).length,1)
  assert.deepEqual(todayBirthdays([],new Date()),[])
})
test('La consulta pública usa solo nombres publicados y día/mes',async()=>{
  let sql
  await publicBirthdays({prepare(value){sql=value;return {all:async()=>({results:[]})}}})
  assert.match(sql,/d\.published IS NOT NULL/)
  assert.match(sql,/substr\(p\.fecha_nacimiento,6\)/)
  assert.ok(!sql.includes('d.draft'))
})
