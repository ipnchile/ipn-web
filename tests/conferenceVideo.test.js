import { test } from 'node:test'
import assert from 'node:assert/strict'
import { youtubeId, activeConferenceVideo, defaultConferenceVideo } from '../src/utils/conferenceVideo.js'
import { validateContent } from '../admin/worker/content.js'

test('Acepta enlaces compartidos, watch y directos, y rechaza dominios falsos', () => {
  for (const url of ['https://youtu.be/VEPseBfwQZE?si=abc', 'https://www.youtube.com/watch?v=VEPseBfwQZE&t=12', 'https://youtube.com/live/VEPseBfwQZE?si=abc']) assert.equal(youtubeId(url), 'VEPseBfwQZE')
  for (const url of ['javascript:alert(1)', 'https://youtube.com.evil.test/watch?v=VEPseBfwQZE', 'https://evil.test/VEPseBfwQZE', 'https://user@youtube.com/watch?v=VEPseBfwQZE', 'https://youtu.be/short', 'http://youtu.be/VEPseBfwQZE', 'https://youtube.com/@ipnchile/live']) assert.equal(youtubeId(url), null)
})
test('La selección respeta modo apagado y da prioridad al directo', () => {
  assert.equal(activeConferenceVideo(defaultConferenceVideo).id, 'VEPseBfwQZE')
  assert.equal(activeConferenceVideo({ ...defaultConferenceVideo, mode: 'off' }), null)
  assert.equal(activeConferenceVideo({ ...defaultConferenceVideo, mode: 'live', liveUrl: '' }), null)
  assert.equal(activeConferenceVideo({ ...defaultConferenceVideo, mode: 'live', liveUrl: 'https://youtu.be/abcdefghijk' }).id, 'abcdefghijk')
})
test('El mantenedor valida el enlace requerido y conserva compatibilidad con banners antiguos', () => {
  const banner = { title: 'Conferencias', image: 'https://media.ipnchile.cl/banner.webp', enabled: false }
  assert.equal(validateContent('banner', banner).conferenceVideo, undefined)
  assert.deepEqual(validateContent('banner', { ...banner, conferenceVideo: defaultConferenceVideo }).conferenceVideo, defaultConferenceVideo)
  for (const config of [{ mode: 'wrong' }, { mode: 'live', liveUrl: '' }, { mode: 'preview', previewUrl: 'https://evil.test/video' }]) assert.throws(() => validateContent('banner', { ...banner, conferenceVideo: config }), e => e.status === 400)
  assert.equal(validateContent('banner', { ...banner, conferenceVideo: { mode: 'off' } }).conferenceVideo.mode, 'off')
})
