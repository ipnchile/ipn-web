import { computed, onMounted, shallowRef } from 'vue'
import { projectChurches, projectAuthorities } from '../utils/directory.js'
const data = shallowRef({churches:[],people:[]})
const loading = shallowRef(true), error = shallowRef('')
let pending, loadedAt = 0, attemptedAt = 0
const endpoint = import.meta.env.VITE_DIRECTORY_API || '/public/directory'
export async function loadDirectory(force = false) {
  if (!endpoint) return
  if (pending) return pending
  if (!force && Date.now() - Math.max(loadedAt,attemptedAt) < 60000) return
  attemptedAt = Date.now()
  pending = (async () => {
    try {
      const response = await fetch(endpoint,{credentials:'omit',signal:AbortSignal.timeout(5000)})
      if (!response.ok) throw new Error('No se pudo consultar el directorio.')
      const value = await response.json()
      if (!Array.isArray(value.churches) || !Array.isArray(value.people)) throw new Error('Respuesta de directorio inválida.')
      error.value = ''
      data.value = value
      loadedAt = Date.now()
    } catch(e) { error.value = e.message }
    finally { pending = null; loading.value = false }
  })()
  return pending
}
export function useDirectory() {
  onMounted(loadDirectory)
  return { loading, error, churches:computed(() => projectChurches(data.value)), authorities:computed(() => projectAuthorities(data.value)) }
}
