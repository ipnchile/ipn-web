<script setup>
import { MAX_BANNER_SLIDES, newBannerSlide } from '../../src/utils/banner.js'
const model = defineModel({ type: Object, required: true })
defineProps({ mediaUploads: Boolean, uploadImage: Function })
const imageUrl = value => value?.startsWith('asset:') ? `/api/media/${value.slice(6)}` : value
function add() {
  if (model.value.slides.length >= MAX_BANNER_SLIDES) return
  const slide = newBannerSlide()
  model.value.slides.push(slide)
  if (!model.value.primarySlideId) model.value.primarySlideId = slide.id
}
function remove(index) {
  const [removed] = model.value.slides.splice(index, 1)
  if (removed.id === model.value.primarySlideId) model.value.primarySlideId = model.value.slides[0]?.id || ''
}
function move(index, direction) {
  const target = index + direction
  if (target < 0 || target >= model.value.slides.length) return
  const [slide] = model.value.slides.splice(index, 1)
  model.value.slides.splice(target, 0, slide)
}
</script>
<template>
  <section class="banner-editor media-box" aria-labelledby="banner-images-title">
    <h3 id="banner-images-title">Imágenes de la portada</h3>
    <p>Una imagen queda como banner fijo. Con dos o más se crea un carrusel. La imagen principal aparece primero; las demás siguen el orden de esta lista.</p>
    <p>Pegue el enlace público de Cloudflare, por ejemplo https://media.ipnchile.cl/carpeta/foto.webp. El enlace del panel dash.cloudflare.com no es una imagen pública.</p>
    <p class="banner-mode"><strong>{{ model.slides.length > 1 ? `Carrusel · ${model.slides.length} imágenes` : 'Banner fijo · una imagen' }}</strong></p>
    <label>Efecto de transición<select :value="model.transition || 'fade'" @change="model.transition = $event.target.value"><option value="fade">Desvanecer</option><option value="slide">Deslizar</option><option value="zoom">Zoom suave</option><option value="none">Sin efecto</option></select></label>
    <p>El efecto se aplica al cambiar de imagen. Use Vista previa para revisarlo antes de publicar.</p>
    <article v-for="(slide, index) in model.slides" :key="slide.id" class="slide-editor">
      <header><h4>Imagen {{ index + 1 }}</h4><span v-if="model.primarySlideId === slide.id" class="badge">Principal</span></header>
      <div class="slide-tools">
        <button type="button" :aria-pressed="model.primarySlideId === slide.id" @click="model.primarySlideId = slide.id">{{ model.primarySlideId === slide.id ? 'Imagen principal' : 'Elegir como principal' }}</button>
        <button type="button" :disabled="index === 0" :aria-label="`Subir imagen ${index + 1}`" @click="move(index,-1)">↑ Subir</button>
        <button type="button" :disabled="index === model.slides.length - 1" :aria-label="`Bajar imagen ${index + 1}`" @click="move(index,1)">↓ Bajar</button>
        <button type="button" :disabled="model.slides.length === 1" :aria-label="`Quitar imagen ${index + 1}`" @click="remove(index)">Quitar</button>
      </div>
      <label v-if="mediaUploads">Cargar imagen {{ index + 1 }}<input type="file" accept="image/webp,image/jpeg,image/png" @change="uploadImage($event, slide)"></label>
      <label>Ruta de la imagen {{ index + 1 }}<input v-model="slide.image" required maxlength="1000" placeholder="https://media.ipnchile.cl/carpeta/foto.webp"></label>
      <img v-if="slide.image" class="slide-thumbnail" :src="imageUrl(slide.image)" :alt="slide.alt || `Vista previa de imagen ${index + 1}`">
      <label>Descripción de la imagen {{ index + 1 }} para accesibilidad<input v-model="slide.alt" maxlength="200" placeholder="Describa brevemente lo que se ve en la foto"></label>
      <label>Ajuste de la imagen {{ index + 1 }}<select v-model="slide.fit"><option value="cover">Llenar el espacio (fotografía)</option><option value="contain">Mostrar completa (afiche)</option></select></label>
      <label>Zoom de imagen {{ index + 1 }}: {{ slide.zoom ?? 100 }}%<input type="range" min="100" max="200" step="1" :value="slide.zoom ?? 100" @input="slide.zoom = Number($event.target.value)"></label>
      <label>Posición horizontal de imagen {{ index + 1 }}: {{ slide.positionX ?? 50 }}%<input type="range" min="0" max="100" step="1" :value="slide.positionX ?? 50" @input="slide.positionX = Number($event.target.value)"></label>
      <label>Posición vertical de imagen {{ index + 1 }}: {{ slide.positionY ?? 50 }}%<input type="range" min="0" max="100" step="1" :value="slide.positionY ?? 50" @input="slide.positionY = Number($event.target.value)"></label>
      <button type="button" @click="slide.zoom = 100; slide.positionX = 50; slide.positionY = 50">Restablecer encuadre de imagen {{ index + 1 }}</button>
      <p>El zoom amplía la foto y recorta sus bordes. Ajuste la posición para centrar a las personas; no amplía los textos superpuestos.</p>
      <label class="checkbox"><input v-model="slide.showText" type="checkbox">Mostrar textos superpuestos en imagen {{ index + 1 }}</label>
      <div v-if="slide.showText" class="slide-text-fields">
        <label>Antetítulo de imagen {{ index + 1 }}<input v-model="slide.eyebrow" maxlength="100" placeholder="Conferencias IPN Chile"></label>
        <label>Título de imagen {{ index + 1 }}<input v-model="slide.title" maxlength="200" placeholder="Un tiempo de fe y comunión"></label>
        <label>Texto de imagen {{ index + 1 }}<textarea v-model="slide.description" rows="3" maxlength="600"></textarea></label>
        <label>Texto del botón de imagen {{ index + 1 }}<input v-model="slide.buttonText" maxlength="80" placeholder="Ver más"></label>
      </div>
      <label>Enlace de imagen {{ index + 1 }} (opcional)<input v-model="slide.link" maxlength="1000" placeholder="/actualidad/noticias"></label>
    </article>
    <button type="button" :disabled="model.slides.length >= MAX_BANNER_SLIDES" @click="add">+ Agregar imagen</button>
    <p>Hasta {{ MAX_BANNER_SLIDES }} imágenes. Puede guardar y publicar con una sola. Quitar una imagen de esta lista no borra el archivo de Cloudflare.</p>
  </section>
</template>
<style scoped>
.slide-editor{border:1px solid #bac8d6;border-radius:12px;padding:1rem;margin:1rem 0;background:#fff}.slide-editor header,.slide-tools{display:flex;align-items:center;gap:.5rem;flex-wrap:wrap}.slide-editor h4{margin:0;font-size:1.1rem}.slide-tools{margin:1rem 0}.slide-tools button{font-size:.8rem}.slide-thumbnail{display:block;width:100%;max-height:240px;object-fit:contain;background:#102235;border-radius:8px;margin:.7rem 0}.slide-text-fields{border-left:3px solid #b28d49;padding-left:1rem}.banner-mode{color:#173a5d}
</style>
