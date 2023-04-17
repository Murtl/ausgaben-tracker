import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * @description Store for user data
 */
export const useUserDataStore = defineStore('userDataStore', () => {
  const userUID = ref('')
  const userMail = ref('')
  const userPassword = ref('')

  return { userUID, userMail, userPassword }
})
