import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isSeasonActive } from '../src/utils/seasonal.js'

test('Activa septiembre según Chile, no según la fecha UTC', () => {
  assert.equal(isSeasonActive(new Date('2026-09-01T02:00:00Z')), false)
  assert.equal(isSeasonActive(new Date('2026-09-01T05:00:00Z')), true)
  assert.equal(isSeasonActive(new Date('2026-10-01T02:00:00Z')), true)
  assert.equal(isSeasonActive(new Date('2026-10-01T04:00:00Z')), false)
  assert.equal(isSeasonActive(new Date('2027-09-18T12:00:00Z')), true)
})
test('Permite activar o desactivar manualmente', () => {
  assert.equal(isSeasonActive(new Date('2026-09-18'), { mode: 'off' }), false)
  assert.equal(isSeasonActive(new Date('2026-12-18'), { mode: 'on' }), true)
})
