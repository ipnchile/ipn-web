export const defaultConferenceVideo = Object.freeze({ mode: 'preview', previewUrl: 'https://youtu.be/VEPseBfwQZE', liveUrl: '' })

export function youtubeId(value) {
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null
    const host = url.hostname.toLowerCase()
    let id = null
    if (host === 'youtu.be') id = url.pathname.slice(1)
    else if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(host)) {
      if (url.pathname === '/watch') id = url.searchParams.get('v')
      else id = url.pathname.match(/^\/(?:live|embed|shorts)\/([^/]+)\/?$/)?.[1]
    }
    return /^[\w-]{11}$/.test(id || '') ? id : null
  } catch { return null }
}

export function activeConferenceVideo(config) {
  if (!config || !['preview', 'live'].includes(config.mode)) return null
  const id = youtubeId(config.mode === 'live' ? config.liveUrl : config.previewUrl)
  return id ? { id, mode: config.mode, title: config.mode === 'live' ? 'Conferencias en vivo' : 'La previa de nuestras conferencias', url: `https://www.youtube.com/watch?v=${id}` } : null
}
