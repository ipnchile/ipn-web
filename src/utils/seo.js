export const defaultDescription = 'Conozca la Iglesia Pentecostal Nazareth en Chile, sus iglesias, departamentos y actividades.'

export function updatePageMetadata(meta = {}, doc = document) {
  const title = meta.title ? meta.title + ' | IPN Chile' : 'IPN Chile'
  const description = meta.description || defaultDescription
  doc.title = title
  function set(attribute, key, content) {
    let tag = doc.head.querySelector('meta[' + attribute + '="' + key + '"]')
    if (!tag) {
      tag = doc.createElement('meta')
      tag.setAttribute(attribute, key)
      doc.head.appendChild(tag)
    }
    tag.setAttribute('content', content)
  }
  set('name', 'description', description)
  set('name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow')
  set('property', 'og:title', title)
  set('property', 'og:description', description)
  set('property', 'og:type', 'website')
  set('property', 'og:site_name', 'IPN Chile')
  set('name', 'twitter:card', 'summary')
  set('name', 'twitter:title', title)
  set('name', 'twitter:description', description)
}
