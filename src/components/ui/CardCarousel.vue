<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick, useId } from 'vue'
const props = defineProps({ label: { type: String, required: true }, count: { type: Number, required: true } })
const track = ref(null), overflow = ref(false), atStart = ref(true), atEnd = ref(true), dragging = ref(false)
const first = ref(1), last = ref(1), trackId = useId()
let observer, pointer, suppressClick = false
function update() {
  const el = track.value
  if (!el) return
  overflow.value = el.scrollWidth > el.clientWidth + 2
  atStart.value = el.scrollLeft <= 2
  atEnd.value = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2
  const bounds = el.getBoundingClientRect()
  const visible = [...el.children].map((child, index) => ({ index, rect: child.getBoundingClientRect() })).filter(({ rect }) => rect.right > bounds.left + 10 && rect.left < bounds.right - 10)
  first.value = (visible[0]?.index ?? 0) + 1
  last.value = (visible.at(-1)?.index ?? 0) + 1
}
function advance(direction) {
  const el = track.value
  const step = el.children[0]?.getBoundingClientRect().width + 20 || el.clientWidth
  el.scrollBy({ left: direction * step, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
}
function wheel(event) {
  if (!overflow.value || event.ctrlKey || event.metaKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
  const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? track.value.clientWidth : 1)
  if (!delta || (delta < 0 && atStart.value) || (delta > 0 && atEnd.value)) return
  event.preventDefault()
  track.value.scrollLeft += delta
}
function down(event) {
  if (event.pointerType !== 'mouse' || event.button !== 0 || !overflow.value) return
  suppressClick = false
  pointer = { id: event.pointerId, x: event.clientX, start: track.value.scrollLeft }
}
function move(event) {
  if (!pointer || event.pointerId !== pointer.id) return
  const distance = event.clientX - pointer.x
  if (!dragging.value && Math.abs(distance) < 6) return
  dragging.value = true
  suppressClick = true
  track.value.setPointerCapture(event.pointerId)
  track.value.scrollLeft = pointer.start - distance
}
function up() {
  if (pointer && track.value?.hasPointerCapture(pointer.id)) track.value.releasePointerCapture(pointer.id)
  pointer = null
  dragging.value = false
}
function click(event) {
  if (suppressClick && event.detail !== 0) { event.preventDefault(); event.stopPropagation(); suppressClick = false }
}
function key(event) {
  if (event.target !== track.value) return
  if (['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); advance(event.key === 'ArrowLeft' ? -1 : 1) }
}
onMounted(() => {
  observer = new ResizeObserver(update)
  observer.observe(track.value)
  track.value.addEventListener('wheel', wheel, { passive: false })
  update()
})
watch(() => props.count, async () => { await nextTick(); update() })
onBeforeUnmount(() => { observer?.disconnect(); track.value?.removeEventListener('wheel', wheel) })
</script>

<template>
  <div class="card-carousel" role="region" aria-roledescription="carrusel" :aria-label="label">
    <div v-if="overflow" class="carousel-toolbar">
      <p class="carousel-hint">Deslice o use la rueda del mouse</p>
      <div class="carousel-controls">
        <span class="carousel-count">{{ first }}–{{ last }} de {{ count }}</span>
        <button type="button" :aria-label="'Anteriores: ' + label" :aria-controls="trackId" :disabled="atStart" @click="advance(-1)">←</button>
        <button type="button" :aria-label="'Siguientes: ' + label" :aria-controls="trackId" :disabled="atEnd" @click="advance(1)">→</button>
      </div>
    </div>
    <div :id="trackId" ref="track" class="carousel-track" :class="{ dragging, scrollable: overflow }" :tabindex="overflow ? 0 : undefined" :aria-label="label" @scroll.passive="update" @keydown="key" @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="up" @lostpointercapture="up" @pointerleave="!dragging && up()" @click.capture="click" @dragstart.prevent>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.card-carousel { min-width: 0; }
.carousel-toolbar, .carousel-controls { display: flex; align-items: center; gap: .65rem; }
.carousel-toolbar { justify-content: space-between; flex-wrap: wrap; margin-bottom: .75rem; }
.carousel-hint, .carousel-count { margin: 0; color: var(--theme-text-soft); font-size: .85rem; }
.carousel-controls button { width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--theme-border-soft); color: var(--theme-text); background: var(--theme-panel-bg-soft); font-size: 1.25rem; }
.carousel-controls button:disabled { opacity: .35; cursor: default; }
.carousel-controls button:not(:disabled):hover { color: var(--theme-secondary); border-color: currentColor; }
.carousel-track { display: grid; grid-auto-flow: column; grid-auto-columns: calc((100% - 40px) / 3); gap: 20px; overflow-x: auto; overscroll-behavior-x: contain; padding: 6px 4px 18px; scrollbar-width: thin; scrollbar-color: var(--theme-secondary) transparent; }
.carousel-track > :deep(*) { min-width: 0; }
.carousel-track.scrollable { cursor: grab; }
.carousel-track.dragging { cursor: grabbing; user-select: none; }
.carousel-track:focus-visible, .carousel-controls button:focus-visible { outline: 2px solid var(--theme-secondary); outline-offset: 3px; }
@media (max-width: 1000px) { .carousel-track { grid-auto-columns: calc((100% - 20px) / 2); } }
@media (max-width: 640px) { .carousel-track { grid-auto-columns: 88%; } .carousel-hint { font-size: .78rem; } }
</style>
