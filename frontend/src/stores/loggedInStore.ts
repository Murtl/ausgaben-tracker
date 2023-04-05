import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoggedInStore = defineStore('loggedInStore', () => {
  const loggedIn = ref(false)

  return { loggedIn }
})
