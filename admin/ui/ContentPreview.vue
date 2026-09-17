<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { instagramPostUrl } from '../../src/utils/news.js'
import { youtubeId, activeConferenceVideo, defaultConferenceVideo } from '../../src/utils/conferenceVideo.js'
const props = defineProps({ kind: String, draft: Object, published: Object })
const emit = defineEmits(['close'])
const dialog = ref(null), version = ref('draft'), device = ref('desktop')
const data = computed(() => (version.value === 'published' ? props.published : props.draft) || {})
const video = computed(() => activeConferenceVideo(data.value.conferenceVideo ?? defaultConferenceVideo))
function imageUrl(value) {
  if (/^asset:[0-9a-f-]{36}$/.test(value || '')) return `/api/media/${value.slice(6)}`
  try { const u = new URL(value); return u.origin === 'https://media.ipnchile.cl' && !u.username && !u.password ? u.href : '' } catch { return '' }
}
const libraryId = computed(() => youtubeId(data.value.videoUrl))
const paragraphs = computed(() => data.value.bodyText != null ? data.value.bodyText.split(/\n\s*\n/).filter(Boolean) : data.value.paragraphs || [])
const originalFocus = document.activeElement
const overflow = document.body.style.overflow
onMounted(() => { dialog.value.showModal(); document.body.style.overflow = 'hidden' })
onBeforeUnmount(() => { dialog.value?.close(); document.body.style.overflow = overflow; if (originalFocus?.isConnected) originalFocus.focus() })
</script>
<template>
  <Teleport to="body">
    <dialog ref="dialog" class="content-preview" aria-labelledby="preview-title" @cancel.prevent="emit('close')">
      <header class="preview-toolbar"><div><h2 id="preview-title">Vista previa</h2><p>{{ version === 'draft' ? 'Incluye los cambios sin guardar. No publica contenido.' : 'Última versión publicada.' }}</p></div><button autofocus @click="emit('close')">Cerrar ×</button></header>
      <div class="preview-controls"><div role="group" aria-label="Versión"><button :aria-pressed="version === 'draft'" @click="version = 'draft'">Borrador</button><button :disabled="!published" :aria-pressed="version === 'published'" @click="version = 'published'">Publicado</button></div><div role="group" aria-label="Tamaño de vista previa"><button :aria-pressed="device === 'desktop'" @click="device = 'desktop'">Escritorio</button><button :aria-pressed="device === 'mobile'" @click="device = 'mobile'">Móvil</button></div></div>
      <div class="preview-stage"><article class="preview-page" :class="device">
        <p class="preview-brand">IPN CHILE <span>• {{ {news:'Noticias',event:'Eventos',banner:'Inicio',video:'Biblioteca de videos',person:'Pastores',church:'Iglesias'}[kind] }}</span></p>
        <template v-if="kind === 'video'"><section class="preview-video"><p>{{ data.category }}</p><iframe v-if="libraryId" :key="libraryId" :src="'https://www.youtube-nocookie.com/embed/'+libraryId+'?playsinline=1&rel=0'" :title="data.title || 'Video de la biblioteca'" allow="encrypted-media; fullscreen; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe><p v-else class="placeholder">Ingrese un enlace válido de YouTube.</p><h3>{{ data.title || 'Título del video' }}</h3><p>{{ data.description }}</p><button v-if="data.action?.label" type="button" disabled>{{ data.action.label }} →</button><p v-if="data.action?.to">Destino: {{ data.action.to }}</p></section></template>
        <template v-else-if="kind === 'banner'">
          <template v-if="data.enabled"><img v-if="imageUrl(data.image)" class="banner-image" :src="imageUrl(data.image)" :alt="data.title"><p v-else class="placeholder">Seleccione una imagen para el banner</p><h3>{{ data.title || 'Título del banner' }}</h3><p>{{ data.description }}</p></template>
          <p v-else class="placeholder">El banner de imagen está desactivado.</p>
          <section class="preview-video"><h3>{{ video?.title || 'Video de conferencias desactivado' }}</h3><iframe v-if="video" :key="video.id" :src="`https://www.youtube-nocookie.com/embed/${video.id}?playsinline=1&rel=0`" :title="video.title" allow="encrypted-media; fullscreen; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe><p v-else-if="data.conferenceVideo?.mode !== 'off'">Ingrese un enlace válido de YouTube para previsualizarlo.</p></section>
        </template>
        <template v-else>
          <img v-if="imageUrl(data.image || data.foto_url)" class="content-image" :src="imageUrl(data.image || data.foto_url)" :alt="data.title || data.nombre">
          <p class="preview-date">{{ data.dateLabel || data.date || [data.startDate,data.endDate].filter(Boolean).join(' — ') || data.grado || data.comuna }}</p>
          <h3>{{ data.title || data.nombre || 'Título de la publicación' }}</h3><p>{{ data.description }}</p>
          <template v-if="kind === 'news'">
            <p v-if="instagramPostUrl(data.instagramUrl)" class="preview-date">Desde Instagram · @ipnchilecuentaoficial</p>
            <p v-for="(paragraph,index) in paragraphs" :key="index">{{ paragraph }}</p>
            <a v-if="instagramPostUrl(data.instagramUrl)" :href="instagramPostUrl(data.instagramUrl)" target="_blank" rel="noopener noreferrer" class="instagram-link">Ver en Instagram ↗</a>
            <p v-else-if="data.instagramUrl" class="placeholder">Ingrese un enlace válido de una publicación o reel de Instagram.</p>
            <aside class="home-news-preview"><strong>Referencia en el inicio</strong><h3>{{ data.title || 'Título de la noticia' }}</h3><p>Leer noticia →</p><small>Aparece si está entre las tres noticias publicadas más recientes.</small></aside>
          </template>
          <template v-if="kind === 'event'"><p v-if="data.location"><strong>Lugar:</strong> {{ data.location }}</p><p>{{ data.type }}</p><p class="preserve-lines">{{ data.notes }}</p></template>
          <template v-if="kind === 'church'"><p>{{ data.direccion }} · {{ data.region }}</p><p v-for="hour in data.horarios" :key="hour">{{ hour }}</p><p>{{ data.telefono }}</p></template>
          <template v-if="kind === 'person'"><p v-for="(role,index) in data.cargos" :key="index">{{ role.cargo }}</p></template>
          <p v-if="['person','church'].includes(kind)">{{ data.email }}</p>
        </template>
      </article></div>
    </dialog>
  </Teleport>
