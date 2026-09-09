export const siteOrigin = 'https://ipnchile.cl'
export const homeTitle = "IPN Chile | Iglesia Pentecostal Nazareth"
export const defaultDescription = "Conozca la Iglesia Pentecostal Nazareth (IPN Chile). Encuentre nuestras iglesias, departamentos, actividades y noticias, y una congregación cercana a usted."

// Only content-identifying parameters belong in canonical URLs.
export function resolvePageMetadata(route, { churches = [], events = [] } = {}) {
  const meta = { ...route.meta }
  let path = route.matched?.[0]?.path || route.path || '/'
  if (route.name === 'iglesiaDetalle') {
    const church = churches.find(item => item.slug === route.params?.slug)
    if (!church) return { title: 'Iglesia no encontrada', description: 'Consulte el directorio de iglesias de IPN Chile.', noindex: true }
    path = '/iglesias/' + encodeURIComponent(church.slug)
    meta.title = church.nombre
    meta.description = [church.nombre + ' en ' + church.comuna + '.', church.direccion + '.', 'Consulte ubicación, horarios e información pastoral de esta congregación de la Iglesia Pentecostal Nazareth.'].join(' ')
  }
  if (route.name === 'eventos' && route.query?.evento !== undefined) {
    const event = events.find(item => String(item.id) === route.query.evento)
    if (!event) return { title: 'Evento no encontrado', description: 'Consulte el calendario de actividades de IPN Chile.', noindex: true }
    meta.title = event.title
    meta.description = event.description || [event.title, event.dateLabel, event.location].filter(Boolean).join(' · ')
    path += '?evento=' + encodeURIComponent(event.id)
  }
  if (!meta.noindex && !path.includes(':')) meta.canonical = siteOrigin + (path === '/' ? '/' : path.endsWith('/') ? path.slice(0, -1) : path)
  return meta
}

export function updatePageMetadata(meta = {}, doc = document) {
  const title = meta.fullTitle ? meta.title : meta.title ? meta.title + ' | IPN Chile' : homeTitle
  const description = meta.description || defaultDescription
  doc.title = title
  // Reuse one element and remove stale duplicates, including static HTML tags.
  function set(element, attribute, key, value, valueAttribute = 'content') {
    const tags = [...doc.head.querySelectorAll(element + '[' + attribute + '="' + key + '"]')]
    let tag = tags.shift()
    tags.forEach(duplicate => duplicate.remove())
    if (!value) { tag?.remove(); return }
    if (!tag) {
      tag = doc.createElement(element)
      tag.setAttribute(attribute, key)
      doc.head.appendChild(tag)
    }
    tag.setAttribute(valueAttribute, value)
  }
  set('meta', 'name', 'description', description)
  set('meta', 'name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow')
  set('meta', 'property', 'og:title', title)
  set('meta', 'property', 'og:description', description)
  set('meta', 'property', 'og:type', 'website')
  set('meta', 'property', 'og:site_name', 'IPN Chile')
  set('meta', 'name', 'twitter:card', 'summary')
  set('meta', 'name', 'twitter:title', title)
  set('meta', 'name', 'twitter:description', description)
  set('link', 'rel', 'canonical', meta.noindex ? null : meta.canonical, 'href')
  set('meta', 'property', 'og:url', meta.noindex ? null : meta.canonical)
}
