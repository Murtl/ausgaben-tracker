import type { ATLiquidFund } from '../types/atLiquidFund'

/**
 * @description Gets the height of an expenditure of a month and year
 * @param sortedExpenditures The sorted expenditures to get the height from
 * @param liquidFund The liquid fund to get the month and year from
 * @returns The height of the expenditure
 */
export const getExpenditureHeightOfMonthAndYear = (
  sortedExpenditures: ATLiquidFund[],
  liquidFund: ATLiquidFund
) => {
  let expenditureHeight = 0
  sortedExpenditures.forEach((sortedExpenditure) => {
    if (
      sortedExpenditure.month === liquidFund.month &&
      sortedExpenditure.year === liquidFund.year
    ) {
      expenditureHeight = sortedExpenditure.height
    }
  })
  return expenditureHeight
}
