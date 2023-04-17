import type { ATLiquidFund } from '@/utils/types/atLiquidFund'

/**
 * @description Gets the highest id of a list of liquid funds
 * @param liquidFundsList The list of liquid funds to get the highest id from
 * @returns The highest id of the liquid funds
 */
export const getHighestIdOfLiquidFunds = (liquidFundsList: ATLiquidFund[]) => {
  let highestId = 0
  liquidFundsList.forEach((liquidFund) => {
    if (liquidFund.id > highestId) {
      highestId = liquidFund.id
    }
  })
  return highestId
}
