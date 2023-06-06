import { defineStore } from 'pinia'
import { inject, reactive } from 'vue'
import { getJson } from '@/utils/functions/getJson'
import { getLanguageCode } from '@/utils/functions/getLanguageCode'
import NavigatorLanguages from 'navigator-languages'
import type { ATJsonConfig } from '@/utils/types/atJsonConfig'

/**
 * @description store for i18n
 */
export const useI18nStore = defineStore('i18nStore', () => {
  const config: ATJsonConfig = inject('config') as ATJsonConfig
  const i18n = reactive(config.i18n)

  /**
   * @description fetches the i18n json file for the current language
   */
  const getI18n = async () => {
    const browserLanguages = new NavigatorLanguages()
    const languageCode = await getLanguageCode(config.languages, browserLanguages)
    const url = config.apiLangRoot.replace('$1', languageCode)
    const newI18n = await getJson(url)
    Object.assign(i18n, newI18n)
    document.getElementsByTagName('html')[0].lang = languageCode
  }

  return { i18n, getI18n }
})
