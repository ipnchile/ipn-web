import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { computed, effectScope, nextTick, ref, shallowRef, watch } from 'vue'
import { activeConferenceVideo } from '../src/utils/conferenceVideo.js'

// Exercise the component's real watcher with the same reactive sources as the content loader.
const source = readFileSync(new URL('../src/components/ui/ConferenceVideo.vue', import.meta.url), 'utf8')
const watcher = source.slice(source.indexOf('watch(['), source.indexOf('watch(() => route.fullPath'))

test('Refreshing published content preserves playback; changing or disabling the video still applies', async () => {
  const scope = effectScope()
  const settled = shallowRef(false), routeReady = ref(true)
  const content = shallowRef({ mode: 'live', liveUrl: 'https://youtu.be/JUDq7z_UeN4' })
  const video = computed(() => activeConferenceVideo(content.value))
  let opened = false, closes = 0, opens = 0
  const close = () => { if (opened) closes++; opened = false }
  const open = () => { opens++; opened = true }
  scope.run(() => new Function('watch', 'settled', 'routeReady', 'video', 'close', 'open', 'seen', watcher)(watch, settled, routeReady, video, close, open, new Set()))
  try {
    settled.value = true
    await nextTick()
    assert.equal(opened, true)
    for (let refresh = 0; refresh < 5; refresh++) {
      content.value = { ...content.value }
      await nextTick()
      assert.equal(opened, true, 'Same video must remain open after a server refresh')
    }
    assert.equal(closes, 0)
    assert.equal(opens, 1)
    content.value = { mode: 'live', liveUrl: 'https://youtu.be/MbUdOiR34q0' }
    await nextTick()
    assert.equal(closes, 1)
    assert.equal(opens, 2)
    assert.equal(opened, true)
    content.value = { mode: 'off' }
    await nextTick()
    assert.equal(opened, false)
    assert.equal(closes, 2)
  } finally { scope.stop() }
})
