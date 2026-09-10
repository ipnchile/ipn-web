// Development only. This module is never imported by the production Worker.
import { Miniflare } from 'miniflare'
import { readFile, readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve, extname, sep } from 'node:path'
import worker, { adminRoute } from '../worker/index.js'

export async function createLocalAdmin() {
  const state = fileURLToPath(new URL('../.wrangler/local-admin/', import.meta.url))
  const mf = new Miniflare({ modules: true, script: 'export default {fetch(){return new Response("local")}}', compatibilityDate: '2026-08-06', d1Databases: ['DB'], d1Persist: state + '/d1', r2Buckets: ['DRAFT_MEDIA'], r2Persist: state + '/r2' })
  const DB = await mf.getD1Database('DB'), DRAFT_MEDIA = await mf.getR2Bucket('DRAFT_MEDIA')
  await DB.exec('CREATE TABLE IF NOT EXISTS local_migrations (name TEXT PRIMARY KEY)')
  const migrations = new URL('../migrations/', import.meta.url)
  for (const name of (await readdir(migrations)).filter(n => n.endsWith('.sql')).sort()) {
    if (await DB.prepare('SELECT name FROM local_migrations WHERE name=?').bind(name).first()) continue
    const sql = await readFile(new URL(name, migrations), 'utf8')
    const statements = sql.replace(/--[^\n]*/g, '').replace(/\r?\n/g, ' ').replace(/;\s+(?=CREATE|INSERT|DROP|ALTER|PRAGMA)/g, ';\n').split('\n').filter(s => s.trim()).map(s => DB.prepare(s))
    await DB.batch([...statements, DB.prepare('INSERT INTO local_migrations(name) VALUES(?)').bind(name)])
  }
  const dist = fileURLToPath(new URL('../dist/', import.meta.url))
  const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'}
  async function middleware(req, res, next) {
    if ((req.url || '').split('?')[0] === '/sitemap.xml') req.url = '/public/sitemap.xml'
    const path = (req.url || '/').split('?')[0]
    if (!/^\/(?:mantenedor(?:\/|$)|api(?:\/|$)|public\/(?:content|directory|media|sitemap\.xml)(?:\/|$))/.test(path)) return next()
    const host = req.headers.host || ''
    const loopback = ['127.0.0.1','::1','::ffff:127.0.0.1'].includes(req.socket.remoteAddress)
    if (!loopback || !/^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host)) { res.writeHead(403); res.end('El mantenedor local solo está disponible en este computador.'); return }
    const origin = `http://${host}`
    try {
      if (path === '/mantenedor') { res.writeHead(302,{Location:'/mantenedor/'}); res.end(); return }
      if (path.startsWith('/mantenedor/')) {
        let relative = decodeURIComponent(path.slice('/mantenedor/'.length))
        if (!relative || !extname(relative)) relative = 'index.html'
        const file = resolve(dist, relative)
        if (!file.startsWith(resolve(dist) + sep)) { res.writeHead(403); res.end(); return }
        const data = await readFile(file)
        res.writeHead(200, {'Content-Type':mime[extname(file)] || 'application/octet-stream','Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow'}); res.end(data); return
      }
      const chunks = []; let size = 0
      for await (const chunk of req) { size += chunk.length; if (size > 5_000_000) throw Object.assign(new Error('Archivo demasiado grande'), {status:413}); chunks.push(chunk) }
      const request = new Request(origin + req.url, { method:req.method, headers:req.headers, ...(!['GET','HEAD'].includes(req.method) && {body:Buffer.concat(chunks)}) })
      const env = {DB,DRAFT_MEDIA,ADMIN_ORIGIN:origin,PUBLIC_ORIGIN:origin,ALLOW_MEDIA_UPLOADS:'true'}
      let response
      if (path === '/api/me') response = Response.json({email:'Administrador local',role:'admin',mediaUploads:true,local:true})
      else response = path.startsWith('/public/') ? await worker.fetch(request,env) : await adminRoute(request,env,new URL(request.url),{email:'local@ipn.test',role:'admin'})
      res.writeHead(response.status,Object.fromEntries(response.headers)); res.end(Buffer.from(await response.arrayBuffer()))
    } catch (e) { res.writeHead(e.status || (e.code === 'ENOENT' ? 503 : 500),{'Content-Type':'application/json'});res.end(JSON.stringify({error:e.code === 'ENOENT' ? 'Compile el panel con npm run admin:build y recargue.' : e.message})) }
  }
  return { middleware, dispose: () => mf.dispose() }
}
