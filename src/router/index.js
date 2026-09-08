import { createRouter, createWebHistory } from 'vue-router'
import { updatePageMetadata } from '@/utils/seo'

const routes = [
    // --- SECCIÓN INSTITUCIONAL ---
    {
        path: '/',
        name: 'home',
        meta: {"title":"Inicio","description":"Conozca la Iglesia Pentecostal Nazareth en Chile, sus iglesias, departamentos y actividades."},
        component: () => import('../views/HomeView.vue'),
    },
    {
        path: '/quienes-somos',
        name: 'quienes-somos',
        meta: {"title":"Quiénes somos","description":"Historia e identidad de la Iglesia Pentecostal Nazareth en Chile."},
        component: () => import('../views/institucional/QuienesSomosView.vue'),
    },
    {
        path: '/quienes-somos/imagen-corporativa',
        name: 'imagen-corporativa',
        meta: {"title":"Imagen corporativa","description":"Conozca la identidad visual y los elementos de la imagen corporativa de IPN Chile."},
        component: () => import('../views/institucional/ImagenCorporativaView.vue'),
    },
    {
        path: '/quienes-somos/organizacion',
        name: 'organizacion-ipn',
        meta: {"title":"Organización","description":"Conozca la organización institucional de la Iglesia Pentecostal Nazareth."},
        component: () => import('../views/institucional/OrganizacionView.vue'),
    },
    {
        path: '/quienes-somos/gobierno',
        name: 'gobierno-ipn',
        meta: {"title":"Gobierno eclesiástico","description":"Conozca el gobierno y las autoridades de la Iglesia Pentecostal Nazareth."},
        component: () => import('../views/institucional/GobiernoView.vue'),
    },
    {
        path: '/quienes-somos/fe',
        name: 'lo-que-creemos',
        meta: {"title":"Lo que creemos","description":"Principios de fe y creencias de la Iglesia Pentecostal Nazareth."},
        component: () => import('../views/institucional/FeView.vue'),
    },
    {
        path: '/sem',
        name: 'sem',
        meta: {"title":"Seminario Eclesiástico Mayor","description":"Información del Seminario Eclesiástico Mayor de IPN Chile."},
        component: () => import('../views/institucional/SemView.vue'),
    },

    // --- DEPARTAMENTOS ---
    {
        path: '/departamentos/dorcas',
        name: 'dorcas',
        meta: {"title":"Dorcas","description":"Conozca el departamento Dorcas, su directorio y actividades."},
        component: () => import('../views/departamentos/DorcasView.vue'),
    },
    {
        path: '/departamentos/varones',
        name: 'varones',
        meta: {"title":"Varones","description":"Conozca el departamento de Varones, su directorio y actividades."},
        component: () => import('../views/departamentos/VaronesView.vue'),
    },
    {
        path: '/departamentos/jumix',
        name: 'jumix',
        meta: {"title":"JUMIX","description":"Conozca el departamento de jóvenes JUMIX, su equipo y actividades."},
        component: () => import('../views/departamentos/JumixView.vue'),
    },
    {
        path: '/departamentos/rrpp',
        name: 'rrpp',
        meta: {"title":"Comunicaciones y Protocolo","description":"Conozca el departamento de Comunicaciones y Protocolo de IPN Chile."},
        component: () => import('../views/departamentos/ComunicacionesProtocoloView.vue'),
    },

    // --- ACTUALIDAD ---
    {
        path: '/actualidad/noticias',
        name: 'noticias',
        meta: {"title":"Noticias","description":"Noticias y comunicaciones de la Iglesia Pentecostal Nazareth en Chile."},
        component: () => import('../views/actualidad/NoticiasView.vue'),
    },
    {
        path: '/actualidad/eventos',
        name: 'eventos',
        meta: {"title":"Eventos","description":"Calendario de actividades, encuentros y eventos nacionales de IPN Chile."},
        component: () => import('../views/actualidad/EventosView.vue'),
    },

    // --- ACCIÓN Y CONTACTO ---
    {
        path: '/sumate',
        name: 'sumate',
        meta: {"title":"Súmate","description":"Información sobre futuras convocatorias de servicio y colaboración en IPN Chile."},
        component: () => import('../views/SumateView.vue'),
    },
    {
        path: '/donaciones',
        name: 'donaciones',
        meta: {"title":"Donaciones","description":"Información y datos de contacto para realizar aportes a IPN Chile."},
        component: () => import('../views/accion/DonacionesView.vue'),
    },
    {
        path: '/contacto',
        name: 'contacto',
        meta: {"title":"Contacto","description":"Contacte a IPN Chile para consultas generales o peticiones de oración."},
        component: () => import('../views/accion/ContactoView.vue'),
    },
    {
        path: '/iglesias',
        name: 'iglesias',
        meta: {"title":"Nuestras iglesias","description":"Encuentre iglesias de la Iglesia Pentecostal Nazareth en Chile y consulte su ubicación."},
        component: () => import('../views/institucional/IglesiasView.vue')
    },
    {
        path: '/iglesias/:slug',
        name: 'iglesiaDetalle',
        meta: {"title":"Información de la iglesia","description":"Ubicación, contacto e información pastoral de una iglesia de IPN Chile."},
        component: () => import('../views/institucional/IglesiaDetalleView.vue'),
        props: true
    },
    {
        path: '/privacidad',
        name: 'privacidad',
        meta: {"title":"Privacidad","description":"Información sobre los datos enviados mediante los formularios de IPN Chile."},
        component: () => import('../views/PrivacidadView.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        meta: {"title":"Página no encontrada","description":"La página solicitada no está disponible. Explore las secciones de IPN Chile.","noindex":true},
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

router.afterEach((to, from, failure) => {
    if (!failure) updatePageMetadata(to.meta)
})

export default router