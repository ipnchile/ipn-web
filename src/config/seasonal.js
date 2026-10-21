// auto: según el mes en Chile; on/off: activar o desactivar manualmente.
export const septemberConfig = {
  mode: 'auto',
  month: 9,
  timeZone: 'America/Santiago',
  showConferenceBanner: true,
  // WebP publicados en Cloudflare R2 (bucket ipn-media).
  // Use una cadena vacía para volver a las copias locales.
  mediaBaseUrl: 'https://media.ipnchile.cl/eventos/septiembre-2026',
}

export const octoberConfig = { mode: 'auto', month: 10, timeZone: 'America/Santiago' }
