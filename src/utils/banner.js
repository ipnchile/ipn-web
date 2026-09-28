export const MAX_BANNER_SLIDES = 12

export function bannerSlides(banner) {
  if (!banner) return []
  const slides = Array.isArray(banner.slides) ? banner.slides : banner.image ? [{
    id: 'legacy', image: banner.image, alt: banner.title, title: banner.title,
    description: banner.description || '', link: banner.link || '', buttonText: '',
    eyebrow: '', showText: false, fit: 'contain'
  }] : []
  const primary = slides.find(slide => slide.id === banner.primarySlideId)
  return primary ? [primary, ...slides.filter(slide => slide.id !== primary.id)] : [...slides]
}

export function newBannerSlide(image = '') {
  return { id: crypto.randomUUID(), image, alt: '', eyebrow: '', title: '', description: '', buttonText: '', link: '', showText: true, fit: 'cover' }
}
