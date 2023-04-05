import { createRouter, createWebHistory } from 'vue-router'
import ATLogin from '../views/ATLogin.vue'
import ATRegister from '../views/ATRegister.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: ATLogin,
    },
    {
      path: '/register',
      name: 'register',
      component: ATRegister,
    },
  ]
})

export default router
