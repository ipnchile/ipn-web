import { siteOrigin } from './seo.js'

export const identityScriptId = 'ipn-site-identity'
export const siteIdentity = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': siteOrigin + '/#website',
      name: 'IPN Chile',
      alternateName: 'Iglesia Pentecostal Nazareth',
      url: siteOrigin + '/',
      inLanguage: 'es-CL',
      publisher: { '@id': siteOrigin + '/#organization' },
    },
    {
      '@type': 'Organization',
      '@id': siteOrigin + '/#organization',
      name: 'Iglesia Pentecostal Nazareth',
      alternateName: 'IPN Chile',
      url: siteOrigin + '/',
      logo: siteOrigin + '/isotipo-ipn.png',
      sameAs: [
        'https://www.facebook.com/IPNChile',
        'https://www.instagram.com/ipnchilecuentaoficial/',
        'https://www.youtube.com/@ipnchile',
      ],
    },
  ],
}

export const identityJson = JSON.stringify(siteIdentity).replaceAll('<', '\\u003c')

// Shared by Vite's initial HTML and Vue's navigation lifecycle.
export function syncSiteIdentity(isHome, doc = document) {
  const scripts = [...doc.head.querySelectorAll('script[id="' + identityScriptId + '"]')]
  const script = scripts.shift()
  scripts.forEach(duplicate => duplicate.remove())
  if (!isHome) { script?.remove(); return }
  const target = script || doc.createElement('script')
  target.setAttribute('id', identityScriptId)
  target.setAttribute('type', 'application/ld+json')
  if (target.textContent !== identityJson) target.textContent = identityJson
  if (!script) doc.head.appendChild(target)
}
