import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    // --- SECCIÓN INSTITUCIONAL ---
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
    },
    // {
    //     path: '/',
    //     name: 'proximamente',
    //     component: () => import('../views/ProximamenteView.vue'),
    // },
    {
        path: '/quienes-somos',
        name: 'quienes-somos',
        component: () => import('../views/institucional/QuienesSomosView.vue'),
    },
    {
        path: '/quienes-somos/gobierno',
        name: 'gobierno-ipn',
        component: () => import('../views/institucional/GobiernoView.vue'),
    },
    {
        path: '/quienes-somos/fe',
        name: 'lo-que-creemos',
        component: () => import('../views/institucional/FeView.vue'),
    },

    // --- DEPARTAMENTOS ---
    {
        path: '/departamentos/dorcas',
        name: 'dorcas',
        component: () => import('../views/departamentos/DorcasView.vue'),
    },
    {
        path: '/departamentos/varones',
        name: 'varones',
        component: () => import('../views/departamentos/VaronesView.vue'),
    },
    {
        path: '/departamentos/jumix',
        name: 'jumix',
        component: () => import('../views/departamentos/JumixView.vue'),
    },

    // --- ACTUALIDAD ---
    {
        path: '/actualidad/noticias',
        name: 'noticias',
        component: () => import('../views/actualidad/NoticiasView.vue'),
    },
    {
        path: '/actualidad/eventos',
        name: 'eventos',
        component: () => import('../views/actualidad/EventosView.vue'),
    },

    // --- ACCIÓN Y CONTACTO ---
    {
        path: '/sumate',
        name: 'sumate',
        component: () => import('../views/SumateView.vue'),
    },
    {
        path: '/donaciones',
        name: 'donaciones',
        component: () => import('../views/accion/DonacionesView.vue'),
    },
    {
        path: '/contacto',
        name: 'contacto',
        component: () => import('../views/accion/ContactoView.vue'),
    },
    {
        path: '/iglesias',
        name: 'iglesias',
        component: () => import('../views/institucional/IglesiasView.vue')
    },
    {
        path: '/iglesias/:slug',
        name: 'iglesiaDetalle',
        component: () => import('../views/institucional/IglesiaDetalleView.vue'),
        props: true
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('../views/NotFoundView.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})

export default router