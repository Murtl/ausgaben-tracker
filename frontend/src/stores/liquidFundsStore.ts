import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * @description Store for all liquid funds
 */
export const useLiquidFundsStore = defineStore('liquidFundsStore', () => {
  const allLiquidFunds = ref([
    {
      id: 0,
      height: 0,
      month: 1,
      year: 0
    }
  ])

  return { allLiquidFunds }
})