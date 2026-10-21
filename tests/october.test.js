import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isSeasonActive } from '../src/utils/seasonal.js'
import { octoberConfig } from '../src/config/seasonal.js'
import { seasonalHomeBanner } from '../src/utils/seasonalHomeBanner.js'

test('Octubre comienza y termina según la hora de Chile cada año', () => {
  for (const [date, expected] of [
    ['2026-10-01T02:59:59Z', false], ['2026-10-01T03:00:00Z', true],
    ['2026-11-01T02:59:59Z', true], ['2026-11-01T03:00:00Z', false],
    ['2027-10-15T12:00:00Z', true],
  ]) assert.equal(isSeasonActive(new Date(date), octoberConfig), expected)
})

test('El afiche se agrega sin perder el carrusel publicado y se retira al terminar octubre', () => {
  const banner = { enabled: true, primarySlideId: 'existing', slides: [{ id: 'existing', image: '/existing.webp' }] }
  const result = seasonalHomeBanner(banner, true)
  assert.equal(result.slides.length, 2)
  assert.equal(result.slides[0].fit, 'contain')
  assert.equal(result.slides[0].showText, false)
  assert.equal(result.slides[1], banner.slides[0])
  assert.equal(seasonalHomeBanner(banner, false), banner)
  assert.equal(seasonalHomeBanner(null, true).slides.length, 1)
  assert.equal(seasonalHomeBanner(null, false), null)
  assert.equal(seasonalHomeBanner({ enabled: false, slides: banner.slides }, true).slides.length, 1)
})
