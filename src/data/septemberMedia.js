import { septemberConfig } from '../config/seasonal.js'

const base = (septemberConfig.mediaBaseUrl || '/media/septiembre-2026').replace(/\/+$/, '')
const asset = name => base + '/' + name + '.webp'
export const septemberMedia = {
  conferencePoster: asset('conferencias-nacimiento-2026-afiche-1440'),
  conferenceThumbnail: asset('conferencias-nacimiento-2026-afiche-640'),
  biblePoster: asset('mes-de-la-biblia-2026-1086'),
  bibleThumbnail: asset('mes-de-la-biblia-2026-640'),
  banner: asset('conferencias-nacimiento-2026-banner-1280'),
  bannerSrcset: [768, 1280, 2560].map(width => asset('conferencias-nacimiento-2026-banner-' + width) + ' ' + width + 'w').join(', '),
}
