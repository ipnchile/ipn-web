<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { bannerSlides } from '../../utils/banner.js'
const props = defineProps({ banner: { type: Object, required: true }, preview: Boolean })
const slides = computed(() => bannerSlides(props.banner))
const current = ref(0), paused = ref(false), hovering = ref(false), focused = ref(false), hidden = ref(false), reducedMotion = ref(false)
const multiple = computed(() => slides.value.length > 1)
const photoOnly = computed(() => slides.value.length > 0 && slides.value.every(slide => slide.fit === 'contain' && !slide.showText))
const signature = computed(() => JSON.stringify(slides.value))
let timer, motion
function stop() { clearInterval(timer); timer = undefined }
function start() {
  stop()
  if (multiple.value && !paused.value && !hovering.value && !focused.value && !hidden.value && !reducedMotion.value) {
    timer = setInterval(() => { current.value = (current.value + 1) % slides.value.length }, 7000)
  }
}
function go(index) { paused.value = true; current.value = (index + slides.value.length) % slides.value.length }
function visibility() { hidden.value = document.hidden }
function motionChange() { reducedMotion.value = motion.matches }
function focusOut(event) { if (!event.currentTarget.contains(event.relatedTarget)) focused.value = false }
watch(signature, () => { current.value = 0; start() })
watch([multiple, paused, hovering, focused, hidden, reducedMotion], start)
onMounted(() => {
  motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionChange(); visibility()
  motion.addEventListener('change', motionChange)
  document.addEventListener('visibilitychange', visibility)
  start()
})
onBeforeUnmount(() => { stop(); motion?.removeEventListener('change', motionChange); document.removeEventListener('visibilitychange', visibility) })
</script>

<template>
  <section v-if="slides.length" class="banner-carousel" :class="[{ single: !multiple, 'photo-only': photoOnly && multiple }, `effect-${banner.transition || 'fade'}`]" :aria-label="banner.title || 'Imágenes de nuestra iglesia'" :aria-roledescription="multiple ? 'carrusel' : undefined"
    @mouseenter="hovering = true" @mouseleave="hovering = false" @focusin="focused = true" @focusout="focusOut"
    @keydown.left.prevent="multiple && go(current - 1)" @keydown.right.prevent="multiple && go(current + 1)">
    <div class="banner-stage" :aria-live="paused || reducedMotion ? 'polite' : 'off'">
      <article v-for="(slide, index) in slides" :key="slide.id" class="banner-slide" :class="{ active: index === current, poster: slide.fit === 'contain', 'with-text': slide.showText }" :aria-hidden="index !== current" :inert="index !== current" :aria-label="multiple ? `Imagen ${index + 1} de ${slides.length}` : undefined">
        <img :src="slide.image" :alt="slide.alt || slide.title || banner.title" :style="{ transform: `scale(${(slide.zoom ?? 100) / 100})`, objectPosition: `${slide.positionX ?? 50}% ${slide.positionY ?? 50}%`, transformOrigin: `${slide.positionX ?? 50}% ${slide.positionY ?? 50}%` }" :fetchpriority="index === 0 ? 'high' : 'auto'" :loading="index === 0 ? 'eager' : 'lazy'">
        <div v-if="slide.showText" class="banner-shade"></div>
        <div v-if="slide.showText" class="banner-copy">
          <p v-if="slide.eyebrow" class="banner-eyebrow">{{ slide.eyebrow }}</p>
          <h2 v-if="slide.title">{{ slide.title }}</h2>
          <p v-if="slide.description" class="banner-description">{{ slide.description }}</p>
          <a v-if="slide.link && !preview" :href="slide.link" class="banner-action">{{ slide.buttonText || 'Ver más' }} <span aria-hidden="true">→</span></a>
          <span v-else-if="slide.link" class="banner-action">{{ slide.buttonText || 'Ver más' }} →</span>
        </div>
        <a v-else-if="slide.link && !preview" class="banner-image-link" :href="slide.link" :aria-label="slide.title || slide.alt || banner.title"></a>
      </article>
    </div>
    <div v-if="multiple" class="banner-controls" aria-label="Controles del carrusel">
      <button type="button" aria-label="Imagen anterior" @click="go(current - 1)">‹</button>
      <div class="banner-dots"><button v-for="(slide, index) in slides" :key="slide.id" type="button" :class="{ selected: index === current }" :aria-current="index === current ? 'true' : undefined" :aria-label="`Mostrar imagen ${index + 1}`" @click="go(index)"><span></span></button></div>
      <button type="button" aria-label="Imagen siguiente" @click="go(current + 1)">›</button>
      <button v-if="!reducedMotion" type="button" class="banner-pause" :aria-label="paused ? 'Reanudar carrusel' : 'Pausar carrusel'" :title="paused ? 'Reanudar carrusel' : 'Pausar carrusel'" @click="paused = !paused">
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path v-if="paused" d="M7 4v16l14-8z" /><path v-else d="M6 4h4v16H6zm8 0h4v16h-4z" /></svg>
      </button>
    </div>
  </section>
</template>

