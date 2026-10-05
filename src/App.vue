<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import ConferenceVideo from '@/components/ui/ConferenceVideo.vue'
import ParticleTrail from '@/components/ui/ParticleTrail.vue'
import AppNavbar from '@/components/ui/AppNavbar.vue'
import SeptemberDecor from '@/components/ui/SeptemberDecor.vue'
import AppFooter from '@/components/ui/AppFooter.vue'
import ScrollToTopButton from '@/components/ui/ScrollToTopButton.vue'

import { useDirectory, loadDirectory } from '@/composables/useDirectory'
import { usePublishedContent, loadPublishedContent } from '@/composables/usePublishedContent'
import { resolvePageMetadata, updatePageMetadata } from '@/utils/seo'
import { syncSiteIdentity } from '@/utils/structuredData'
const route = useRoute()
const { churches, error: directoryError } = useDirectory()
const { calendar, error: contentError } = usePublishedContent()
const reloadData = () => { loadDirectory(true); loadPublishedContent() }
watchEffect(() => {
    syncSiteIdentity(route.name === 'home')
    updatePageMetadata(resolvePageMetadata(route, { churches: churches.value, events: calendar.value.flatMap(month => month.events) }))
})

const currentDepartment = computed(() => {
    const path = route.path.toLowerCase()

    if (path.includes('/departamentos/dorcas')) return 'dorcas'
    if (path.includes('/departamentos/varones')) return 'varones'
    if (path.includes('/departamentos/jumix')) return 'jumix'
    if (path.includes('/departamentos/rrpp')) return 'rrpp'

    return 'ipn'
})

watchEffect(() => {
    if (currentDepartment.value === 'ipn') {
        document.body.removeAttribute('data-department')
    } else {
        document.body.setAttribute('data-department', currentDepartment.value)
    }
})
</script>

<template>
    <div class="site-header">
        <AppNavbar />
        <SeptemberDecor />
    </div>
    <router-view />
    <p v-if="contentError || directoryError" class="database-notice" role="alert">{{ contentError || directoryError }} <button type="button" @click="reloadData">Reintentar</button></p>
    <ParticleTrail />
    <ScrollToTopButton />
    <AppFooter />
    <ConferenceVideo />
</template>
<style scoped>
.site-header {
    position: sticky;
    top: 0;
    z-index: 1000;
}
.database-notice { position: fixed; bottom: 1rem; left: 1rem; right: 1rem; z-index: 1100; padding: .8rem; background: #243744; color: white; border-radius: .5rem; text-align: center; }
</style>
