import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { getJson } from './utils/functions/getJson'

const app = createApp(App)
const pinia = createPinia()

const init = async () => {
  app
    .use(pinia)
    .use(router)
    .provide('config', await getJson('/json/config.json'))
    .mount('#app')
}

window.addEventListener('load', init)
