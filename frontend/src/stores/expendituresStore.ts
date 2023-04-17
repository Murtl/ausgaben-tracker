import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * @description Store for all expenditures
 */
export const useExpendituresStore = defineStore('expendituresStore', () => {
  const allExpenditures = ref([
    {
      id: 0,
      sourceOfExpenditure: '',
      additionalInfo: '',
      amount: 0,
      date: ''
    }
  ])

  return { allExpenditures }
})
