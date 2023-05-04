import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

/**
 * @description Store for logged in status
 */
export const useLoggedInStore = defineStore('loggedInStore', () => {
  const loggedIn: Ref<boolean> = ref(false)

  return { loggedIn }
})
