import { bannerSlides } from './banner.js'

export function seasonalHomeBanner(banner, october) {
  if (!october) return banner?.enabled ? banner : null
  const poster = {
    id: 'october-reformation',
    image: 'https://media.ipnchile.cl/eventos/octubre/mes-reforma-protestante.webp',
    alt: 'Octubre: Mes de la Reforma Protestante. 31 de octubre. Un legado de fe, verdad y la centralidad de la Palabra de Dios.',
    title: 'Mes de la Reforma Protestante',
    fit: 'contain', showText: false,
  }
  return { ...banner, enabled: true, primarySlideId: poster.id,
    slides: [poster, ...(banner?.enabled ? bannerSlides(banner) : []).filter(slide => slide.id !== poster.id)] }
}
