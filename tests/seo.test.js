import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { updatePageMetadata, resolvePageMetadata, homeTitle, defaultDescription } from '../src/utils/seo.js'
import { routes } from '../src/router/routes.js'
import { allEvents } from '../src/data/events.js'
const churches = JSON.parse(readFileSync(new URL('../src/data/directory.json',import.meta.url))).churches
function route(name, params = {}, query = {}) {
  const record = routes.find(item => item.name === name)
  return { ...record, matched:[record], params, query }
}
function documentStub() {
  const tags = []
  return {
    tags,
    head: {
      querySelectorAll(selector) {
        const [, element, attr, key] = selector.match(/^(\w+)\[(\w+)="(.+)"\]$/)
        return tags.filter(tag => tag.element === element && tag[attr] === key)
      },
      appendChild: tag => tags.push(tag),
    },
    createElement: element => ({ element, setAttribute(key,value) { this[key] = value }, remove() { tags.splice(tags.indexOf(this),1) } }),
  }
}
test('Portada, navegación, duplicados y recuperación tras noindex', () => {
  const doc = documentStub()
  const update = r => updatePageMetadata(resolvePageMetadata(r,{churches,events:allEvents}),doc)
  const value = key => doc.tags.find(tag => tag.name === key || tag.property === key)?.content
  const canonical = () => doc.tags.find(tag => tag.rel === 'canonical')?.href
  update(route('home'))
  assert.equal(doc.title,homeTitle)
  assert.equal(value('description'),defaultDescription)
  assert.equal(canonical(),'https://ipnchile.cl/')
  const duplicate = doc.createElement('meta'); duplicate.setAttribute('name','description'); doc.head.appendChild(duplicate)
  update(route('contacto'))
  assert.equal(doc.title,'Contacto | IPN Chile')
  assert.equal(doc.tags.filter(tag => tag.name === 'description').length,1)
  assert.equal(value('og:title'), doc.title)
  assert.equal(value('twitter:title'),doc.title)
  assert.equal(value('twitter:description'),value('description'))
  assert.equal(value('og:url'),canonical())
  update(route('not-found'))
  assert.equal(value('robots'),'noindex, follow')
  assert.equal(canonical(),undefined)
  assert.equal(value('og:url'),undefined)
  update(route('home'))
  assert.equal(value('robots'),'index, follow')
  assert.equal(doc.title,homeTitle)
  assert.equal(canonical(),'https://ipnchile.cl/')
})
test('Canonical preserva evento real y excluye seguimiento, rutas inexistentes y borradores', () => {
  const resolve = r => resolvePageMetadata(r,{churches,events:allEvents})
  const event = resolve(route('eventos',{}, {evento:'5',utm_source:'instagram'}))
  assert.equal(event.canonical,'https://ipnchile.cl/actualidad/eventos?evento=5')
  assert.equal(event.title,allEvents.find(event => event.id === 5).title)
  assert.equal(resolve(route('eventos',{}, {evento:'inexistente'})).noindex,true)
  assert.equal(resolve(route('eventos',{}, {evento:['5','6']})).noindex,true)
  assert.equal(resolve(route('iglesiaDetalle',{slug:'inexistente'})).noindex,true)
  for (const church of churches) {
    assert.equal(resolve(route('iglesiaDetalle',{slug:church.slug})).canonical,'https://ipnchile.cl/iglesias/'+encodeURIComponent(church.slug))
  }
  assert.equal(resolve(route('home',{}, {utm_source:'test'})).canonical,'https://ipnchile.cl/')
})
test('Todas las rutas estáticas indexables tienen metadatos propios y componente real', () => {
  for (const record of routes.filter(record => !record.meta.noindex && !record.path.includes(':'))) {
    assert.ok(record.meta.title && record.meta.description)
    assert.equal(typeof record.component,'function')
    assert.equal(resolvePageMetadata(route(record.name)).canonical,'https://ipnchile.cl'+record.path)
  }
})
