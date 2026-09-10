import { computed, onMounted, onBeforeUnmount, shallowRef } from 'vue'
import { comunicados as initialNews } from '@/data/comunicados'
import { calendar as initialCalendar, monthOrder } from '@/data/events'
import { missionVideos as initialVideos } from '@/data/videos'
import { youtubeId } from '@/utils/conferenceVideo'
import { defaultConferenceVideo } from '@/utils/conferenceVideo'
const settled = shallowRef(false)
const content = shallowRef(null)
let inFlight = null
let lastLoaded = 0
const endpoint = import.meta.env.VITE_CONTENT_API || '/public/content'
export async function loadPublishedContent() {
  if (!endpoint) { settled.value = true; return }
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
    finally { settled.value = true; inFlight = null }
  })()
  return inFlight
}
export function usePublishedContent() {
  let timer
  const refresh = () => { if (!document.hidden) loadPublishedContent() }
  onMounted(() => {
    loadPublishedContent()
    timer = setInterval(refresh, 60000)
    document.addEventListener('visibilitychange', refresh)
  })
  onBeforeUnmount(() => { clearInterval(timer); document.removeEventListener('visibilitychange', refresh) })
  return {
    settled,
    videos: computed(() => {
      if (!Array.isArray(content.value?.videos)) return initialVideos
      return [...content.value.videos].sort((a,b) => (a.order ?? 0) - (b.order ?? 0) || a.id.localeCompare(b.id)).map(item => {
        const id = youtubeId(item.videoUrl)
        return id ? {...item, summary:item.description, url:'https://www.youtube.com/watch?v='+id, embedUrl:'https://www.youtube-nocookie.com/embed/'+id+'?playsinline=1&rel=0&hl=es'} : null
      }).filter(Boolean)
    }),
    conferenceVideo: computed(() => content.value ? (content.value.banner ? content.value.banner.conferenceVideo ?? defaultConferenceVideo : null) : defaultConferenceVideo),
    loaded: computed(() => content.value !== null),
    news: computed(() => content.value ? [...content.value.news].sort((a,b) => b.date.localeCompare(a.date)) : initialNews),
    calendar: computed(() => content.value ? monthOrder.map(month => ({month,events:content.value.events.filter(e => e.month === month).sort((a,b) => a.startDate.localeCompare(b.startDate))})) : initialCalendar),
    banner: computed(() => content.value?.banner || null)
  }
}
