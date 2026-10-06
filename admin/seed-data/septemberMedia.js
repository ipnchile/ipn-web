import { septemberConfig } from '../../src/config/seasonal.js'

const base = (septemberConfig.mediaBaseUrl || '/media/septiembre-2026').replace(/\/+$/, '')
const asset = name => base + '/' + name + '.webp'
export const septemberMedia = {
  conferencePoster: asset('conferencias-nacimiento-2026-afiche-1440'),
  conferenceThumbnail: asset('conferencias-nacimiento-2026-afiche-640'),
  biblePoster: asset('mes-de-la-biblia-2026-1086'),
  bibleThumbnail: asset('mes-de-la-biblia-2026-640'),
}
