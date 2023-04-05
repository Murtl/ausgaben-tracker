import { createRouter, createWebHistory } from 'vue-router'
import ATLogin from '../views/ATLogin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: ATLogin,
    },
  ]
})

export default router
