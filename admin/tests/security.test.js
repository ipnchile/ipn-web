import { test } from 'node:test'
import assert from 'node:assert/strict'
import { generateKeyPair, SignJWT } from 'jose'
import { verifyIdentity, checkMutation, requireAdmin } from '../worker/auth.js'
import { validateContent, safeLink, mediaValue } from '../worker/content.js'
import worker, { imageMime } from '../worker/index.js'
const env = {ACCESS_ISSUER:'https://ipn-test.cloudflareaccess.com',ACCESS_AUD:'ipn-test-audience',ADMIN_EMAILS:'master.ipnchile@gmail.com',EDITOR_EMAILS:'editor@example.com',ADMIN_ORIGIN:'https://admin.ipnchile.cl'}
const {publicKey,privateKey} = await generateKeyPair('RS256')
async function token(overrides = {}, key = privateKey) {
  return new SignJWT({sub:'test-user',email:'master.ipnchile@gmail.com',iss:env.ACCESS_ISSUER,aud:env.ACCESS_AUD,iat:Math.floor(Date.now()/1000),exp:Math.floor(Date.now()/1000)+3600,...overrides}).setProtectedHeader({alg:'RS256'}).sign(key)
}
test('Access verifica firma, emisor, audiencia, expiración y correo autorizado', async () => {
  assert.equal((await verifyIdentity(await token(),env,publicKey)).role,'admin')
  assert.equal((await verifyIdentity(await token({email:'editor@example.com'}),env,publicKey)).role,'editor')
  const foreign = await generateKeyPair('RS256')
  for (const bad of [await token({aud:'other'}),await token({iss:'https://attacker.example'}),await token({exp:1}),await token({},foreign.privateKey),await token({email:'unknown@example.com'}),null]) {
    await assert.rejects(verifyIdentity(bad,env,publicKey),error => [401,403].includes(error.status))
  }
})
test('El dominio alternativo y las cabeceras de correo no permiten entrar', async () => {
  const response = await worker.fetch(new Request('https://other.workers.dev/api/documents',{headers:{'Cf-Access-Authenticated-User-Email':env.ADMIN_EMAILS}}),env)
  assert.equal(response.status,403)
  assert.equal(response.headers.get('Cache-Control'),'no-store')
})
test('El editor no publica y los POST deben tener origen y cabecera propios', () => {
  assert.throws(() => requireAdmin({role:'editor'}),error => error.status === 403)
  requireAdmin({role:'admin'})
  for (const headers of [{},{Origin:'https://evil.example','X-IPN-Request':'admin'},{Origin:env.ADMIN_ORIGIN}]) assert.throws(() => checkMutation(new Request(env.ADMIN_ORIGIN,{method:'POST',headers}),env))
  checkMutation(new Request(env.ADMIN_ORIGIN,{method:'POST',headers:{Origin:env.ADMIN_ORIGIN,'X-IPN-Request':'admin'}}),env)
})
test('Se rechazan enlaces ejecutables, imágenes externas y fechas imposibles', () => {
  for (const url of ['javascript:alert(1)','//evil.example','/\\evil.example','data:text/html,test']) assert.throws(() => safeLink(url))
  assert.equal(safeLink('/actualidad/eventos?evento=5'),'/actualidad/eventos?evento=5')
  assert.throws(() => mediaValue('https://evil.example/photo.png'))
  assert.throws(() => validateContent('news',{title:'Prueba',date:'2026-02-30'}))
  assert.throws(() => validateContent('event',{title:'Prueba',startDate:'2026-09-27',endDate:'2026-09-25',location:'Nacimiento'}))
  assert.throws(() => imageMime(new TextEncoder().encode('<svg onload="alert(1)"></svg>')))
})
