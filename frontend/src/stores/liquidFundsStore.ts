import { ATLiquidFundsDataService } from '@/services/ATLiquidFundsDataService'
import type { ATLiquidFund } from '@/utils/types/atLiquidFund'
import { useUserDataStore } from '@/stores/userDataStore'
import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * @description Store for all liquid funds
 */
export const useLiquidFundsStore = defineStore('liquidFundsStore', () => {
  const userDataStore = useUserDataStore()
  const allLiquidFunds = ref(ATLiquidFundsDataService.getLiquidFunds(userDataStore.userUID))

  /**
   * @description calls the ATLiquidFundsDataService to add a liquid fund and updates allLiquidFunds
   * @param liquidFund The liquid fund to add
   */
  const addLiquidFund = (liquidFund: ATLiquidFund) => {
    ATLiquidFundsDataService.addLiquidFund(liquidFund, userDataStore.userUID)
    liquidFundsJsonChanged()
  }

  /**
   * @description calls the ATLiquidFundsDataService to delete a liquid fund and updates allLiquidFunds
   * @param id id of the liquid fund
   */
  const deleteLiquidFund = (id: number) => {
    ATLiquidFundsDataService.deleteLiquidFund(id, userDataStore.userUID)
    liquidFundsJsonChanged()
  }

  /**
   * @description calls the ATLiquidFundsDataService to update a liquid fund and updates allLiquidFunds
   * @param liquidFund liquid fund to update
   */
  const updateLiquidFund = (liquidFund: ATLiquidFund) => {
    ATLiquidFundsDataService.updateLiquidFund(liquidFund, userDataStore.userUID)
    liquidFundsJsonChanged()
  }

  /**
   * @description Updates allLiquidFunds
   */
  const liquidFundsJsonChanged = () => {
    allLiquidFunds.value = ATLiquidFundsDataService.getLiquidFunds(userDataStore.userUID)
  }

  return { allLiquidFunds, addLiquidFund, deleteLiquidFund, updateLiquidFund }
})
