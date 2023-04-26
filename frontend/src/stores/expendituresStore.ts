import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useUserDataStore } from '@/stores/userDataStore'
import { ATExpendituresDataService } from '@/services/ATExpendituresDataService'
import type { ATExpenditure } from '@/utils/types/atExpenditure'

/**
 * @description Store for all expenditures
 */
export const useExpendituresStore = defineStore('expendituresStore', () => {
  const userDataStore = useUserDataStore()
  const allExpenditures: Ref<ATExpenditure[]> = ref([])

  /**
   * @description Initializes allExpenditures
   */
  const initExpenditures = () => {
    allExpenditures.value = ATExpendituresDataService.getExpenditures(userDataStore.userUID)
  }

  /**
   * @description calls the ATExpendituresDataService to add an expenditure and updates allExpenditures
   * @param expenditure The expenditure to add
   */
  const addExpenditure = (expenditure: ATExpenditure) => {
    ATExpendituresDataService.addExpenditure(expenditure, userDataStore.userUID)
    expendituresJsonFileChanged()
  }

  /**
   * @description calls the ATExpendituresDataService to delete an expenditure and updates allExpenditures
   * @param id id of the expenditure
   */
  const deleteExpenditure = (id: number) => {
    ATExpendituresDataService.deleteExpenditure(id, userDataStore.userUID)
    expendituresJsonFileChanged()
  }

  /**
   * @description calls the ATExpendituresDataService to update an expenditure and updates allExpenditures
   * @param expenditure expenditure to update
   */
  const updateExpenditure = (expenditure: ATExpenditure) => {
    ATExpendituresDataService.updateExpenditure(expenditure, userDataStore.userUID)
    expendituresJsonFileChanged()
  }

  /**
   * @description Updates allExpenditures
   */
  const expendituresJsonFileChanged = () => {
    allExpenditures.value = ATExpendituresDataService.getExpenditures(userDataStore.userUID)
  }

  return { allExpenditures, initExpenditures, addExpenditure, deleteExpenditure, updateExpenditure }
})
