import publicPaths from '../../src/data/sitemapPaths.js'
const origin = 'https://ipnchile.cl'
const escapeXml = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&apos;')
export async function sitemapXml(db) {
  const results = await db.batch([
    db.prepare("SELECT id,published FROM documents WHERE kind='event' AND published IS NOT NULL ORDER BY id"),
    db.prepare("SELECT published FROM directory_records WHERE kind='church' AND published IS NOT NULL ORDER BY id")
  ])
  const urls = new Set(publicPaths.map(path => origin + path))
  for (const row of results[0].results) urls.add(origin + '/actualidad/eventos?evento=' + encodeURIComponent(row.id))
  for (const row of results[1].results) {
    const church = JSON.parse(row.published)
    if (church.slug && church.nombre) urls.add(origin + '/iglesias/' + encodeURIComponent(church.slug))
  }
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + [...urls].map(url => '  <url><loc>' + escapeXml(url) + '</loc></url>').join('\n') + '\n</urlset>\n'
}
