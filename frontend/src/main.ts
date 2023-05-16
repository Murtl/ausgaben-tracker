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
  const url = config.apiLangRoot.replace('$1', languageCode)

  config.i18n = await getJson(`/ausgaben-tracker/${url}`)

  app.provide('config', config).use(pinia).use(router).mount('#app')
}

window.addEventListener('load', init)
