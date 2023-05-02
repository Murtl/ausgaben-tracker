import type { ATExpenditure } from '@/utils/types/atExpenditure'

/**
 * @description The interface for the expenditures.json file
 */
interface ATJsonExpenditures {
  [key: string]: {
    id: number
    sourceOfExpenditure: string
    additionalInfo: string
    amount: number
    date: string
  }[]
}

/**
 * @description Service for interacting with the expenditures
 */
export class ATExpendituresDataService {
  static myExpenditures: ATJsonExpenditures = {}

  /**
   * @description Gets all expenditures of a user
   * @param userUID userUID of the user
   * @returns The expenditures of the user
   */
  static getExpenditures(userUID: string): ATExpenditure[] {
    try {
      return [...ATExpendituresDataService.myExpenditures[userUID as string]]
    } catch (e) {
      ATExpendituresDataService.myExpenditures[userUID] = []
    }
    return [...ATExpendituresDataService.myExpenditures[userUID]]
  }

  /**
   * @description Adds an expenditure to the expenditures
   * @param expenditure The expenditure to add
   * @param userUID userUID of the user
   */
  static addExpenditure(expenditure: ATExpenditure, userUID: string): void {
    ATExpendituresDataService.myExpenditures[userUID].push(expenditure)
  }

  /**
   * @description Deletes an expenditure from the expenditures
   * @param id id of the expenditure
   * @param userUID userUID of the user
   */
  static deleteExpenditure(id: number, userUID: string): void {
    ATExpendituresDataService.myExpenditures[userUID] = ATExpendituresDataService.myExpenditures[
      userUID
    ].filter((expenditure) => expenditure.id !== id)
  }

  /**
   * @description Updates an expenditure in the expenditures
   * @param expenditure expenditure to update
   * @param userUID userUID of the user
   */
  static updateExpenditure(expenditure: ATExpenditure, userUID: string): void {
    ATExpendituresDataService.myExpenditures[userUID] = ATExpendituresDataService.myExpenditures[
      userUID
    ].map((e) => {
      if (e.id === expenditure.id) {
        return expenditure
      }
      return e
    })
  }
}
