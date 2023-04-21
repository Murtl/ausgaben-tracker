import { createRouter, createWebHistory } from 'vue-router'
import ATDashboard from '@/views/nav/ATDashboard.vue'
import ATTracker from '@/views/nav/ATTracker.vue'
import ATBalance from '@/views/nav/ATBalance.vue'
import ATAccount from '@/views/auth/ATAccount.vue'

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
      component: ATTracker
    },
    {
      path: '/balance',
      name: 'balance',
      component: ATBalance
    },
    {
      path: '/account',
      name: 'account',
      component: ATAccount
    }
  ]
})

export default router
