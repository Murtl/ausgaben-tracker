import { createRouter, createWebHistory } from 'vue-router'
import ATDashboard from '@/views/nav/ATDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: ATDashboard
    },
    {
      path: '/tracker',
      name: 'tracker',
      component: () => import('@/views/nav/ATTracker.vue')
    },
    {
      path: '/balance',
      name: 'balance',
      component: () => import('@/views/nav/ATBalance.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/auth/ATAccount.vue')
    },
    { path: '/:pathMatch(.*)', component: () => import('@/views/nav/ATError404.vue') }
  ]
})

export default router
