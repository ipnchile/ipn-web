<script setup>
import DirectoryPanel from './DirectoryPanel.vue'
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
const section = ref('content')
const me = ref(null), documents = ref([]), selected = ref(null), form = ref(null), history = ref([])
const filter = ref('news'), busy = ref(false), message = ref(''), error = ref(''), baseline = ref('')
const labels = {news:'Noticias',event:'Eventos',banner:'Banner de inicio'}
const filtered = computed(() => documents.value.filter(d => d.kind === filter.value))
const dirty = computed(() => form.value && JSON.stringify(form.value) !== baseline.value)
const imageUrl = value => value?.startsWith('asset:') ? `/api/media/${value.slice(6)}` : value
async function api(path, options = {}) {
  const response = await fetch(`/api${path}`, {credentials:'same-origin',...options,headers:{'X-IPN-Request':'admin',...(options.body && typeof options.body === 'string' ? {'Content-Type':'application/json'} : {}),...options.headers}})
  if (response.redirected || response.headers.get('Content-Type')?.includes('text/html')) throw new Error('La sesión caducó. Vuelva a ingresar al panel.')
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'No se pudo completar la operación.')
  return data
}
async function run(task) {
  if (busy.value) return
  busy.value = true; error.value = ''; message.value = ''
  try { await task() } catch (e) { error.value = e.message } finally { busy.value = false }
}
function canLeave() { return !dirty.value || window.confirm('Tiene cambios sin guardar. ¿Desea descartarlos?') }
function setForm(row) {
  selected.value = row
  form.value = JSON.parse(JSON.stringify(row.draft))
  form.value.bodyText = (form.value.paragraphs || []).join('\n\n')
  baseline.value = JSON.stringify(form.value)
  history.value = []
}
function edit(row) { if (canLeave()) setForm(row) }
function changeFilter(kind) { if (canLeave()) { filter.value = kind; selected.value = null; form.value = null; history.value = [] } }
function create() {
  if (!canLeave()) return
  if (filter.value === 'banner' && filtered.value.length) { setForm(filtered.value[0]); return }
  setForm({kind:filter.value,revision:0,draft:{title:'',description:'',image:'',thumbnail:'',date:new Intl.DateTimeFormat('en-CA',{timeZone:'America/Santiago'}).format(new Date()),paragraphs:[],startDate:'',endDate:'',location:'',type:'',notes:'',dateLabel:'',enabled:true,link:''}})
}
async function refresh() { documents.value = await api('/documents') }
function payload() {
  const value = JSON.parse(JSON.stringify(form.value))
  value.paragraphs = value.bodyText.split(/\n\s*\n/).map(x => x.trim()).filter(Boolean)
  delete value.bodyText
  return value
}
async function save() {
  await run(async () => {
    const row = await api(selected.value.id ? `/documents/${selected.value.id}` : '/documents', {
      method:selected.value.id ? 'PUT' : 'POST',body:JSON.stringify({kind:selected.value.kind,revision:selected.value.revision,draft:payload()})
    })
    setForm(row); await refresh(); message.value = 'Borrador guardado. La web conserva la última versión publicada.'
  })
}
async function action(type, targetRevision) {
  if (dirty.value) { error.value = 'Guarde o descarte los cambios antes de continuar.'; return }
  const question = type === 'publish' ? '¿Publicar esta versión en la web?' : type === 'unpublish' ? '¿Retirar esta publicación de la web? El borrador se conservará.' : '¿Recuperar esta versión como borrador? No se publicará automáticamente.'
  if (!window.confirm(question)) return
  await run(async () => {
    const row = await api(`/documents/${selected.value.id}/${type}`,{method:'POST',body:JSON.stringify({revision:selected.value.revision,targetRevision})})
    setForm(row); await refresh(); message.value = type === 'publish' ? 'Publicado en la web.' : type === 'unpublish' ? 'Publicación retirada.' : 'Versión recuperada como borrador.'
  })
}
async function upload(event, field = 'image') {
  const file = event.target.files?.[0]; if (!file) return
  if (file.size > 5_000_000) { error.value = 'La imagen debe pesar menos de 5 MB.'; event.target.value = ''; return }
  await run(async () => {
    const result = await api('/media',{method:'POST',body:file,headers:{'Content-Type':file.type}})
    form.value[field] = result.value
    message.value = 'Imagen privada cargada. Guarde el borrador para conservar la selección.'
  })
  event.target.value = ''
}
async function loadHistory() { await run(async () => { history.value = await api(`/documents/${selected.value.id}/history`) }) }
function beforeUnload(event) { if (dirty.value) { event.preventDefault(); event.returnValue = '' } }
onMounted(() => { window.addEventListener('beforeunload',beforeUnload); run(async () => { me.value = await api('/me'); await refresh() }) })
onBeforeUnmount(() => window.removeEventListener('beforeunload',beforeUnload))
</script>

