import { defineStore } from 'pinia'
import { ref, inject } from 'vue'
import type { Ref } from 'vue'
import type { ATExpenditure } from '@/utils/types/atExpenditure'
import { getJson } from '@/utils/functions/getJson'
import type { ATJsonConfig } from '@/utils/types/atJsonConfig'

/**
 * @description Store for all expenditures
 */
export const useExpendituresStore = defineStore('expendituresStore', () => {
  const allExpenditures: Ref<ATExpenditure[]> = ref([])
  const config: ATJsonConfig = inject('config') as ATJsonConfig

  /**
   * @description fetches all expenditures from the json file
   * @param userUID userUID of the user
   */
  const fetchExpenditures = async (userUID: string) => {
    const url = config.apiDbRoot.replace('$1', 'expenditures')
    const expendituresJson: Record<string, ATExpenditure[]> = await getJson(url)
    allExpenditures.value = expendituresJson[userUID] ?? []
  }

  /**
   * @description adds an expenditure
   * @param expenditure The expenditure to add
   */
  const addExpenditure = (expenditure: ATExpenditure) => {
    allExpenditures.value.push(expenditure)
  }

  /**
   * @description deletes an expenditure
   * @param id id of the expenditure
   */
  const deleteExpenditure = (id: number) => {
    allExpenditures.value = allExpenditures.value.filter((expenditure) => expenditure.id !== id)
  }

  /**
   * @description updates an expenditure
   * @param expenditure expenditure to update
   */
  const updateExpenditure = (expenditure: ATExpenditure) => {
    allExpenditures.value = allExpenditures.value.map((expenditureInAllExpenditures) => {
      if (expenditureInAllExpenditures.id === expenditure.id) {
        return expenditure
      }
      return expenditureInAllExpenditures
    })
  }

  return {
    allExpenditures,
    fetchExpenditures,
    addExpenditure,
    deleteExpenditure,
    updateExpenditure
  }
})
