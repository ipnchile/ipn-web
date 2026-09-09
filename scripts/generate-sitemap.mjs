import { readFile, writeFile } from 'node:fs/promises'
import { loadEnv } from 'vite'
import { routes } from '../src/router/routes.js'
import { allEvents } from '../src/data/events.js'
import { resolvePageMetadata } from '../src/utils/seo.js'

const env = { ...loadEnv('production', process.cwd(), ''), ...process.env }
async function publishedSnapshot(endpoint, fallback) {
  if (!endpoint) return fallback
  const response = await fetch(endpoint, { signal: AbortSignal.timeout(15000) })
  if (!response.ok) throw new Error('No se pudo obtener el contenido público para el sitemap: ' + response.status)
  return response.json()
}
const directory = await publishedSnapshot(env.VITE_DIRECTORY_API, JSON.parse(await readFile('src/data/directory.json', 'utf8')))
const content = await publishedSnapshot(env.VITE_CONTENT_API, { events: allEvents })
if (!Array.isArray(directory.churches) || !Array.isArray(content.events)) throw new Error('Contenido público inválido')
const urls = new Set()
function include(record, params = {}, query = {}) {
  const metadata = resolvePageMetadata({ name: record.name, path: record.path, matched: [record], meta: record.meta, params, query }, { churches: directory.churches, events: content.events })
  if (!metadata.noindex && metadata.canonical) urls.add(metadata.canonical)
}
for (const record of routes) {
  if (record.meta?.noindex) continue
  if (!record.path.includes(':')) include(record)
  else if (record.name === 'iglesiaDetalle') {
    for (const church of directory.churches) {
      if (!church.slug || !church.nombre) throw new Error('Iglesia pública sin slug o nombre')
      include(record, { slug: church.slug })
    }
  }
  if (record.name === 'eventos') for (const event of content.events) {
    if (event.id === undefined || !event.title) throw new Error('Evento público sin id o título')
    include(record, {}, { evento: String(event.id) })
  }
}
const escape = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&apos;')
// No lastmod: event dates and build time are not modification dates.
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + [...urls].map(url => '  <url><loc>' + escape(url) + '</loc></url>').join('\n') + '\n</urlset>\n'
await writeFile('dist/sitemap.xml', xml)
console.log('Sitemap: ' + urls.size + ' URLs públicas canónicas; sin lastmod inventados.')