<template>
  <header class="topbar"><a class="brand" href="https://ipnchile.cl" target="_blank" rel="noopener">IPN <span>Chile</span></a><div><strong>Administración</strong><p>Comunicaciones de nuestra iglesia</p></div><a class="logout" href="/cdn-cgi/access/logout">Cerrar sesión</a></header>
  <main>
    <div v-if="error" role="alert" class="notice error">{{ error }} <a v-if="!me" href="/">Volver a ingresar</a></div>
    <div v-if="message" role="status" class="notice success">{{ message }}</div>
    <p v-if="!me && busy" role="status">Verificando su acceso…</p>
    <template v-if="me">
      <section class="welcome"><div><p class="eyebrow">Panel de contenidos</p><h1>Información que nos conecta</h1><p>Prepare, revise y comparta las novedades de IPN Chile.</p></div><p class="identity">{{ me.email }}<span>{{ me.role === 'admin' ? 'Administrador' : 'Editor · prepara borradores' }}</span></p></section>
      <nav aria-label="Secciones"><button :aria-pressed="section === 'content'" @click="canLeave() && (section = 'content')">Noticias y eventos</button><button :aria-pressed="section === 'directory'" @click="canLeave() && (section = 'directory')">Pastores e iglesias</button></nav>
      <DirectoryPanel v-show="section === 'directory'" :me="me"/>
      <template v-if="section === 'content'">
      <nav aria-label="Tipos de contenido"><button v-for="(label,kind) in labels" :key="kind" :aria-pressed="filter === kind" :disabled="busy" @click="changeFilter(kind)">{{ label }}</button></nav>
      <div class="workspace" :aria-busy="busy">
        <aside class="list"><div class="list-heading"><h2>{{ labels[filter] }}</h2><button class="primary compact" :disabled="busy" @click="create">{{ filter === 'banner' && filtered.length ? 'Editar' : '+ Crear' }}</button></div><p v-if="!filtered.length" class="empty">Todavía no hay contenido en esta sección.</p><button v-for="row in filtered" :key="row.id" class="record" :class="{selected:selected?.id === row.id}" :disabled="busy" @click="edit(row)"><span class="badge">{{ row.published ? 'Publicado' : 'Borrador' }}</span><strong>{{ row.draft.title }}</strong><small>Versión {{ row.revision }} · {{ new Date(row.updated_at).toLocaleDateString('es-CL') }}</small></button></aside>
        <section class="editor">
          <div v-if="!form" class="empty large"><h2>Un espacio para preparar cada publicación</h2><p>Seleccione una entrada o cree una nueva. Los borradores son privados.</p></div>
          <form v-else @submit.prevent="save">
            <div class="editor-heading"><div><p class="eyebrow">{{ labels[selected.kind] }}</p><h2>{{ selected.id ? 'Editar publicación' : 'Nueva publicación' }}</h2></div><span class="badge">{{ dirty ? 'Cambios sin guardar' : 'Borrador guardado' }}</span></div>
            <fieldset :disabled="busy">
              <label>Título<input v-model="form.title" required maxlength="200"></label>
              <label>Descripción breve<textarea v-model="form.description" rows="3" maxlength="2000"></textarea></label>
              <template v-if="selected.kind === 'news'"><label>Fecha<input v-model="form.date" type="date" required></label><label>Texto de la noticia<textarea v-model="form.bodyText" rows="9" placeholder="Separe cada párrafo con una línea en blanco."></textarea></label><label>Enlace a un evento (opcional)<input v-model="form.eventLink" placeholder="/actualidad/eventos?evento=5"></label><details><summary>Fuente del comunicado</summary><label>Nombre de la fuente<input :value="form.source?.label" @input="form.source = {...form.source,label:$event.target.value}"></label><label>Enlace a la fuente<input :value="form.source?.url" @input="form.source = {...form.source,url:$event.target.value}" type="url"></label></details></template>
              <template v-if="selected.kind === 'event'"><div class="pair"><label>Inicio<input v-model="form.startDate" type="date" required></label><label>Término<input v-model="form.endDate" type="date" :min="form.startDate" required></label></div><label>Fecha para mostrar<input v-model="form.dateLabel" maxlength="150" placeholder="25, 26 y 27 de septiembre de 2026"></label><label>Lugar<input v-model="form.location" required maxlength="300"></label><label>Tipo de actividad<input v-model="form.type" maxlength="100"></label><label>Notas adicionales<textarea v-model="form.notes" rows="3" maxlength="4000"></textarea></label></template>
              <template v-if="selected.kind === 'banner'"><label>Enlace del banner<input v-model="form.link" placeholder="/actualidad/eventos"></label><label class="checkbox"><input v-model="form.enabled" type="checkbox">Mostrar banner en la página de inicio</label></template>
              <div class="media-box"><h3>Imagen principal</h3><p>WebP, JPEG o PNG · máximo 5 MB. Se conserva el archivo sin alterar su diseño.</p><label v-if="me.mediaUploads">Cargar imagen<input type="file" accept="image/webp,image/jpeg,image/png" @change="upload($event)"></label><label>O usar una imagen existente de Cloudflare<input v-model="form.image" placeholder="https://media.ipnchile.cl/…"></label><img v-if="form.image" :src="imageUrl(form.image)" :alt="form.title || 'Vista previa de la imagen'" class="preview"></div>
              <details v-if="selected.kind === 'news'"><summary>Miniatura (opcional)</summary><label v-if="me.mediaUploads">Cargar miniatura<input type="file" accept="image/webp,image/jpeg,image/png" @change="upload($event,'thumbnail')"></label><label>Imagen de miniatura<input v-model="form.thumbnail" placeholder="https://media.ipnchile.cl/…"></label><img v-if="form.thumbnail" :src="imageUrl(form.thumbnail)" alt="Miniatura" class="preview small"></details>
              <div class="actions"><button class="primary" type="submit">{{ busy ? 'Guardando…' : 'Guardar borrador' }}</button><button v-if="selected.id && me.role === 'admin'" type="button" :disabled="dirty" @click="action('publish')">Publicar</button><button v-if="selected.published && me.role === 'admin'" type="button" :disabled="dirty" @click="action('unpublish')">Retirar de la web</button><button v-if="selected.id" type="button" @click="loadHistory">Historial</button></div>
            </fieldset>
          </form>
          <section v-if="history.length" class="history"><h3>Historial de versiones</h3><article v-for="version in history" :key="version.revision"><div><strong>Versión {{ version.revision }} · {{ {create:'Creación',save:'Guardado',publish:'Publicación',unpublish:'Retiro',restore:'Recuperación'}[version.action] }}</strong><p>{{ version.actor }} · {{ new Date(version.created_at).toLocaleString('es-CL') }}</p><p>{{ version.snapshot.title }}</p></div><button :disabled="busy || dirty" @click="action('restore',version.revision)">Recuperar borrador</button></article></section>
        </section>
      </div>
      </template>
    </template>
  </main>
  <footer>IPN Chile · Acceso privado para el equipo de comunicaciones</footer>
</template>
