<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
const props = defineProps({me:Object})
const records=ref([]), kind=ref('church'), query=ref(''), selected=ref(null), form=ref(null), busy=ref(false), error=ref(''), message=ref(''), baseline=ref('')
const dirty=computed(() => form.value && JSON.stringify(form.value)!==baseline.value)
const people=computed(() => records.value.filter(r=>r.kind==='person'))
const rows=computed(() => records.value.filter(r=>r.kind===kind.value && `${r.draft.nombre} ${r.draft.comuna || ''}`.toLocaleLowerCase('es').includes(query.value.toLocaleLowerCase('es'))))
async function request(path='',method='GET',body) {
  const response=await fetch('/api/directory'+path,{method,credentials:'same-origin',headers:{'Content-Type':'application/json','X-IPN-Request':'admin'},body:body ? JSON.stringify(body) : undefined})
  if (response.redirected || !response.headers.get('Content-Type')?.includes('application/json')) throw new Error('Vuelva a iniciar sesión en el panel.')
  const data=await response.json()
  if (!response.ok) throw new Error(data.error || 'No se pudo completar la operación.')
  return data
}
async function run(fn) { busy.value=true; error.value=''; message.value=''; try { await fn() } catch(e) { error.value=e.message } finally { busy.value=false } }
const canLeave=()=>!dirty.value || window.confirm('¿Descartar los cambios sin guardar?')
function choose(row) {
  if (!canLeave()) return
  selected.value=row
  form.value=JSON.parse(JSON.stringify(row.draft))
  baseline.value=JSON.stringify(form.value)
}
function change(value) { if(canLeave()) {kind.value=value; selected.value=null; form.value=null} }
function create() { choose({kind:kind.value,revision:0,draft:kind.value==='person' ? {nombre:'',foto_url:'',grado:'',email:'',cargos:[]} : {nombre:'',slug:'',foto_url:'',comuna:'',region:'',zona:'',direccion:'',googleMapsName:'',searchAliases:[],horarios:[],lat:null,lng:null,telefono:'',email:'',pastor_id:'',pastora_id:'',redes:{facebook:'',instagram:'',youtube:''}}}) }
async function refresh() {records.value=await request()}
async function save() { await run(async()=>{const row=await request(selected.value.id?'/'+selected.value.id:'',selected.value.id?'PUT':'POST',{kind:selected.value.kind,draft:form.value,revision:selected.value.revision}); baseline.value=JSON.stringify(form.value); choose(row); await refresh(); message.value='Borrador guardado. Publique para mostrar los cambios.'}) }
async function publish(action) {
  if(dirty.value) {error.value='Guarde el borrador antes de publicar.'; return}
  if(!window.confirm(action==='publish'?'¿Publicar este registro?':'¿Retirar este registro de la web?'))return
  await run(async()=>{choose(await request('/'+selected.value.id+'/'+action,'POST',{revision:selected.value.revision})); await refresh(); message.value=action==='publish'?'Registro publicado.':'Registro retirado.'})
}
function unload(e) {if(dirty.value){e.preventDefault();e.returnValue=''}}
onMounted(()=>{window.addEventListener('beforeunload',unload);run(refresh)})
onBeforeUnmount(()=>window.removeEventListener('beforeunload',unload))
</script>
<template>
  <section aria-label="Directorio público">
    <p>Directorio público: incluya únicamente información institucional destinada a la web.</p>
    <div v-if="error" class="notice error" role="alert">{{ error }}</div><div v-if="message" class="notice success" role="status">{{ message }}</div>
    <nav aria-label="Directorio"><button :disabled="busy" :aria-pressed="kind==='church'" @click="change('church')">Iglesias</button><button :disabled="busy" :aria-pressed="kind==='person'" @click="change('person')">Pastores y pastoras</button></nav>
    <div class="workspace" :aria-busy="busy">
      <aside class="list"><div class="list-heading"><h2>{{ kind==='church'?'Iglesias':'Personas' }}</h2><button v-if="props.me.role==='admin'" :disabled="busy" @click="create">+ Crear</button></div><label>Buscar<input v-model="query" type="search"></label>
        <button v-for="row in rows" :key="row.id" class="record" :disabled="busy" @click="choose(row)"><span class="badge">{{ row.published?'Publicado':'Borrador' }}</span><strong>{{ row.draft.nombre }}</strong><small>{{ row.draft.comuna || row.draft.grado }}</small></button>
      </aside>
      <section class="editor"><p v-if="!form">Seleccione un registro para consultar o actualizar sus datos.</p>
        <form v-else @submit.prevent="save"><fieldset :disabled="busy || props.me.role!=='admin'">
          <h2>{{ selected.id?'Editar registro':'Nuevo registro' }}</h2>
          <label>Nombre público<input v-model="form.nombre" required maxlength="200"></label>
          <label>URL pública de la fotografía en R2<input v-model="form.foto_url" type="url" placeholder="https://media.ipnchile.cl/…" maxlength="1000"></label><p>La imagen permanece en R2. Aquí se guarda únicamente el enlace.</p>
          <img v-if="form.foto_url?.startsWith('https://media.ipnchile.cl/')" :src="form.foto_url" class="preview" :alt="form.nombre">
          <template v-if="selected.kind==='church'">
            <label>Identificador del enlace<input v-model="form.slug" :disabled="!!selected.id" pattern="[a-z0-9]+(-[a-z0-9]+)*" required placeholder="ipn-nacimiento"></label>
            <div class="pair"><label>Comuna<input v-model="form.comuna" maxlength="300"></label><label>Región<input v-model="form.region" maxlength="300"></label></div>
            <label>Zona<input v-model="form.zona" maxlength="300"></label><label>Dirección pública<input v-model="form.direccion" maxlength="300"></label>
            <label>Horarios (uno por línea)<textarea :value="form.horarios.join('\n')" @input="form.horarios=$event.target.value.split('\n')" rows="4"></textarea></label>
            <div class="pair"><label>Latitud<input v-model="form.lat" type="number" min="-90" max="90" step="any"></label><label>Longitud<input v-model="form.lng" type="number" min="-180" max="180" step="any"></label></div>
            <label>Pastor<select v-model="form.pastor_id"><option value="">Sin asignar</option><option v-for="p in people" :key="p.id" :value="p.id">{{ p.draft.nombre }}{{ p.published?'':' (borrador)' }}</option></select></label>
            <label>Pastora<select v-model="form.pastora_id"><option value="">Sin asignar</option><option v-for="p in people" :key="p.id" :value="p.id">{{ p.draft.nombre }}{{ p.published?'':' (borrador)' }}</option></select></label>
            <label>Teléfono institucional público<input v-model="form.telefono" maxlength="300"></label>
            <label v-for="network in ['facebook','instagram','youtube']" :key="network">{{ network }}<input v-model="form.redes[network]" type="url"></label>
            <details><summary>Búsqueda en el mapa</summary><label>Nombre en Google Maps<input v-model="form.googleMapsName" maxlength="300"></label><label>Nombres alternativos (uno por línea)<textarea :value="form.searchAliases.join('\n')" @input="form.searchAliases=$event.target.value.split('\n')"></textarea></label></details>
          </template>
          <template v-else><label>Grado o función pastoral<input v-model="form.grado" maxlength="200"></label>
            <h3>Cargos institucionales</h3><div v-for="(cargo,index) in form.cargos" :key="index"><label>Área<select v-model="cargo.area"><option value="directorio">Directorio nacional</option><option value="tribunal">Tribunal de Ética y Disciplina</option></select></label><label>Cargo<input v-model="cargo.cargo" maxlength="200"></label><label>Orden<input v-model.number="cargo.orden" type="number" min="0" max="100"></label><button type="button" @click="form.cargos.splice(index,1)">Quitar cargo del borrador</button></div><button type="button" :disabled="form.cargos.length>=10" @click="form.cargos.push({area:'directorio',cargo:'',orden:form.cargos.length})">Añadir cargo</button>
          </template>
          <label>Correo institucional público<input v-model="form.email" type="email" placeholder="nombre@ipnchile.cl"></label>
          <div class="actions"><button type="submit" class="primary">Guardar borrador</button><button v-if="selected.id" type="button" :disabled="dirty" @click="publish('publish')">Publicar</button><button v-if="selected.published" type="button" :disabled="dirty" @click="publish('unpublish')">Retirar de la web</button></div>
        </fieldset></form>
      </section>
    </div>
  </section>
</template>
