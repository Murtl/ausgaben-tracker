import type { ATExpenditure } from '../types/atExpenditure'

/**
 * @description Filters a list of expenditures
 * @param expendituresList The list of expenditures to filter
 * @param filter The filter to use
 * @returns The filtered list of expenditures
 */
export const filterExpenditures = (expendituresList: ATExpenditure[], filter: string) => {
  return expendituresList.filter((expenditure) => {
    return (
      expenditure.sourceOfExpenditure.toLowerCase().includes(filter.toLowerCase()) ||
      expenditure.additionalInfo.toLowerCase().includes(filter.toLowerCase()) ||
      expenditure.date.toLowerCase().includes(filter.toLowerCase())
    )
  })
}
