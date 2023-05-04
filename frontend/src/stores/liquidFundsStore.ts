import type { ATLiquidFund } from '@/utils/types/atLiquidFund'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

/**
 * @description Store for all liquid funds
 */
export const useLiquidFundsStore = defineStore('liquidFundsStore', () => {
  const allLiquidFunds: Ref<ATLiquidFund[]> = ref([])

  /**
   * @description adds a liquid fund
   * @param liquidFund The liquid fund to add
   */
  const addLiquidFund = (liquidFund: ATLiquidFund) => {
    allLiquidFunds.value.push(liquidFund)
  }

  /**
   * @description deletes a liquid fund
   * @param id id of the liquid fund
   */
  const deleteLiquidFund = (id: number) => {
    allLiquidFunds.value = allLiquidFunds.value.filter((liquidFund) => liquidFund.id !== id)
  }

  /**
   * @description updates a liquid fund
   * @param liquidFund liquid fund to update
   */
  const updateLiquidFund = (liquidFund: ATLiquidFund) => {
    allLiquidFunds.value = allLiquidFunds.value.map((liquidFundInAllLiquidFunds) => {
      if (liquidFundInAllLiquidFunds.id === liquidFund.id) {
        return liquidFund
      }
      return liquidFundInAllLiquidFunds
    })
  }

  return { allLiquidFunds, addLiquidFund, deleteLiquidFund, updateLiquidFund }
})
