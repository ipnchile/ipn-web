<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePublishedContent } from '@/composables/usePublishedContent'
import { activeConferenceVideo } from '@/utils/conferenceVideo'

const { conferenceVideo, settled } = usePublishedContent()
const video = computed(() => activeConferenceVideo(conferenceVideo.value))
const route = useRoute()
const router = useRouter(), routeReady = ref(false)
onMounted(async () => { await router.isReady(); routeReady.value = true })
const dialog = ref(null), launcher = ref(null), opened = ref(false)
const seen = new Set()
let previousOverflow = '', previousFocus = null
const embed = computed(() => video.value ? `https://www.youtube-nocookie.com/embed/${video.value.id}?autoplay=1&mute=0&playsinline=1&rel=0&hl=es` : '')
async function open() {
  if (!video.value || opened.value) return
  previousFocus = document.activeElement
  previousOverflow = document.body.style.overflow
  opened.value = true
  await nextTick()
  if (!opened.value || !dialog.value) return
  dialog.value.showModal()
  document.body.style.overflow = 'hidden'
}
function close() {
  if (!opened.value) return
  opened.value = false
  dialog.value?.close()
  document.body.style.overflow = previousOverflow
  const target = previousFocus instanceof HTMLElement && previousFocus !== document.body && previousFocus.isConnected ? previousFocus : launcher.value
  target?.focus()
}
watch([settled, routeReady, () => video.value?.id, () => video.value?.mode], () => {
  close()
  if (!settled.value || !routeReady.value || !video.value) return
  const key = `${video.value.mode}:${video.value.id}`
  if (!seen.has(key)) { seen.add(key); open() }
}, { immediate: true, flush: 'post' })
watch(() => route.fullPath, close)
onBeforeUnmount(close)
</script>

<template>
  <button v-if="video && settled" ref="launcher" class="conference-watch" :class="{ live: video.mode === 'live' }" @click="open">
    <span aria-hidden="true">▶</span> {{ video.mode === 'live' ? 'Ver transmisión en vivo' : 'Ver previa de conferencias' }}
  </button>
  <Teleport to="body">
    <dialog ref="dialog" class="conference-dialog" aria-labelledby="conference-video-title" aria-describedby="conference-video-help" @cancel.prevent="close" @close="close" @click="($event.target === dialog) && close()">
      <template v-if="opened && video">
        <header><div><p>{{ video.mode === 'live' ? 'EN VIVO · IPN CHILE' : 'CONFERENCIAS · IPN CHILE' }}</p><h2 id="conference-video-title">{{ video.title }}</h2></div><button autofocus class="video-close" @click="close">Cerrar <span aria-hidden="true">×</span></button></header>
        <iframe :key="embed" :src="embed" :title="video.title" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
        <footer><p id="conference-video-help">Si el video no comienza automáticamente, pulse reproducir para verlo con sonido.</p><a :href="video.url" target="_blank" rel="noopener noreferrer">Abrir en YouTube ↗</a></footer>
      </template>
    </dialog>
  </Teleport>
</template>

<style scoped>
.conference-watch{position:fixed;bottom:1.25rem;left:1.25rem;z-index:1040;border:1px solid #d9bf78;border-radius:3rem;background:#122538;color:#fff;padding:.85rem 1.25rem;box-shadow:0 6px 28px #0005;font-weight:650;max-width:calc(100vw - 5.5rem);text-align:left}
.conference-watch span{color:#e5c77f;margin-right:.5rem}.conference-watch.live{background:#a51e2c;border-color:#ff9a9a}.conference-watch.live span{color:#fff}
.conference-dialog{position:fixed;inset:0;margin:auto;padding:0;width:min(1120px,calc(100vw - 2rem));max-width:none;max-height:calc(100dvh - 2rem);overflow:auto;border:1px solid #425364;border-radius:18px;background:#0f2030;color:#fff;box-shadow:0 24px 90px #0009}
.conference-dialog::backdrop{background:#030b16d9;backdrop-filter:blur(5px)}
header{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.25rem 1.5rem}header p{font-size:.72rem;letter-spacing:.14em;color:#e5c77f;margin:0 0 .35rem}h2{font-size:clamp(1.1rem,2.4vw,1.65rem);margin:0;color:#fff}
.video-close{background:#ffffff12;color:#fff;border:1px solid #ffffff55;border-radius:8px;padding:.6rem .8rem;white-space:nowrap}.video-close span{font-size:1.2rem;margin-left:.4rem}
iframe{display:block;width:100%;aspect-ratio:16/9;min-height:200px;max-height:calc(100dvh - 230px);border:0;background:#000}
footer{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:1rem 1.5rem;font-size:.85rem;color:#d0dce6}footer p{margin:0}footer a{color:#efd48d;white-space:nowrap}button:focus-visible,a:focus-visible{outline:3px solid #f6d784;outline-offset:3px}
@media(max-width:600px){header,footer{padding:1rem}footer{align-items:flex-start;flex-direction:column}.conference-watch{left:.75rem;bottom:.75rem;font-size:.82rem}.conference-dialog{width:calc(100vw - 1rem)}}
</style>
