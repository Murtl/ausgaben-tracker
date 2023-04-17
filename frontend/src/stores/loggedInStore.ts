import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * @description Store for logged in status
 */
export const useLoggedInStore = defineStore('loggedInStore', () => {
  const loggedIn = ref(false)

  return { loggedIn }
})
