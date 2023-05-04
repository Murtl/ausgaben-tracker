import { defineStore } from 'pinia'
import { inject, reactive } from 'vue'
import { getJson } from '@/utils/functions/getJson'

/**
 * @description store for i18n
 */
export const useI18nStore = defineStore('i18nStore', () => {
  const config: Record<string, string | undefined> | undefined = inject('config')
  const i18n: Record<string, string> = reactive({})

  /**
   * @description gets the i18n
   */
  const getI18n = async () => {
    const i18nJson = await getJson(`/ausgaben-tracker/json/i18n_${config?.defaultLanguage}.json`)
    Object.assign(i18n, i18nJson)
  }

  return { i18n, getI18n }
})
