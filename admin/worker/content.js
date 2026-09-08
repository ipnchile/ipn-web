import { HttpError } from './auth.js'
export const kinds = ['news', 'event', 'banner']
export const monthOrder = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE']
const invalid = message => { throw new HttpError(400, message) }
function text(value, name, max, required = false) {
  if (value == null && !required) return ''
  if (typeof value !== 'string' || value.length > max || (required && !value.trim())) invalid(`Revise el campo ${name}.`)
  return value.trim()
}
function date(value, name) {
  const s = text(value, name, 10, true)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s) || !Number.isFinite(Date.parse(s)) || new Date(s).toISOString().slice(0,10) !== s) invalid(`Fecha inválida: ${name}.`)
  return s
}
export function safeLink(value) {
  const s = text(value, 'enlace', 1000)
  if (!s) return ''
  if (/^\/(?!\/)[a-zA-Z0-9/?=&%#._-]*$/.test(s)) return s
  try { const u = new URL(s); if (u.protocol === 'https:' && !u.username && !u.password) return u.href } catch { /* reject */ }
  invalid('Use un enlace HTTPS o una ruta interna.')
}
export function mediaValue(value) {
  const s = text(value, 'imagen', 1000)
  if (!s || /^asset:[0-9a-f-]{36}$/.test(s)) return s
  try { const u = new URL(s); if (u.origin === 'https://media.ipnchile.cl' && !u.username && !u.password) return u.href } catch { /* reject */ }
  invalid('Seleccione una imagen del panel o de media.ipnchile.cl.')
}
export function validateContent(kind, input) {
  if (!kinds.includes(kind) || !input || typeof input !== 'object' || Array.isArray(input)) invalid('Contenido inválido.')
  const result = { title: text(input.title,'título',200,true), description: text(input.description,'descripción',2000), image: mediaValue(input.image) }
  if (kind === 'news') {
    result.date = date(input.date,'fecha')
    result.thumbnail = mediaValue(input.thumbnail)
    if (input.paragraphs != null && !Array.isArray(input.paragraphs)) invalid('Párrafos inválidos.')
    if ((input.paragraphs || []).length > 40) invalid('Máximo 40 párrafos.')
    result.paragraphs = (input.paragraphs || []).map(p => text(p,'párrafo',4000,true))
    result.eventLink = safeLink(input.eventLink)
    if (input.source?.url) result.source = { label: text(input.source.label,'fuente',200,true), url: safeLink(input.source.url) }
  } else if (kind === 'event') {
    result.startDate = date(input.startDate,'inicio'); result.endDate = date(input.endDate,'término')
    if (result.endDate < result.startDate) invalid('El término debe ser posterior o igual al inicio.')
    result.month = monthOrder[Number(result.startDate.slice(5,7)) - 1]
    result.dateLabel = text(input.dateLabel,'fecha visible',150) || `${result.startDate} — ${result.endDate}`
    result.location = text(input.location,'lugar',300,true)
    result.type = text(input.type,'tipo',100)
    result.notes = text(input.notes,'notas',4000)
  } else {
    result.link = safeLink(input.link)
    result.enabled = input.enabled === true
    if (!result.image) invalid('El banner necesita una imagen.')
  }
  return result
}
export function mediaIds(data) {
  return [...new Set([data.image, data.thumbnail].filter(s => s?.startsWith('asset:')).map(s => s.slice(6)))]
}
export function publicData(row, origin) {
  const data = JSON.parse(row.published)
  for (const key of ['image','thumbnail']) if (data[key]?.startsWith('asset:')) data[key] = `${origin}/public/media/${data[key].slice(6)}`
  return { ...data, id: row.id }
}
