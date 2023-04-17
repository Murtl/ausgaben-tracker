import type { ATLiquidFund } from '../types/atLiquidFund'

/**
 * @description Sorts a list of liquid funds by month and year
 * @param liquidFundsList The list of liquid funds to sort
 * @returns The sorted list of liquid funds
 */
export const sortLiquidFundsByMonthAndYear = (liquidFundsList: ATLiquidFund[]) => {
  return liquidFundsList.sort((a, b) => {
    if (a.year < b.year) {
      return -1
    }
    if (a.year > b.year) {
      return 1
    }
    if (a.month < b.month) {
      return -1
    }
    if (a.month > b.month) {
      return 1
    }
    return 0
  })
}
