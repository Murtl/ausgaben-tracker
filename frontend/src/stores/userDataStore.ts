import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

/**
 * @description Store for user data
 */
export const useUserDataStore = defineStore('userDataStore', () => {
  const userUID: Ref<string> = ref('')
  const userName: Ref<string> = ref('')

  return { userUID, userName }
})
