import './assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
 
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createBootstrap } from 'bootstrap-vue-next'

const app = createApp(App)
const bootstrap = createBootstrap()
app.use(createPinia())
app.use(router)
app.use(bootstrap)
app.mount('#app')
