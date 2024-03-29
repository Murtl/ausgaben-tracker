import type { ATLiquidFund } from '@/utils/types/atLiquidFund'
import { defineStore } from 'pinia'
import { ref, type Ref, inject } from 'vue'
import { getJson } from '@/utils/functions/getJson'
import type { ATJsonConfig } from '@/utils/types/atJsonConfig'

/**
 * @description Store for all liquid funds
 */
export const useLiquidFundsStore = defineStore('liquidFundsStore', () => {
  const allLiquidFunds: Ref<ATLiquidFund[]> = ref([])
  const config: ATJsonConfig = inject('config') as ATJsonConfig

  /**
   * @description fetches all liquid funds from the json file
   * @param userUID userUID of the user
   */
  const fetchLiquidFunds = async (userUID: string) => {
    const url = config.apiDbRoot.replace('$1', 'liquidFunds')
    const liquidFundsJson: Record<string, ATLiquidFund[]> = await getJson(url)
    allLiquidFunds.value = liquidFundsJson[userUID] ?? []
  }

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
    let duplicateThere = false
    allLiquidFunds.value = allLiquidFunds.value.map((liquidFundInAllLiquidFunds) => {
      if (
        liquidFund.month === liquidFundInAllLiquidFunds.month &&
        liquidFund.year === liquidFundInAllLiquidFunds.year &&
        liquidFundInAllLiquidFunds.id !== liquidFund.id
      ) {
        liquidFundInAllLiquidFunds.height += liquidFund.height
        duplicateThere = true
      }
      if (liquidFundInAllLiquidFunds.id === liquidFund.id) {
        return liquidFund
      }
      return liquidFundInAllLiquidFunds
    })
    if (duplicateThere) {
      allLiquidFunds.value = allLiquidFunds.value.filter(
        (liquidFundToFilter) => liquidFundToFilter.id !== liquidFund.id
      )
    }
  }

  return { allLiquidFunds, fetchLiquidFunds, addLiquidFund, deleteLiquidFund, updateLiquidFund }
})
