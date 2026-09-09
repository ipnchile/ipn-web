import { computed, onMounted, shallowRef } from 'vue'
import { comunicados as initialNews } from '@/data/comunicados'
import { calendar as initialCalendar, monthOrder } from '@/data/events'
const content = shallowRef(null)
let inFlight = null
let lastLoaded = 0
const endpoint = import.meta.env.VITE_CONTENT_API || ''
export async function loadPublishedContent() {
  if (!endpoint) return
  if (inFlight) return inFlight
  if (content.value && Date.now() - lastLoaded < 60000) return
  inFlight = (async () => {
    try {
      const response = await fetch(endpoint,{credentials:'omit',signal:AbortSignal.timeout(5000)})
      if (!response.ok) throw new Error('Content unavailable')
      const value = await response.json()
      if (!Array.isArray(value.news) || !Array.isArray(value.events) || !('banner' in value)) throw new Error('Invalid content')
      content.value = value
      lastLoaded = Date.now()
    } catch { /* Preserve the last successful content, or the bundled initial content. */ }
    finally { inFlight = null }
  })()
  return inFlight
}
export function usePublishedContent() {
  onMounted(loadPublishedContent)
  return {
    loaded: computed(() => content.value !== null),
    news: computed(() => content.value ? [...content.value.news].sort((a,b) => b.date.localeCompare(a.date)) : initialNews),
    calendar: computed(() => content.value ? monthOrder.map(month => ({month,events:content.value.events.filter(e => e.month === month).sort((a,b) => a.startDate.localeCompare(b.startDate))})) : initialCalendar),
    banner: computed(() => content.value?.banner || null)
  }
}
