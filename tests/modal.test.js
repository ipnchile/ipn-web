import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createModalController } from '../src/utils/modal.js'

function fixture() {
  const handlers = new Map()
  const app = { inert: false, contains: () => false }
  const doc = {
    body: { style: { overflow: 'scroll' } },
    getElementById: () => app,
    addEventListener: (name, callback) => handlers.set(name, callback),
    removeEventListener: (name) => handlers.delete(name),
  }
  const element = () => ({ tabIndex: 0, isConnected: true, getClientRects: () => [1], focus() { doc.activeElement = this } })
  const trigger = element()
  const first = element()
  const last = element()
  const dialog = { ...element(), querySelectorAll: () => [first, last], contains: el => [dialog, first, last].includes(el) }
  trigger.focus()
  const press = (key, shiftKey = false) => {
    const event = { key, shiftKey, prevented: false, preventDefault() { this.prevented = true } }
    handlers.get('keydown')?.(event)
    return event
  }
  return { doc, app, handlers, trigger, first, last, dialog, press }
}

test('Escape restaura desplazamiento, interacción y foco originales', () => {
  const f = fixture()
  const modal = createModalController(f.doc)
  modal.activate(f.dialog, () => modal.deactivate())
  assert.equal(f.doc.body.style.overflow, 'hidden')
  assert.equal(f.app.inert, true)
  assert.equal(f.doc.activeElement, f.first)
  assert.equal(f.press('Escape').prevented, true)
  assert.equal(f.doc.body.style.overflow, 'scroll')
  assert.equal(f.app.inert, false)
  assert.equal(f.doc.activeElement, f.trigger)
  assert.equal(f.handlers.size, 0)
})

test('Tab y Mayús+Tab mantienen el foco dentro del modal', () => {
  const f = fixture()
  const modal = createModalController(f.doc)
  modal.activate(f.dialog, () => {})
  assert.equal(f.press('Tab', true).prevented, true)
  assert.equal(f.doc.activeElement, f.last)
  assert.equal(f.press('Tab').prevented, true)
  assert.equal(f.doc.activeElement, f.first)
  f.handlers.get('focusin')({ target: f.trigger })
  assert.equal(f.doc.activeElement, f.first)
  modal.deactivate()
})

test('Desmontar sin devolver foco limpia el bloqueo y permite reabrir', () => {
  const f = fixture()
  const modal = createModalController(f.doc)
  modal.activate(f.dialog, () => {})
  modal.deactivate({ restoreFocus: false })
  assert.equal(f.doc.activeElement, f.first)
  assert.equal(f.doc.body.style.overflow, 'scroll')
  assert.equal(f.app.inert, false)
  assert.equal(f.handlers.size, 0)
  modal.deactivate()
  f.trigger.focus()
  modal.activate(f.dialog, () => modal.deactivate())
  f.press('Escape')
  assert.equal(f.doc.activeElement, f.trigger)
})

test('Conserva un bloqueo previo y no enfoca un disparador eliminado', () => {
  const f = fixture()
  f.app.inert = true
  f.doc.body.style.overflow = 'hidden'
  const modal = createModalController(f.doc)
  modal.activate(f.dialog, () => {})
  f.trigger.isConnected = false
  modal.deactivate()
  assert.equal(f.app.inert, true)
  assert.equal(f.doc.body.style.overflow, 'hidden')
  assert.notEqual(f.doc.activeElement, f.trigger)
})
