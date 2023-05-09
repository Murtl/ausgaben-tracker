import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { getJson } from '@/utils/functions/getJson'
import { getLanguageCode } from '@/utils/functions/getLanguageCode'

const app = createApp(App)
const pinia = createPinia()

const init = async () => {
  const config = await getJson('/ausgaben-tracker/json/config.json')
  const languageCode = await getLanguageCode(config.languages, window.navigator.language)

  config.i18n = await getJson(`/ausgaben-tracker/json/i18n_${languageCode}.json`)

  app.provide('config', config).use(pinia).use(router).mount('#app')
}

window.addEventListener('load', init)
