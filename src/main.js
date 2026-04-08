import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import './style.css'

import { FontAwesomeIcon } from '@/plugins/fontawesome'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')