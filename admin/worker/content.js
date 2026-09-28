import { youtubeId } from '../../src/utils/conferenceVideo.js'
import { instagramPostUrl } from '../../src/utils/news.js'
import { HttpError } from './auth.js'
import { MAX_BANNER_SLIDES } from '../../src/utils/banner.js'
export const kinds = ['news', 'event', 'banner', 'video']
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
  if (kind === 'video') {
    const id = youtubeId(text(input.videoUrl,'enlace de YouTube',1000,true))
    if (!id) invalid('Ingrese un enlace válido de un video de YouTube.')
    result.videoUrl = 'https://www.youtube.com/watch?v=' + id
    result.category = text(input.category,'categoría',100) || 'Videos de la misión'
    result.order = input.order ?? 0
    if (!Number.isInteger(result.order) || result.order < 0 || result.order > 10000) invalid('El orden debe ser un número entero entre 0 y 10000.')
    result.action = null
    if (input.action?.label || input.action?.to) {
      const label = text(input.action.label,'texto del botón',80,true), to = safeLink(input.action.to)
      if (!to) invalid('Ingrese el destino del botón.')
      result.action = {label,to}
    }
  } else if (kind === 'news') {
    const instagramUrl = text(input.instagramUrl, 'enlace de Instagram', 1000)
    result.instagramUrl = instagramPostUrl(instagramUrl)
    if (instagramUrl && !result.instagramUrl) invalid('Ingrese el enlace HTTPS de una publicación o reel de Instagram, no el perfil de la cuenta.')
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
    if (input.conferenceVideo != null) {
      const config = input.conferenceVideo
      if (typeof config !== 'object' || Array.isArray(config) || !['off','preview','live'].includes(config.mode)) invalid('Seleccione previa, en vivo o desactivado.')
      const previewUrl = text(config.previewUrl, 'video de previa', 1000)
      const liveUrl = text(config.liveUrl, 'transmisión en vivo', 1000)
      if ((previewUrl && !youtubeId(previewUrl)) || (liveUrl && !youtubeId(liveUrl))) invalid('Use un enlace HTTPS de un video de YouTube (youtu.be, watch o live).')
      if (config.mode === 'preview' && !previewUrl) invalid('Ingrese el enlace del video de previa.')
      if (config.mode === 'live' && !liveUrl) invalid('Ingrese el enlace de la transmisión en vivo.')
      result.conferenceVideo = { mode: config.mode, previewUrl, liveUrl }
    }
    result.link = safeLink(input.link)
    result.enabled = input.enabled === true
    if (input.slides != null) {
      if (!Array.isArray(input.slides) || input.slides.length < 1 || input.slides.length > MAX_BANNER_SLIDES) invalid(`Seleccione entre 1 y ${MAX_BANNER_SLIDES} imágenes.`)
      const ids = new Set()
      result.slides = input.slides.map(slide => {
        if (!slide || typeof slide !== 'object' || Array.isArray(slide)) invalid('Imagen del carrusel inválida.')
        const id = text(slide.id, 'identificador de imagen', 80, true)
        if (!/^[a-zA-Z0-9_-]+$/.test(id) || ids.has(id)) invalid('Cada imagen debe tener un identificador único.')
        ids.add(id)
        const image = mediaValue(slide.image)
        if (!image) invalid('Seleccione una imagen para cada elemento del carrusel.')
        const fit = slide.fit ?? 'cover'
        if (!['cover', 'contain'].includes(fit)) invalid('Seleccione un ajuste válido para la imagen.')
        const link = safeLink(slide.link), buttonText = text(slide.buttonText, 'texto del botón', 80)
        if (buttonText && !link) invalid('Ingrese el enlace del botón o deje su texto vacío.')
        return { id, image, alt: text(slide.alt, 'descripción de imagen', 200), eyebrow: text(slide.eyebrow, 'antetítulo', 100), title: text(slide.title, 'título de imagen', 200), description: text(slide.description, 'texto superpuesto', 600), buttonText, link, showText: slide.showText === true, fit }
      })
      result.primarySlideId = text(input.primarySlideId, 'imagen principal', 80) || result.slides[0].id
      if (!ids.has(result.primarySlideId)) invalid('Seleccione una imagen principal de esta lista.')
      // Keep the legacy image/link fields usable by older clients during rollout.
      const primary = result.slides.find(slide => slide.id === result.primarySlideId)
      result.image = primary.image
      result.link = primary.link
    }
    if (!result.image) invalid('El banner necesita una imagen.')
  }
  return result
}
export function mediaIds(data) {
  return [...new Set([data.image, data.thumbnail, ...(data.slides || []).map(slide => slide.image)].filter(s => s?.startsWith('asset:')).map(s => s.slice(6)))]
}
export function publicData(row, origin) {
  const data = JSON.parse(row.published)
  for (const key of ['image','thumbnail']) if (data[key]?.startsWith('asset:')) data[key] = `${origin}/public/media/${data[key].slice(6)}`
  for (const slide of data.slides || []) if (slide.image?.startsWith('asset:')) slide.image = `${origin}/public/media/${slide.image.slice(6)}`
  return { ...data, id: row.id }
}
