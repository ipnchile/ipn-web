<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import ParticleTrail from '@/components/ui/ParticleTrail.vue'
import AppNavbar from '@/components/ui/AppNavbar.vue'
import SeptemberDecor from '@/components/ui/SeptemberDecor.vue'
import AppFooter from '@/components/ui/AppFooter.vue'
import ScrollToTopButton from '@/components/ui/ScrollToTopButton.vue'

import { useDirectory } from '@/composables/useDirectory'
import { usePublishedContent } from '@/composables/usePublishedContent'
import { resolvePageMetadata, updatePageMetadata } from '@/utils/seo'
const route = useRoute()
const { churches } = useDirectory()
const { calendar } = usePublishedContent()
watchEffect(() => {
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
    <ParticleTrail />
    <ScrollToTopButton />
    <AppFooter />
</template>
<style scoped>
.site-header {
    position: sticky;
    top: 0;
    z-index: 1000;
}
</style>
