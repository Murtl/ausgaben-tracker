import type { ATExpenditureSorted } from '../types/atExpenditureSorted'

/**
 * @description Gets all available years of expenditures
 * @param presortedExpenditures The expenditures to get the years from
 * @returns The available years of expenditures
 */
export const getAvailableYearsOfExpenditures = (presortedExpenditures: ATExpenditureSorted[]) => {
  const years: number[] = []
  presortedExpenditures.forEach((expenditure) => {
    if (!years.includes(expenditure.year)) {
      years.push(expenditure.year)
    }
  })
  return years
}
