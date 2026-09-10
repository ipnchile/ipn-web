// Biblioteca permanente: estos videos se conservan aunque se desactive el modal.
export const missionVideos = [
  {
    id: 'VEPseBfwQZE',
    title: 'Previa de las Conferencias Semestrales 2026',
    category: 'Conferencias',
    summary: 'Preparémonos para nuestras conferencias del 25, 26 y 27 de septiembre en IPN Nacimiento.',
  },
  {
    id: 'jtSa6783f-g',
    action: { label: 'Quiero donar', to: '/donaciones' },
    title: 'Campaña de Ofrenda Voluntaria',
    category: 'Vida de la misión',
    summary: 'Mensaje del canal oficial de IPN Chile sobre la campaña de ofrenda voluntaria.',
  },
].map(video => ({
  ...video,
  url: `https://www.youtube.com/watch?v=${video.id}`,
  embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}?playsinline=1&rel=0&hl=es`,
}))
