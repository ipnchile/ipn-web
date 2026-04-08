<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import ParticleTrail from '@/components/ui/ParticleTrail.vue'
import AppNavbar from '@/components/ui/AppNavbar.vue'
import AppFooter from '@/components/ui/AppFooter.vue'
import ScrollToTopButton from '@/components/ui/ScrollToTopButton.vue'

const route = useRoute()

const isProximamentePage = computed(() => route.name === 'proximamente')

const currentDepartment = computed(() => {
    const path = route.path.toLowerCase()

    if (path.includes('/departamentos/dorcas')) return 'dorcas'
    if (path.includes('/departamentos/varones')) return 'varones'
    if (path.includes('/departamentos/jumix')) return 'jumix'
    if (path.includes('/departamentos/sumate')) return 'sumate-kids'
    if (path.includes('/departamentos/coro')) return 'coro'
    if (path.includes('/departamentos/rrpp')) return 'rrpp'

    return 'ipn'
})

watchEffect(() => {
    if (isProximamentePage.value || currentDepartment.value === 'ipn') {
        document.body.removeAttribute('data-department')
    } else {
        document.body.setAttribute('data-department', currentDepartment.value)
    }
})
</script>

<template>
    <AppNavbar v-if="!isProximamentePage" />
    <router-view />
    <ParticleTrail v-if="!isProximamentePage" />
    <ScrollToTopButton v-if="!isProximamentePage" />
    <AppFooter v-if="!isProximamentePage" />
</template>