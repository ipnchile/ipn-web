import { HttpError, requireAdmin } from './auth.js'
import { instagramPostUrl } from '../../src/utils/news.js'

const ACCOUNT = 'ipnchilecuentaoficial'
const ACCOUNT_ID = '17841478715977677'
const MAX_AGE = 48 * 60 * 60 * 1000
const json = data => Response.json(data, { headers: { 'Cache-Control': 'no-store' } })

function imageUrl(value) {
  try {
    const u = new URL(value)
    return u.protocol === 'https:' && !u.username && !u.password && !u.port &&
      /\.(cdninstagram\.com|fbcdn\.net)$/.test(u.hostname) ? u.href : ''
  } catch { return '' }
}

export function normalizeMedia(media) {
  const url = instagramPostUrl(media.permalink)
  if (!/^\d+$/.test(media.id || '') || !url || !Number.isFinite(Date.parse(media.timestamp)) ||
    !['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM'].includes(media.media_type)) return null
  const caption = typeof media.caption === 'string' ? media.caption.slice(0, 10000).trim() : ''
  const image = imageUrl(media.media_type === 'VIDEO' ? media.thumbnail_url : media.media_url)
  return {
    id: `instagram-${media.id}`, title: (caption.split('\n').find(line => line.trim()) || 'Publicación de IPN Chile').slice(0, 200),
    description: caption.slice(0, 300), paragraphs: caption ? caption.split(/\n\s*\n/) : [],
    date: new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santiago' }).format(new Date(media.timestamp)),
    image, thumbnail: image, instagramUrl: url, source: { label: `@${ACCOUNT}`, url }, automatic: true
  }
}

async function state(env) {
  return env.DB.prepare('SELECT * FROM instagram_feed WHERE id=1').first()
}

export async function instagramNews(env) {
  // Disabled deployments remain compatible with databases not yet migrated.
  if (env.INSTAGRAM_ENABLED !== 'true') return []
  const row = await state(env)
  if (!row?.enabled || !row.synced_at || Date.now() - Date.parse(row.synced_at) > MAX_AGE) return []
  return JSON.parse(row.items)
}

async function graph(path, fields, env, fetcher) {
  const version = env.INSTAGRAM_API_VERSION || 'v25.0'
  if (!/^v\d+\.0$/.test(version)) throw new HttpError(503, 'La versión de la API no está configurada correctamente.')
  const url = new URL(`https://graph.instagram.com/${version}/${path}`)
  url.searchParams.set('fields', fields)
  if (path.endsWith('/media')) url.searchParams.set('limit', '12')
  let response, data
  const token = env.INSTAGRAM_ACCESS_TOKEN.trim()
  if (!/^[A-Za-z0-9._~-]+$/.test(token)) throw new HttpError(503, 'El secreto de Instagram contiene caracteres no válidos. Guarde únicamente el token, sin comillas ni saltos de línea.')
  try {
    response = await fetcher(url.href, { headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(15000), redirect: 'manual' })
  } catch { throw new HttpError(502, 'No se pudo establecer conexión con Instagram. Intente nuevamente más tarde.') }
  if (response.status >= 300 && response.status < 400) throw new HttpError(502, 'Instagram redirigió la consulta de API. Debe revisarse la conexión del servidor.')
  try { data = await response.json() }
  catch { throw new HttpError(502, `Instagram devolvió una respuesta no válida (HTTP ${response.status}). Intente nuevamente más tarde.`) }
  // Never return or log upstream bodies: they can contain sensitive data.
  if (!response.ok || data.error) {
    if (data.error?.code === 190) throw new HttpError(502, 'El token de Instagram caducó o fue revocado. Actualice el secreto en Cloudflare.')
    throw new HttpError(502, 'Instagram rechazó la consulta. Revise el token y el permiso instagram_business_basic.')
  }
  return data
}

export async function syncInstagram(env, fetcher = fetch) {
  if (env.INSTAGRAM_ENABLED !== 'true' || !env.INSTAGRAM_ACCESS_TOKEN) throw new HttpError(503, 'Falta configurar la conexión de Instagram en el servidor.')
  const now = Date.now()
  const lock = await env.DB.prepare('UPDATE instagram_feed SET locked_until=?, attempted_at=? WHERE id=1 AND locked_until < ?').bind(now + 60000, new Date(now).toISOString(), now).run()
  if (lock.meta.changes !== 1) throw new HttpError(429, 'Espere un minuto antes de volver a actualizar.')
  try {
    const profile = await graph('me', 'user_id,username', env, fetcher)
    if (String(profile.user_id) !== ACCOUNT_ID || profile.username !== ACCOUNT) throw new HttpError(400, 'El token no corresponde a la cuenta oficial de IPN Chile.')
    const media = await graph(`${ACCOUNT_ID}/media`, 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp', env, fetcher)
    if (!Array.isArray(media.data)) throw new HttpError(502, 'Instagram devolvió una respuesta incompleta.')
    const items = [...new Map(media.data.slice(0, 12).map(normalizeMedia).filter(Boolean).map(item => [item.id, item])).values()]
    if (media.data.length && !items.length) throw new HttpError(502, 'No se pudo interpretar el contenido de Instagram.')
    await env.DB.prepare('UPDATE instagram_feed SET items=?, synced_at=?, error=NULL WHERE id=1').bind(JSON.stringify(items), new Date(now).toISOString()).run()
    return { count: items.length }
  } catch (error) {
    const message = error instanceof HttpError ? error.message : 'No se pudo sincronizar Instagram.'
    await env.DB.prepare('UPDATE instagram_feed SET error=? WHERE id=1').bind(message).run()
    throw new HttpError(error instanceof HttpError ? error.status : 502, message)
  }
}

export async function instagramAdmin(request, env, identity, bodyJson) {
  requireAdmin(identity)
  const path = new URL(request.url).pathname
  const configured = env.INSTAGRAM_ENABLED === 'true' && Boolean(env.INSTAGRAM_ACCESS_TOKEN)
  if (path === '/api/instagram' && request.method === 'GET') {
    const row = env.INSTAGRAM_ENABLED === 'true' ? await state(env) : null
    return json({ configured, enabled: Boolean(row?.enabled), account: ACCOUNT, syncedAt: row?.synced_at || null,
      error: row?.error || null, count: row ? JSON.parse(row.items).length : 0 })
  }
  if (path === '/api/instagram/sync' && request.method === 'POST') return json(await syncInstagram(env))
  if (path === '/api/instagram' && request.method === 'PUT') {
    const input = await bodyJson(request)
    if (typeof input.enabled !== 'boolean') throw new HttpError(400, 'Indique si desea activar Instagram.')
    if (!configured) throw new HttpError(503, 'Falta configurar la conexión de Instagram en el servidor.')
    if (input.enabled) {
      const row = await state(env)
      if (!row?.synced_at || Date.now() - Date.parse(row.synced_at) > MAX_AGE || row.error) throw new HttpError(409, 'Actualice Instagram correctamente antes de activar la galería.')
    }
    await env.DB.prepare('UPDATE instagram_feed SET enabled=? WHERE id=1').bind(input.enabled ? 1 : 0).run()
    return json({ enabled: input.enabled })
  }
  throw new HttpError(405, 'Método no permitido.')
}
