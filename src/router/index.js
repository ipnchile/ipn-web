import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes.js'


const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        // News waits for published content before scrolling to and focusing its card.
        if (to.path === '/actualidad/noticias' && to.hash.startsWith('#noticia-')) return false
        return { top: 0 }
    }
})


export default router
