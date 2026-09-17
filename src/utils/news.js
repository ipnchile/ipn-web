// Only individual Instagram publications; never profiles, scripts or lookalike domains.
export function instagramPostUrl(value) {
  if (typeof value !== 'string' || value.length > 1000) return ''
  try {
    const url = new URL(value.trim())
    if (url.protocol !== 'https:' || !['instagram.com', 'www.instagram.com'].includes(url.hostname) || url.port || url.username || url.password) return ''
    const match = url.pathname.match(/^\/(p|reel|tv)\/([A-Za-z0-9_-]+)\/?$/)
    return match ? `https://www.instagram.com/${match[1]}/${match[2]}/` : ''
  } catch { return '' }
}

export const newsAnchor = id => `noticia-${encodeURIComponent(String(id))}`
export const newsLocation = id => ({ path: '/actualidad/noticias', hash: '#' + newsAnchor(id) })
