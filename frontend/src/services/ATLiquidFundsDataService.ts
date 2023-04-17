import liquidFunds from '@/database/liquidFunds.json'
import type { ATLiquidFund } from '@/utils/types/atLiquidFund'

/**
 * @description The interface for the liquidFunds.json file
 */
interface ATJsonLiquidFunds {
  [key: string]: {
    id: number
    height: number
    month: number
    year: number
  }[]
}

/**
 * @description Service for interacting with the liquidFunds.json file
 */
export class ATLiquidFundsDataService {
  static myLiquidFunds: ATJsonLiquidFunds = liquidFunds

  /**
   * @description Gets all liquid funds of a user
   * @param userUID userUID of the user
   * @returns The liquid funds of the user
   */
  static getLiquidFunds(userUID: string): ATLiquidFund[] {
    try {
      return [...ATLiquidFundsDataService.myLiquidFunds[userUID as string]]
    } catch (e) {
      ATLiquidFundsDataService.myLiquidFunds[userUID] = []
    }
    return [...ATLiquidFundsDataService.myLiquidFunds[userUID]]
  }

  /**
   * @description Adds a liquid fund to the liquidFunds.json file
   * @param liquidFund liquid fund to add
   * @param userUID userUID of the user
   */
  static addLiquidFund(liquidFund: ATLiquidFund, userUID: string): void {
    ATLiquidFundsDataService.myLiquidFunds[userUID].push(liquidFund)
  }

  /**
   * @description Deletes a liquid fund from the liquidFunds.json file
   * @param id id of the liquid fund
   * @param userUID userUID of the user
   */
  static deleteLiquidFund(id: number, userUID: string): void {
    ATLiquidFundsDataService.myLiquidFunds[userUID] = ATLiquidFundsDataService.myLiquidFunds[
      userUID
    ].filter((liquidFund) => liquidFund.id !== id)
  }

  /**
   * @description Updates a liquid fund in the liquidFunds.json file
   * @param liquidFund liquid fund to update
   * @param userUID userUID of the user
   */
  static updateLiquidFund(liquidFund: ATLiquidFund, userUID: string): void {
    ATLiquidFundsDataService.myLiquidFunds[userUID] = ATLiquidFundsDataService.myLiquidFunds[
      userUID
    ].map((lf) => {
      if (lf.id === liquidFund.id) {
        return liquidFund
      }
      return lf
    })
  }
}