</template>
<style scoped>
.instagram-link { color: #dab56d; text-decoration: underline; }
.home-news-preview { margin-top: 1.5rem; padding: 1rem; border: 1px solid #778a9a; border-radius: 12px; }
.content-preview{position:fixed;inset:0;margin:auto;padding:0;width:min(1180px,96vw);max-width:96vw;max-height:94dvh;border:1px solid #ccd7e3;border-radius:16px;background:#eef2f6;color:#17283c}.content-preview::backdrop{background:#061425b8}.preview-toolbar{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:1rem 1.4rem;background:#fff}.preview-toolbar p{font-size:.8rem;color:#65758a}.preview-controls{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;padding:1rem}.preview-controls [role=group]{display:flex;gap:.4rem}.preview-controls [aria-pressed=true]{background:#173a5d;color:#fff}.preview-stage{padding:0 1rem 1.5rem}.preview-page{margin:auto;background:linear-gradient(120deg,#112b40,#09151f);color:#e3eaf0;padding:clamp(1rem,3vw,2rem);border-radius:12px;overflow-wrap:anywhere;width:100%}.preview-page.mobile{max-width:390px}.preview-brand{font-weight:800;color:#dab56d;letter-spacing:.1em;font-size:.85rem}.preview-brand span{font-weight:400;letter-spacing:0}.preview-page h3{font-size:clamp(1.3rem,3vw,2rem);line-height:1.2;color:white}.preview-page p{line-height:1.7;margin:1rem 0}.preview-date{color:#dab56d}.content-image{max-height:400px;object-fit:contain;width:100%;background:#081019}.banner-image{width:100%;height:auto}.placeholder{padding:1rem;border:1px dashed #778a9a}.preview-video{margin-top:1.5rem}.preview-video iframe{width:100%;aspect-ratio:16/9;min-height:200px;border:0;background:#000}.preserve-lines{white-space:pre-line}
</style>
