import { HttpError, requireAdmin } from './auth.js'

const fail = message => { throw new HttpError(400, message) }
const str = (value, max = 200) => {
  if (value == null) return ''
  if (typeof value !== 'string' || value.length > max) fail('Texto inválido o demasiado largo.')
  return value.trim()
}
export function photoUrl(value) {
  const text = str(value, 1000)
  if (!text) return ''
  let url
  try { url = new URL(text) } catch { fail('La foto debe ser un enlace público de R2.') }
  if (url.origin !== 'https://media.ipnchile.cl' || url.username || url.password || url.search || url.hash) fail('Use una URL pública de media.ipnchile.cl, sin parámetros.')
  return url.href
}
const items = (value, max = 30) => {
  if (!Array.isArray(value) || value.length > max) fail('Lista inválida.')
  return value.map(v => str(v, 300)).filter(Boolean)
}
const email = value => {
  const text = str(value, 254)
  if (text && !/^[^\s@]+@ipnchile\.cl$/i.test(text)) fail('Use solo un correo institucional @ipnchile.cl.')
  return text
}
export function validateDirectory(kind, value) {
  if (!['church','person'].includes(kind) || !value || typeof value !== 'object' || Array.isArray(value)) fail('Registro inválido.')
  const data = {nombre:str(value.nombre), foto_url:photoUrl(value.foto_url)}
  if (!data.nombre) fail('El nombre es obligatorio.')
  if (kind === 'person') {
    data.grado = str(value.grado)
    data.email = email(value.email)
    if (!Array.isArray(value.cargos || []) || (value.cargos || []).length > 10) fail('Cargos inválidos.')
    data.cargos = (value.cargos || []).map(c => {
      if (!['directorio','tribunal'].includes(c.area)) fail('Área inválida.')
      const orden = Number(c.orden)
      if (!Number.isInteger(orden) || orden < 0 || orden > 100) fail('Orden inválido.')
      return {area:c.area, cargo:str(c.cargo), orden}
    })
    return data
  }
  data.slug = str(value.slug, 100)
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) fail('Use un identificador de iglesia en minúsculas, separado por guiones.')
  for (const key of ['comuna','region','zona','direccion','googleMapsName','telefono']) data[key] = str(value[key], 300)
  data.email = email(value.email)
  data.horarios = items(value.horarios || [])
  data.searchAliases = items(value.searchAliases || [])
  for (const [key,limit] of [['lat',90],['lng',180]]) {
    data[key] = value[key] == null || value[key] === '' ? null : Number(value[key])
    if (data[key] !== null && (!Number.isFinite(data[key]) || Math.abs(data[key]) > limit)) fail('Coordenadas inválidas.')
  }
  if ((data.lat === null) !== (data.lng === null)) fail('Complete ambas coordenadas o deje ambas vacías.')
  for (const key of ['pastor_id','pastora_id']) {
    data[key] = str(value[key], 100)
    if (data[key] && !/^[a-zA-Z0-9-]+$/.test(data[key])) fail('Referencia pastoral inválida.')
  }
  data.redes = {}
  for (const key of ['facebook','instagram','youtube']) {
    const text = str(value.redes?.[key], 1000)
    if (text) {
      let url
      try { url = new URL(text) } catch { fail('Enlace social inválido.') }
      if (url.protocol !== 'https:' || url.username || url.password) fail('Use enlaces HTTPS.')
    }
    data.redes[key] = text
  }
  return data
}
const dto = r => ({...r, draft:JSON.parse(r.draft), published:r.published ? JSON.parse(r.published) : null})
async function references(db, data, published) {
  for (const id of [data.pastor_id,data.pastora_id].filter(Boolean)) {
    const row = await db.prepare("SELECT published FROM directory_records WHERE id=? AND kind='person'").bind(id).first()
    if (!row || (published && !row.published)) fail('Publique primero las personas asignadas a esta iglesia.')
  }
}
export async function directoryAdmin(request, env, url, identity, readBody) {
  const db = env.DB
  if (url.pathname === '/api/directory' && request.method === 'GET') {
    const {results} = await db.prepare('SELECT * FROM directory_records ORDER BY kind,id LIMIT 1000').all()
    return Response.json(results.map(dto))
  }
  requireAdmin(identity)
  const match = url.pathname.match(/^\/api\/directory\/([a-zA-Z0-9-]+)(?:\/(publish|unpublish))?$/)
  if (url.pathname === '/api/directory' && request.method === 'POST') {
    const input = await readBody(request), data = validateDirectory(input.kind,input.draft)
    await references(db,data,false)
    if (input.kind === 'church' && await db.prepare("SELECT id FROM directory_records WHERE kind='church' AND json_extract(draft,'$.slug')=?").bind(data.slug).first()) fail('Ya existe una iglesia con ese identificador.')
    const id = crypto.randomUUID()
    await db.prepare('INSERT INTO directory_records(id,kind,draft,updated_by) VALUES(?,?,?,?)').bind(id,input.kind,JSON.stringify(data),identity.email).run()
    return Response.json(dto(await db.prepare('SELECT * FROM directory_records WHERE id=?').bind(id).first()),{status:201})
  }
  if (!match || !['PUT','POST'].includes(request.method)) throw new HttpError(404,'Operación no encontrada.')
  const row = await db.prepare('SELECT * FROM directory_records WHERE id=?').bind(match[1]).first()
  if (!row) throw new HttpError(404,'Registro no encontrado.')
  const action = match[2]
  if ((action && request.method !== 'POST') || (!action && request.method !== 'PUT')) throw new HttpError(405,'Método no permitido.')
  const input = await readBody(request)
  if (input.revision !== row.revision) throw new HttpError(409,'Otra persona modificó este registro. Recargue la lista.')
  let draft = row.draft, published = row.published
  if (!action) {
    const value = validateDirectory(row.kind,input.draft)
    if (row.kind === 'church' && value.slug !== JSON.parse(row.draft).slug) fail('El identificador de la iglesia se conserva para no romper sus enlaces.')
    await references(db,value,false)
    draft = JSON.stringify(value)
  }
  if (action === 'publish') { await references(db,JSON.parse(draft),true); published = draft }
  if (action === 'unpublish') published = null
  // References are projected only from published people; retiring a person removes
  // their details from every public church, while preserving the private assignment.
  const result = await db.prepare('UPDATE directory_records SET draft=?,published=?,revision=revision+1,updated_by=?,updated_at=? WHERE id=? AND revision=?').bind(draft,published,identity.email,new Date().toISOString(),row.id,row.revision).run()
  if (result.meta.changes !== 1) throw new HttpError(409,'Otra persona modificó este registro. Recargue la lista.')
  return Response.json(dto(await db.prepare('SELECT * FROM directory_records WHERE id=?').bind(row.id).first()))
}
export async function directoryPublic(db) {
  const {results} = await db.prepare('SELECT id,kind,published FROM directory_records WHERE published IS NOT NULL ORDER BY id LIMIT 1000').all()
  return {churches:results.filter(r => r.kind === 'church').map(r => ({...JSON.parse(r.published),id:r.id})),people:results.filter(r => r.kind === 'person').map(r => ({...JSON.parse(r.published),id:r.id}))}
}
