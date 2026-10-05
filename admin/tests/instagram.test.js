import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { Miniflare } from 'miniflare'
import { normalizeMedia, syncInstagram, instagramNews, instagramAdmin } from '../worker/instagram.js'
const mf = new Miniflare({ modules:true, script:'export default {fetch(){return new Response("test")}}', compatibilityDate:'2026-08-06', d1Databases:['DB'] })
after(() => mf.dispose())
const DB = await mf.getD1Database('DB')
const sql = await readFile(new URL('../migrations/0007_instagram.sql', import.meta.url), 'utf8')
await DB.batch(sql.split(';').filter(x => x.trim()).map(x => DB.prepare(x)))
const env = { DB, INSTAGRAM_ENABLED:'true', INSTAGRAM_ACCESS_TOKEN:'test-secret' }
const media = { id:'123', caption:'Noticias de IPN\n\nTexto de la publicación', timestamp:'2026-09-17T15:00:00Z', media_type:'IMAGE', media_url:'https://scontent.cdninstagram.com/image.jpg', permalink:'https://www.instagram.com/p/Abc123/?img_index=1' }
const admin = { role:'admin' }
const request = (method, path = '') => new Request('https://admin.example/api/instagram'+path, {method})
test('normaliza portadas, reels, enlaces y descarta contenido inválido', () => {
  const item = normalizeMedia(media)
  assert.equal(item.instagramUrl, 'https://www.instagram.com/p/Abc123/')
  assert.equal(item.title, 'Noticias de IPN')
  assert.equal(item.date, '2026-09-17')
  assert.equal(normalizeMedia({...media, media_type:'VIDEO', thumbnail_url:media.media_url}).image, media.media_url)
  assert.equal(normalizeMedia({...media, media_url:'https://evil.example/x'}).image, '')
  assert.equal(normalizeMedia({...media, permalink:'https://evil.example/x'}), null)
  assert.equal(normalizeMedia({...media, timestamp:'invalid'}), null)
})
test('sincroniza en privado, activa, conserva ante fallos y oculta contenido vencido', async () => {
  let calls = 0
  const fetcher = async (url, options) => {
    assert.equal(options.headers.Authorization, 'Bearer test-secret')
    assert.ok(!url.includes('test-secret'))
    calls++
    return Response.json(url.includes('/me?') ? { user_id:'17841478715977677', username:'ipnchilecuentaoficial' } : {data:[media,media]})
  }
  assert.deepEqual(await syncInstagram({...env, INSTAGRAM_ACCESS_TOKEN:'  test-secret\n'}, fetcher), {count:1})
  assert.equal(calls, 2)
  assert.deepEqual(await instagramNews(env), [])
  await instagramAdmin(request('PUT'), env, admin, async () => ({enabled:true}))
  assert.equal((await instagramNews(env)).length, 1)
  const status = await (await instagramAdmin(request('GET'), env, admin)).json()
  assert.equal(status.enabled, true)
  assert.ok(!JSON.stringify(status).includes('test-secret'))
  await assert.rejects(syncInstagram(env, fetcher), e => e.status === 429)
  await DB.prepare('UPDATE instagram_feed SET locked_until=0').run()
  await assert.rejects(syncInstagram(env, async () => Response.json({error:{code:190,message:'test-secret'}}, {status:400})), /caducó/)
  assert.equal((await instagramNews(env)).length, 1)
  const failed = await (await instagramAdmin(request('GET'), env, admin)).json()
  assert.ok(!JSON.stringify(failed).includes('test-secret'))
  await DB.prepare('UPDATE instagram_feed SET synced_at=?').bind('2020-01-01T00:00:00Z').run()
  assert.deepEqual(await instagramNews(env), [])
  await instagramAdmin(request('PUT'), env, admin, async () => ({enabled:false}))
  await assert.rejects(instagramAdmin(request('PUT'), env, admin, async () => ({enabled:true})), e => e.status === 409)
})
test('rechaza cuenta incorrecta y editores; desactivado no consulta D1', async () => {
  await DB.prepare('UPDATE instagram_feed SET locked_until=0').run()
  await assert.rejects(syncInstagram(env, async () => Response.json({user_id:'other',username:'other'})), /cuenta oficial/)
  await assert.rejects(instagramAdmin(request('GET'), env, {role:'editor'}), e => e.status === 403)
  assert.deepEqual(await instagramNews({}), [])
  const status = await (await instagramAdmin(request('GET'), {}, admin)).json()
  assert.equal(status.configured, false)
})
