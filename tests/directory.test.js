import {test} from 'node:test'
import assert from 'node:assert/strict'
import {projectChurches,projectAuthorities} from '../src/utils/directory.js'
test('La proyección pública omite personas retiradas y conserva la iglesia',()=>{
  const source={churches:[{id:'c',pastor_id:'p',pastora_id:'retirada',foto_url:'https://media.ipnchile.cl/c.webp'}],people:[{id:'p',nombre:'Pastor',email:'pastor@ipnchile.cl',foto_url:'https://media.ipnchile.cl/p.webp',cargos:[{area:'tribunal',cargo:'Miembro',orden:0}]}]}
  const [c]=projectChurches(source)
  assert.equal(c.pastor,'Pastor');assert.equal(c.pastora,'');assert.equal(c.emailPastora,'')
  assert.equal(c.fotoIglesia,source.churches[0].foto_url)
  assert.equal(projectAuthorities(source)[0].nombre,'Pastor')
})
