import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * @description Store for user data
 */
export const useUserDataStore = defineStore('userDataStore', () => {
  const userUID = ref('')
  const userName = ref('')

  return { userUID, userName }
})
