import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { getJson } from '@/utils/functions/getJson'
import { getLanguageCode } from '@/utils/functions/getLanguageCode'
import NavigatorLanguages from 'navigator-languages'
import type { ATJsonConfig } from './utils/types/atJsonConfig'

const app = createApp(App)
const pinia = createPinia()

const init = async () => {
  const config: ATJsonConfig = await getJson('/ausgaben-tracker/json/config.json')
  const browserLanguages = new NavigatorLanguages()
  const languageCode = await getLanguageCode(config.languages, browserLanguages)
  const url = config.apiLangRoot.replace('$1', languageCode)

  config.i18n = await getJson(url)
  document.getElementsByTagName('html')[0].lang = languageCode

  app.provide<ATJsonConfig>('config', config).use(pinia).use(router).mount('#app')
}

window.addEventListener('load', init)
