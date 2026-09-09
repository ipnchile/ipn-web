import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { siteIdentity, identityJson, identityScriptId, syncSiteIdentity } from '../src/utils/structuredData.js'

test('Identidad JSON-LD: tipos, propiedades, referencias y perfiles oficiales', () => {
  const graph = JSON.parse(identityJson)
  assert.deepEqual(graph,siteIdentity)
  assert.equal(graph['@context'],'https://schema.org')
  assert.equal(graph['@graph'].length,2)
  const [website,organization] = graph['@graph']
  assert.equal(website['@type'],'WebSite')
  assert.equal(organization['@type'],'Organization')
  assert.equal(website['@id'],'https://ipnchile.cl/#website')
  assert.equal(organization['@id'],'https://ipnchile.cl/#organization')
  assert.equal(website.publisher['@id'],organization['@id'])
  assert.equal(website.name,organization.alternateName)
  assert.equal(website.alternateName,organization.name)
  assert.equal(website.inLanguage,'es-CL')
  for (const url of [website.url,organization.url,organization.logo,...organization.sameAs]) assert.equal(new URL(url).protocol,'https:')
  assert.equal(website.url,'https://ipnchile.cl/')
  assert.equal(organization.url,website.url)
  assert.deepEqual(Object.keys(organization).sort(),['@type','@id','name','alternateName','url','logo','sameAs'].sort())
  const footer = readFileSync(new URL('../src/components/ui/AppFooter.vue',import.meta.url),'utf8')
  const normalize = value => value.replace('://www.', '://').replace(/\/$/,'')
  for (const profile of organization.sameAs) assert.ok(normalize(footer).includes(normalize(profile)))
  const png = readFileSync(new URL('../public/isotipo-ipn.png',import.meta.url))
  assert.equal(png.toString('ascii',1,4),'PNG')
  assert.ok(png.readUInt32BE(16)>=112 && png.readUInt32BE(20)>=112)
})

test('Navegación conserva un bloque, retira identidad fuera de portada y la restaura', () => {
  const scripts = []
  const doc = {
    head: { querySelectorAll: () => [...scripts], appendChild: tag => scripts.push(tag) },
    createElement: () => ({ setAttribute(key,value) {this[key]=value}, remove() {scripts.splice(scripts.indexOf(this),1)} }),
  }
  syncSiteIdentity(true,doc)
  const original = scripts[0]
  scripts.push(doc.createElement('script'))
  syncSiteIdentity(true,doc)
  assert.equal(scripts.length,1)
  assert.equal(scripts[0],original)
  assert.equal(original.id,identityScriptId)
  assert.equal(original.type,'application/ld+json')
  assert.deepEqual(JSON.parse(original.textContent),siteIdentity)
  syncSiteIdentity(false,doc)
  assert.equal(scripts.length,0)
  syncSiteIdentity(true,doc)
  assert.equal(scripts.length,1)
  assert.deepEqual(JSON.parse(scripts[0].textContent),siteIdentity)
})
