import type { ATExpenditure } from '@/utils/types/atExpenditure'
import type { ATExpenditureSorted } from '@/utils/types/atExpenditureSorted'

/**
 * @description Presorts a list of expenditures
 * @param allExpenditures The list of expenditures to presort
 * @returns The presorted list of expenditures
 */
export const presortExpenditures = (allExpenditures: ATExpenditure[]) => {
  const presortedExpenditures: ATExpenditureSorted[] = []
  allExpenditures.forEach((expenditure) => {
    presortedExpenditures.push({
      id: expenditure.id,
      height: expenditure.amount,
      month: parseInt(expenditure.date.substring(3, 5)),
      year: parseInt(expenditure.date.substring(6)),
      sourceOfExpenditure: expenditure.sourceOfExpenditure
    })
  })
  return presortedExpenditures
}
