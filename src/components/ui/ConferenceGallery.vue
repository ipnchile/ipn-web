<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useSiteData } from '@/composables/useSiteData'
import { createModalController } from '@/utils/modal'

const groups = useSiteData('news.conferenceGallery')
const photos = computed(() => groups.value.flatMap(group => group.photos.map(photo => ({ ...photo, group: group.title }))))
const selected = ref(null)
const dialog = ref(null)
const current = computed(() => photos.value.find(photo => photo.id === selected.value))
const index = computed(() => photos.value.findIndex(photo => photo.id === selected.value))
const modal = createModalController()

async function open(photo) {
  selected.value = photo.id
  await nextTick()
  if (current.value) modal.activate(dialog.value, close)
}
function close() {
  selected.value = null
  modal.deactivate()
}
function move(step) {
  selected.value = photos.value[(index.value + step + photos.value.length) % photos.value.length].id
}
watch(current, photo => { if (selected.value && !photo) close() })
onBeforeUnmount(() => modal.deactivate({ restoreFocus: false }))
</script>

<template>
  <section v-if="photos.length" id="galeria-conferencias" class="section-container section-block conference-gallery" aria-labelledby="conference-gallery-title">
    <div class="section-heading">
      <p class="section-eyebrow">Encuentro de nuestra misión</p>
      <h2 id="conference-gallery-title" class="section-title">Conferencias en Nacimiento 2026</h2>
      <p class="section-description">Una selección de momentos de nuestras conferencias: la Palabra, la adoración y la comunión. Pulse una fotografía para verla completa.</p>
    </div>
    <div v-for="group in groups" :key="group.id" class="conference-group">
      <h3>{{ group.title }}</h3>
      <div class="conference-grid">
        <figure v-for="photo in group.photos" :key="photo.id" class="glass-panel conference-photo">
          <button type="button" :aria-label="`Ampliar: ${photo.title}`" @click="open(photo)">
            <img :src="photo.thumbnail" :srcset="photo.srcset" sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw" :alt="photo.title" :width="photo.width" :height="photo.height" loading="lazy" decoding="async">
            <span class="conference-photo__expand" aria-hidden="true">↗</span>
          </button>
          <figcaption>{{ photo.title }}</figcaption>
        </figure>
      </div>
    </div>
    <Teleport to="body">
      <div v-if="current" class="conference-lightbox" @click.self="close">
        <div ref="dialog" class="conference-lightbox__dialog" role="dialog" aria-modal="true" aria-labelledby="conference-photo-caption" tabindex="-1" @keydown.left.prevent="move(-1)" @keydown.right.prevent="move(1)">
          <button type="button" class="conference-lightbox__close" aria-label="Cerrar fotografía" @click="close">×</button>
          <img :src="current.src" :alt="current.title" :width="current.width" :height="current.height">
          <div class="conference-lightbox__footer">
            <button type="button" aria-label="Fotografía anterior" @click="move(-1)">‹</button>
            <div aria-live="polite">
              <p id="conference-photo-caption">{{ current.title }}</p>
              <span>{{ current.group }} · {{ index + 1 }} de {{ photos.length }}</span>
            </div>
            <button type="button" aria-label="Fotografía siguiente" @click="move(1)">›</button>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.conference-gallery { scroll-margin-top: 150px; }
.conference-group + .conference-group { margin-top: 2rem; }
.conference-group h3 { margin-bottom: 1rem; font-size: 1.3rem; }
.conference-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
.conference-photo { margin: 0; padding: 0; overflow: hidden; }
.conference-photo button { position: relative; display: block; width: 100%; border: 0; padding: 0; cursor: zoom-in; background: #08111c; }
.conference-photo img { display: block; width: 100%; height: auto; aspect-ratio: 3 / 2; object-fit: contain; }
.conference-photo__expand { position: absolute; right: .6rem; bottom: .6rem; width: 32px; height: 32px; display: grid; place-items: center; border-radius: 50%; background: #08111cce; color: white; }
.conference-photo figcaption { padding: .9rem 1rem; color: var(--theme-text-soft); font-size: .9rem; line-height: 1.5; }
.conference-photo button:focus-visible { outline: 3px solid var(--theme-secondary); outline-offset: -3px; }
.conference-lightbox { position: fixed; inset: 0; z-index: 9999; display: grid; place-items: center; padding: 1rem; background: #000e; }
.conference-lightbox__dialog { position: relative; width: min(1200px, 100%); max-height: 94dvh; overflow-y: auto; background: #08111c; border-radius: 14px; color: white; }
.conference-lightbox__dialog > img { display: block; width: 100%; height: auto; max-height: 78dvh; object-fit: contain; }
.conference-lightbox button { min-width: 44px; min-height: 44px; border: 1px solid #ffffff50; border-radius: 50%; background: #08111ce8; color: white; cursor: pointer; font-size: 2rem; }
.conference-lightbox button:focus-visible { outline: 3px solid #ecd19a; outline-offset: 3px; }
.conference-lightbox__close { position: absolute; top: .75rem; right: .75rem; }
.conference-lightbox__footer { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem; text-align: center; }
.conference-lightbox__footer p { margin: 0 0 .25rem; }
.conference-lightbox__footer span { font-size: .8rem; color: #c5cbd4; }
@media (max-width: 900px) { .conference-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 640px) { .conference-grid { grid-template-columns: minmax(0, 1fr); } .conference-lightbox { padding: .5rem; } }
</style>
