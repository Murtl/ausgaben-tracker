import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserDataStore = defineStore('userDataStore', () => {
  const userUID = ref('')
  const userMail = ref('')
  const userPassword = ref('')

  return { userUID, userMail, userPassword }
})