<style scoped>
.banner-carousel{position:relative;background:#08111c;color:white;isolation:isolate;container-type:inline-size}
.banner-stage{position:relative;display:grid;min-height:clamp(440px,65vh,740px);overflow:hidden}
.banner-slide{grid-area:1/1;position:relative;min-width:0;opacity:0;visibility:hidden;transition:opacity .6s ease,visibility .6s ease;overflow:hidden}
.banner-slide.active{opacity:1;visibility:visible;z-index:1}
.effect-slide .banner-slide{transform:translateX(7%);transition:opacity .6s ease,visibility .6s ease,transform .6s ease}
.effect-zoom .banner-slide{transform:scale(1.06);transition:opacity .6s ease,visibility .6s ease,transform .6s ease}
.effect-slide .banner-slide.active,.effect-zoom .banner-slide.active{transform:none}
.effect-none .banner-slide{transition:none}
.banner-slide img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
.banner-slide.poster img{object-fit:contain}
.single .banner-stage:has(.poster:not(.with-text)){min-height:0}
.single .poster:not(.with-text) img{position:relative;height:auto;display:block}
.banner-shade{position:absolute;inset:0;background:linear-gradient(90deg,#061321dc,#06132169 65%,#06132125),linear-gradient(0deg,#06132188,transparent 60%)}
.banner-copy{position:relative;padding:clamp(3rem,7vw,6rem) clamp(1.4rem,6vw,6rem) 7rem;max-width:1000px;min-height:100%;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;overflow-wrap:anywhere}
.banner-eyebrow{color:#ecd19a;font-size:.8rem;letter-spacing:.16em;text-transform:uppercase;font-weight:700;margin:0 0 1rem}
.banner-copy h2{font-family:var(--font-serif,Georgia,serif);font-size:clamp(2rem,4vw,4.3rem);line-height:1.12;color:#fff;max-width:20ch;margin:0 0 1.2rem;text-wrap:balance}
.banner-description{font-size:clamp(1rem,1.6vw,1.2rem);line-height:1.65;max-width:58ch;white-space:pre-line;margin:0 0 1.6rem;color:#f3f5f7}
.banner-action{display:inline-flex;align-items:center;gap:1rem;border:1px solid #ecd19a;color:#ecd19a;padding:.8rem 1.3rem;border-radius:6px;font-weight:700;text-decoration:none;background:#08111c45}
.banner-image-link{position:absolute;inset:0}
.banner-controls{position:absolute;z-index:3;bottom:1rem;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:.3rem;max-width:calc(100% - 1rem);padding:.25rem .5rem;border:1px solid #ffffff50;border-radius:30px;background:#07111ee8}
.banner-controls button{flex-shrink:0;background:transparent;color:white;border:0;min-width:40px;min-height:44px;cursor:pointer;font-size:1.6rem;border-radius:8px}
.banner-controls .banner-pause{font-size:.8rem;padding:0 .6rem}
.banner-dots{display:flex;flex-wrap:wrap;justify-content:center}.banner-dots button{min-width:24px;width:24px}.banner-dots span{display:block;width:8px;height:8px;margin:auto;background:#ffffff70;border-radius:50%}.banner-dots .selected span{background:#ecd19a;outline:2px solid #ecd19a;outline-offset:3px}
.banner-controls button:focus-visible,.banner-action:focus-visible,.banner-image-link:focus-visible{outline:3px solid #ecd19a;outline-offset:2px}
.photo-only .banner-stage{height:calc(100svh - 88px);min-height:360px}
.photo-only .banner-slide img{object-fit:cover}
.photo-only .banner-controls{inset:0;left:0;bottom:0;transform:none;max-width:none;width:100%;padding:0;border:0;border-radius:0;background:none;pointer-events:none}
.photo-only .banner-controls button{pointer-events:auto;text-shadow:0 1px 8px #000;font-size:2rem;display:grid;place-items:center;opacity:.8}
.photo-only .banner-controls button:hover,.photo-only .banner-controls button:focus-visible{opacity:1;background:#08111c55}
.photo-only .banner-controls > button:first-child,.photo-only .banner-controls > button:nth-child(3){position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:50%}
.photo-only .banner-controls > button:first-child{left:1rem}
.photo-only .banner-controls > button:nth-child(3){right:1rem}
.photo-only .banner-dots{position:absolute;bottom:.5rem;left:50%;transform:translateX(-50%);flex-wrap:nowrap}
.photo-only .banner-dots button{width:28px;min-width:28px}
.photo-only .banner-dots span{width:6px;height:6px;background:#ffffff85;box-shadow:0 1px 5px #0008}
.photo-only .banner-dots .selected span{background:white;outline:0;transform:scale(1.4)}
.photo-only .banner-controls .banner-pause{position:absolute;bottom:.5rem;right:1rem;width:44px;height:44px;padding:0}
@container(max-width:600px){.banner-copy{padding:2.5rem 1.4rem 8rem}.banner-copy h2{font-size:2rem}.banner-stage{min-height:510px}.banner-controls{width:max-content}.banner-dots button{min-width:18px;width:18px}.banner-controls button{min-width:32px}.banner-controls .banner-pause{font-size:.72rem}.banner-shade{background:linear-gradient(0deg,#061321f2,#06132188)}}
@container(max-width:600px){.photo-only .banner-stage{height:calc(100svh - 102px)}.photo-only .banner-controls > button:first-child{left:.25rem}.photo-only .banner-controls > button:nth-child(3),.photo-only .banner-controls .banner-pause{right:.25rem}}
@media(prefers-reduced-motion:reduce){.banner-carousel .banner-slide{transition:none;transform:none}}
</style>
