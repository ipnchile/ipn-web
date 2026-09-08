import { test } from 'node:test'
import assert from 'node:assert/strict'
import { updatePageMetadata, defaultDescription } from '../src/utils/seo.js'

test('Actualiza metadatos sin duplicarlos y revierte noindex al salir de 404', () => {
  const tags = []
  const doc = {
    head: {
      querySelector(selector) {
        const [, attr, key] = selector.match(/^meta\[(\w+)="(.+)"\]$/)
        return tags.find(tag => tag[attr] === key)
      },
      appendChild: tag => tags.push(tag),
    },
    createElement: () => ({ setAttribute(key, value) { this[key] = value } }),
  }
  const value = key => tags.find(tag => tag.name === key || tag.property === key)?.content
  updatePageMetadata({ title: 'No encontrada', noindex: true }, doc)
  assert.equal(value('robots'), 'noindex, follow')
  const count = tags.length
  updatePageMetadata({ title: 'Contacto', description: 'Escríbanos' }, doc)
  assert.equal(doc.title, 'Contacto | IPN Chile')
  assert.equal(value('description'), 'Escríbanos')
  assert.equal(value('og:title'), doc.title)
  assert.equal(value('twitter:description'), 'Escríbanos')
  assert.equal(value('robots'), 'index, follow')
  assert.equal(tags.length, count)
  updatePageMetadata({}, doc)
  assert.equal(doc.title, 'IPN Chile')
  assert.equal(value('description'), defaultDescription)
})
