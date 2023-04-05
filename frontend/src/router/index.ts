import { createRouter, createWebHistory } from 'vue-router'
import ATHome from '../views/ATHome.vue'
import ATDashboard from '../views/ATDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ATHome,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: ATDashboard,
    },
  ]
})

export default router
