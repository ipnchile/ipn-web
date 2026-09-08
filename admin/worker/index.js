import { directoryAdmin, directoryPublic } from './directory.js'
import { authenticate, checkMutation, requireAdmin, HttpError } from './auth.js'
import { kinds, validateContent, mediaIds, publicData } from './content.js'

const json = (data, status = 200, extra = {}) => Response.json(data, { status, headers: { 'Cache-Control':'no-store', ...extra } })
const securityHeaders = {
  'X-Content-Type-Options':'nosniff', 'Referrer-Policy':'same-origin', 'X-Frame-Options':'DENY',
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' https://media.ipnchile.cl; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'",
  'Permissions-Policy':'camera=(), microphone=(), geolocation=()', 'X-Robots-Tag':'noindex, nofollow'
}
async function boundedBody(request, limit) {
  if (Number(request.headers.get('Content-Length')) > limit) throw new HttpError(413, 'El archivo supera el límite permitido.')
  if (!request.body) throw new HttpError(400, 'Falta el contenido.')
  const reader = request.body.getReader(), chunks = []; let size = 0
  while (true) {
    const {done,value} = await reader.read(); if (done) break
    size += value.byteLength
    if (size > limit) { await reader.cancel(); throw new HttpError(413, 'El archivo supera el límite permitido.') }
    chunks.push(value)
  }
  const bytes = new Uint8Array(size); let offset = 0
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength }
  return bytes
}
async function bodyJson(request) {
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) throw new HttpError(415,'Se requiere JSON.')
  try { return JSON.parse(new TextDecoder().decode(await boundedBody(request, 200_000))) }
  catch (error) { if (error instanceof HttpError) throw error; throw new HttpError(400, 'JSON inválido.') }
}
export function imageMime(bytes) {
  const str = (a,b) => new TextDecoder().decode(bytes.slice(a,b))
  if (bytes.length >= 12 && str(0,4) === 'RIFF' && str(8,12) === 'WEBP') return 'image/webp'
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg'
  if (bytes.length >= 8 && [137,80,78,71,13,10,26,10].every((v,i) => bytes[i] === v)) return 'image/png'
  throw new HttpError(415,'Solo se permiten imágenes WebP, JPEG y PNG. No se permite SVG.')
}
async function checkMedia(data, db) {
  for (const id of mediaIds(data)) if (!await db.prepare('SELECT id FROM media WHERE id = ?').bind(id).first()) throw new HttpError(400,'La imagen seleccionada no existe.')
}
async function getDoc(db, id) {
  const row = await db.prepare('SELECT * FROM documents WHERE id = ?').bind(id).first()
  if (!row) throw new HttpError(404,'Publicación no encontrada.')
  return row
}
// A single D1 batch is a transaction. The audit insert uses changes() from the
// optimistic update so a stale client can never write a phantom revision.
export async function revise(db, row, draft, published, identity, action) {
  const now = new Date().toISOString(), revision = row.revision + 1
  const result = await db.batch([
    db.prepare('UPDATE documents SET draft=?, published=?, revision=?, updated_at=?, updated_by=? WHERE id=? AND revision=?').bind(draft,published,revision,now,identity.email,row.id,row.revision),
    db.prepare('INSERT INTO history(document_id,revision,action,actor,created_at,snapshot) SELECT ?,?,?,?,?,? WHERE changes()=1').bind(row.id,revision,action,identity.email,now,draft)
  ])
  if (result[0].meta.changes !== 1) throw new HttpError(409,'Otra persona modificó esta publicación. Recargue antes de continuar.')
  return getDoc(db,row.id)
}
function dto(row) { return {...row, draft: JSON.parse(row.draft), published: row.published ? JSON.parse(row.published) : null} }
async function publicRoute(request, env, url) {
  if (!['GET','HEAD'].includes(request.method)) throw new HttpError(405,'Método no permitido.')
  if (url.pathname === '/public/directory') return json(await directoryPublic(env.DB),200,{'Access-Control-Allow-Origin':'*'})
  if (url.pathname === '/public/content') {
    const {results} = await env.DB.prepare('SELECT id,kind,published FROM documents WHERE published IS NOT NULL ORDER BY updated_at DESC').all()
    const output = {news:[],events:[],banner:null}
    for (const row of results) {
      const item = publicData(row,env.PUBLIC_ORIGIN)
      if (row.kind === 'banner') output.banner = item
      else output[row.kind === 'news' ? 'news' : 'events'].push(item)
    }
    return json(output,200,{'Access-Control-Allow-Origin':'*'})
  }
  const match = url.pathname.match(/^\/public\/media\/([0-9a-f-]{36})$/)
  if (!match) throw new HttpError(404,'No encontrado.')
  // No public bucket or signed draft URLs: publication is checked on every read.
  const row = await env.DB.prepare("SELECT id FROM documents WHERE published IS NOT NULL AND (json_extract(published,'$.image')=? OR json_extract(published,'$.thumbnail')=?) LIMIT 1").bind(`asset:${match[1]}`,`asset:${match[1]}`).first()
  if (!row) throw new HttpError(404,'No encontrado.')
  return readMedia(env,match[1],request.method)
}
async function readMedia(env, id, method) {
  const object = await env.DRAFT_MEDIA.get(id)
  if (!object) throw new HttpError(404,'Imagen no encontrada.')
  return new Response(method === 'HEAD' ? null : object.body,{headers:{'Content-Type':object.httpMetadata.contentType,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}})
}
export async function adminRoute(request, env, url, identity) {
  const db = env.DB, path = url.pathname
  if (!['GET','HEAD'].includes(request.method)) checkMutation(request,env)
  if (path === '/api/directory' || path.startsWith('/api/directory/')) return directoryAdmin(request,env,url,identity,bodyJson)
  if (path === '/api/me' && request.method === 'GET') return json({...identity,mediaUploads:env.ALLOW_MEDIA_UPLOADS === 'true'})
  if (path === '/api/documents' && request.method === 'GET') {
    const {results} = await db.prepare('SELECT * FROM documents ORDER BY updated_at DESC').all()
    return json(results.map(dto))
  }
  if (path === '/api/documents' && request.method === 'POST') {
    const input = await bodyJson(request), kind = input.kind
    if (!kinds.includes(kind)) throw new HttpError(400,'Tipo inválido.')
    const draft = validateContent(kind,input.draft); await checkMedia(draft,db)
    const id = kind === 'banner' ? 'home-banner' : crypto.randomUUID(), now = new Date().toISOString(), serialized = JSON.stringify(draft)
    if (await db.prepare('SELECT id FROM documents WHERE id=?').bind(id).first()) throw new HttpError(409,'El banner principal ya existe. Edítelo desde la lista.')
    await db.batch([
      db.prepare('INSERT INTO documents(id,kind,draft,updated_at,updated_by) VALUES(?,?,?,?,?)').bind(id,kind,serialized,now,identity.email),
      db.prepare('INSERT INTO history(document_id,revision,action,actor,created_at,snapshot) VALUES(?,1,?,?,?,?)').bind(id,'create',identity.email,now,serialized)
    ])
    return json(dto(await getDoc(db,id)),201)
  }
  const match = path.match(/^\/api\/documents\/([a-zA-Z0-9-]+)(?:\/(publish|unpublish|history|restore))?$/)
  if (match) {
    const row = await getDoc(db,match[1]), action = match[2]
    if (action === 'history' && request.method === 'GET') {
      const {results} = await db.prepare('SELECT revision,action,actor,created_at,snapshot FROM history WHERE document_id=? ORDER BY revision DESC LIMIT 100').bind(row.id).all()
      return json(results.map(x => ({...x,snapshot:JSON.parse(x.snapshot)})))
    }
    if ((!action && request.method === 'PUT') || (action && ['publish','unpublish','restore'].includes(action) && request.method === 'POST')) {
      if (['publish','unpublish'].includes(action)) requireAdmin(identity)
      const input = await bodyJson(request)
      if (input.revision !== row.revision) throw new HttpError(409,'Esta versión quedó desactualizada. Recargue la publicación.')
      let draft = row.draft, published = row.published
      if (!action) { const value = validateContent(row.kind,input.draft); await checkMedia(value,db); draft = JSON.stringify(value) }
      if (action === 'publish') { await checkMedia(JSON.parse(draft),db); published = draft }
      if (action === 'unpublish') published = null
      if (action === 'restore') {
        const old = await db.prepare('SELECT snapshot FROM history WHERE document_id=? AND revision=?').bind(row.id,input.targetRevision).first()
        if (!old) throw new HttpError(404,'Versión no encontrada.')
        draft = JSON.stringify(validateContent(row.kind,JSON.parse(old.snapshot)))
      }
      return json(dto(await revise(db,row,draft,published,identity,action || 'save')))
    }
  }
  if (path === '/api/media' && request.method === 'POST') {
    if (env.ALLOW_MEDIA_UPLOADS !== 'true') throw new HttpError(403,'Las cargas están deshabilitadas. Use una URL pública existente de R2.')
    const bytes = await boundedBody(request, 5_000_000), mime = imageMime(bytes), id = crypto.randomUUID()
    await env.DRAFT_MEDIA.put(id,bytes,{httpMetadata:{contentType:mime}})
    try { await db.prepare('INSERT INTO media(id,mime,bytes,created_at,created_by) VALUES(?,?,?,?,?)').bind(id,mime,bytes.length,new Date().toISOString(),identity.email).run() }
    catch (error) { await env.DRAFT_MEDIA.delete(id); throw error }
    return json({value:`asset:${id}`,bytes:bytes.length},201)
  }
  const media = path.match(/^\/api\/media\/([0-9a-f-]{36})$/)
  if (media && ['GET','HEAD'].includes(request.method)) return readMedia(env,media[1],request.method)
  if (path.startsWith('/api/')) throw new HttpError(404,'Operación no encontrada.')
  if (!['GET','HEAD'].includes(request.method)) throw new HttpError(405,'Método no permitido.')
  return env.ASSETS.fetch(request)
}
export default {
  async fetch(request,env,ctx) {
    try {
      const url = new URL(request.url)
      const cacheable = url.pathname === '/public/directory' && request.method === 'GET' && ctx && typeof caches !== 'undefined'
      const cacheKey = cacheable ? new Request(url.origin + url.pathname) : null
      if (cacheable) { const hit = await caches.default.match(cacheKey); if (hit) return hit }
      const response = url.pathname.startsWith('/public/')
        ? await publicRoute(request,env,url)
        : await adminRoute(request,env,url,await authenticate(request,env))
      const result = new Response(response.body,response)
      for (const [key,value] of Object.entries(securityHeaders)) result.headers.set(key,value)
      result.headers.set('Cache-Control',url.pathname === '/public/directory' ? 'public, max-age=60' : 'no-store')
      if (cacheable && result.ok) ctx.waitUntil(caches.default.put(cacheKey,result.clone()))
      return result
    } catch (error) {
      return json({error:error instanceof HttpError ? error.message : 'No se pudo completar la operación. Intente nuevamente.'},error instanceof HttpError ? error.status : 500,securityHeaders)
    }
  }
}
