import type { ATLiquidFund } from '@/utils/types/atLiquidFund'

/**
 * @description Checks if a liquid fund is complete
 * @param liquidFund The liquid fund to check
 * @returns True if the liquid fund is complete, false if not
 */
export const checkIfLiquidFundIsComplete = (liquidFund: ATLiquidFund) => {
  if (
    liquidFund.height === 0 ||
    !liquidFund.height ||
    liquidFund.month === 0 ||
    !liquidFund.month ||
    liquidFund.year === 0 ||
    !liquidFund.year ||
    liquidFund.month > 12 ||
    liquidFund.month < 1 ||
    liquidFund.year < 1900 ||
    liquidFund.year > 2100 ||
    liquidFund.height < 0
  ) {
    return false
  }
  return true
}
