import { computed } from 'vue'
import { usePublishedContent } from './usePublishedContent.js'
export function useSiteData(key, empty = []) {
  const { siteData } = usePublishedContent()
  return computed(() => siteData.value[key] ?? empty)
}
