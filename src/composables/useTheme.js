import { computed } from 'vue'
import { useRoute } from 'vue-router'

const themes = {
    ipn: {
        primary: '#1e3957',
        secondary: '#cba45e',
        accent: '#cdcdc5',
        bg: '#0e1e2e',
        surface: '#13263a',
        text: '#ffffff',
        textSoft: '#cdcdc5',
    },
    dorcas: {
        primary: '#91766d',
        secondary: '#c59d9b',
        accent: '#f6ece3',
        bg: '#2b2220',
        surface: '#3b302d',
        text: '#ffffff',
        textSoft: '#f6ece3',
    },
    varones: {
        primary: '#19314b',
        secondary: '#efce95',
        accent: '#d3d3d3',
        bg: '#0f1d2c',
        surface: '#16283b',
        text: '#ffffff',
        textSoft: '#d3d3d3',
    },
    jumix: {
        primary: '#821f22',
        secondary: '#c83130',
        accent: '#f5f2df',
        bg: '#2b1214',
        surface: '#3a181b',
        text: '#ffffff',
        textSoft: '#f5f2df',
    },
    sumate: {
        primary: '#3071e9',
        secondary: '#eb4d28',
        accent: '#26b194',
        bg: '#10213f',
        surface: '#18305e',
        text: '#ffffff',
        textSoft: '#f0f4ff',
    },
    coro: {
        primary: '#1c2632',
        secondary: '#e79d3e',
        accent: '#e4c68a',
        bg: '#111820',
        surface: '#1a2430',
        text: '#ffffff',
        textSoft: '#e4c68a',
    },
    rrpp: {
        primary: '#151316',
        secondary: '#c6a465',
        accent: '#dbc8a7',
        bg: '#100f12',
        surface: '#1b191d',
        text: '#ffffff',
        textSoft: '#dbc8a7',
    },
}

function applyTheme(theme) {
    const root = document.documentElement

    root.style.setProperty('--theme-primary', theme.primary)
    root.style.setProperty('--theme-secondary', theme.secondary)
    root.style.setProperty('--theme-accent', theme.accent)
    root.style.setProperty('--theme-bg', theme.bg)
    root.style.setProperty('--theme-surface', theme.surface)
    root.style.setProperty('--theme-text', theme.text)
    root.style.setProperty('--theme-text-soft', theme.textSoft)
}

export function useTheme() {
    const route = useRoute()

    const currentThemeName = computed(() => {
        const path = route.path.toLowerCase()

        if (path.includes('/departamentos/dorcas')) return 'dorcas'
        if (path.includes('/departamentos/varones')) return 'varones'
        if (path.includes('/departamentos/jumix')) return 'jumix'
        if (path.includes('/departamentos/sumate')) return 'sumate'
        if (path.includes('/departamentos/coro')) return 'coro'
        if (path.includes('/departamentos/rrpp')) return 'rrpp'

        return 'ipn'
    })

    const currentTheme = computed(() => themes[currentThemeName.value] || themes.ipn)

    return {
        currentThemeName,
        currentTheme,
        applyTheme,
    }
}