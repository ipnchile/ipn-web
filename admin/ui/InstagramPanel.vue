<script setup>
import { onMounted, ref } from 'vue'
const state = ref(null), busy = ref(false), error = ref(''), message = ref('')
async function api(method = 'GET', suffix = '', body) {
  const response = await fetch('/api/instagram' + suffix, { method, credentials: 'same-origin',
    headers: { 'X-IPN-Request': 'admin', 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined })
  if (response.redirected || !response.headers.get('Content-Type')?.includes('application/json')) throw new Error('Vuelva a iniciar sesión en el mantenedor.')
  const value = await response.json()
  if (!response.ok) throw new Error(value.error || 'No se pudo consultar Instagram.')
  return value
}
async function refresh() { state.value = await api() }
async function run(task) {
  busy.value = true; error.value = ''; message.value = ''
  try { await task() } catch (e) { error.value = e.message } finally { busy.value = false }
}
async function sync() {
  await run(async () => {
    const result = await api('POST', '/sync')
    await refresh(); message.value = `${result.count} publicaciones actualizadas.`
  })
}
async function toggle() {
  await run(async () => {
    await api('PUT', '', { enabled: !state.value.enabled }); await refresh()
    message.value = state.value.enabled ? 'Las publicaciones de Instagram ya se muestran en la web.' : 'La galería automática quedó oculta.'
  })
}
onMounted(() => run(refresh))
</script>
<template>
  <section class="media-box instagram-panel" aria-labelledby="instagram-panel-title" :aria-busy="busy">
    <h2 id="instagram-panel-title">Instagram automático</h2>
    <p>Últimas 12 publicaciones de @ipnchilecuentaoficial · actualización cada hora. Los reels abren en Instagram y los carruseles muestran su portada.</p>
    <p v-if="error" role="alert">{{ error }}</p><p v-if="message" role="status">{{ message }}</p>
    <template v-if="state">
      <p v-if="!state.configured">La conexión todavía no está configurada en el servidor. El token se guarda como secreto en Cloudflare.</p>
      <template v-else>
        <p><strong>{{ state.enabled ? 'Visible en la web' : 'Oculto en la web' }}</strong> · {{ state.count }} publicaciones sincronizadas.</p>
        <p v-if="state.syncedAt">Última actualización: {{ new Date(state.syncedAt).toLocaleString('es-CL') }}</p>
        <p v-if="state.error" role="alert">{{ state.error }}</p>
        <div class="actions"><button :disabled="busy" @click="sync">Actualizar ahora</button><button :disabled="busy || (!state.enabled && (!state.syncedAt || !!state.error))" @click="toggle">{{ state.enabled ? 'Ocultar galería automática' : 'Activar galería automática' }}</button></div>
        <p>Las noticias manuales se conservan. Si un enlace ya está publicado manualmente, se muestra esa versión. Si la conexión falla durante más de 48 horas, se ocultan las publicaciones automáticas hasta recuperar el acceso.</p>
      </template>
    </template>
  </section>
</template>
<style scoped>
.instagram-panel { margin-bottom: 1.5rem; padding: 1.5rem; background: white; border: 1px solid #dbe3ec; border-radius: 12px; }
.instagram-panel h2 { margin-top: 0; }
</style>
