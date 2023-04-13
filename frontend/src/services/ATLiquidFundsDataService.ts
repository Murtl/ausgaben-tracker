import liquidFunds from '@/database/liquidFunds.json'

interface ATJsonLiquidFunds {
  [key: string]: {
    id: number
    height: number
    month: number
    year: number
  }[]
}

export type ATLiquidFund = {
  id: number
  height: number
  month: number
  year: number
}

export class ATLiquidFundsDataService {
  static myLiquidFunds: ATJsonLiquidFunds = liquidFunds

  static getLiquidFunds(userUID: string): ATLiquidFund[] {
    try {
      return [...ATLiquidFundsDataService.myLiquidFunds[userUID as string]]
    } catch (e) {
      ATLiquidFundsDataService.myLiquidFunds[userUID] = []
    }
    return [...ATLiquidFundsDataService.myLiquidFunds[userUID]]
  }

  static addLiquidFund(liquidFund: ATLiquidFund, userUID: string): void {
    ATLiquidFundsDataService.myLiquidFunds[userUID].push(liquidFund)
  }

  static deleteLiquidFund(id: number, userUID: string): void {
    ATLiquidFundsDataService.myLiquidFunds[userUID] = ATLiquidFundsDataService.myLiquidFunds[
      userUID
    ].filter((liquidFund) => liquidFund.id !== id)
  }

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
