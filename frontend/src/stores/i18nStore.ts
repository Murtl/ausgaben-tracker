import { defineStore } from 'pinia'
import { inject } from 'vue'

/**
 * @description store for i18n
 */
export const useI18nStore = defineStore('i18nStore', () => {
  const config: Record<string, string> = (inject('config') as any).i18n

  return { i18n: config }
})
