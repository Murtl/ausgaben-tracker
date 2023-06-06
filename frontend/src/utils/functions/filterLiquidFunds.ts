import type { ATLiquidFund } from '../types/atLiquidFund'
import { monthsConstant } from '../constants'
import { sortLiquidFundsByMonthAndYear } from './sortLiquidFundsByMonthAndYear'

/**
 * @description Filters a list of liquid funds
 * @param liquidFundsList The list of liquid funds to filter
 * @param filterArray The filter to use
 * @returns The filtered list of liquid funds
 */
export const filterLiquidFunds = (liquidFundsList: ATLiquidFund[], filterArray: string[]) => {
  sortLiquidFundsByMonthAndYear(liquidFundsList)
  return liquidFundsList.filter((liquidFund) => {
    if (
      monthsConstant()[liquidFund.month - 1].toLowerCase().includes(filterArray[0]) ||
      liquidFund.year.toString().includes(filterArray[0])
    ) {
      if (filterArray.length === 2) {
        if (
          monthsConstant()[liquidFund.month - 1].toLowerCase().includes(filterArray[0]) &&
          liquidFund.year.toString().includes(filterArray[1])
        ) {
          return true
        }
        return false
      }
      return true
    }
    return false
  })
}
