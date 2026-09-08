import { computed, onMounted, shallowRef } from 'vue'
import initial from '@/data/directory.json'
import { projectChurches, projectAuthorities } from '../utils/directory.js'
const data = shallowRef(initial)
let pending, loadedAt = 0, attemptedAt = 0
const endpoint = import.meta.env.VITE_DIRECTORY_API || 'https://ipn-admin.master-ipnchile.workers.dev/public/directory'
export async function loadDirectory() {
  if (pending) return pending
  if (Date.now() - Math.max(loadedAt,attemptedAt) < 60000) return
  attemptedAt = Date.now()
  pending = (async () => {
    try {
      const response = await fetch(endpoint,{credentials:'omit',signal:AbortSignal.timeout(5000)})
      if (!response.ok) return
      const value = await response.json()
      if (!Array.isArray(value.churches) || !Array.isArray(value.people)) return
      data.value = value
      loadedAt = Date.now()
    } catch { /* Use bundled public directory or last successful version. */ }
    finally { pending = null }
  })()
  return pending
}
export function useDirectory() {
  onMounted(loadDirectory)
  return { churches:computed(() => projectChurches(data.value)), authorities:computed(() => projectAuthorities(data.value)) }
}
