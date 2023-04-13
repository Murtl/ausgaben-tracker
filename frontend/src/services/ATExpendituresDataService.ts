import expenditures from '@/database/expenditures.json'

interface ATJsonExpenditures {
  [key: string]: {
    id: number
    sourceOfExpenditure: string
    additionalInfo: string
    amount: number
    date: string
  }[]
}

export type ATExpenditure = {
  id: number
  sourceOfExpenditure: string
  additionalInfo: string
  amount: number
  date: string
}

export class ATExpendituresDataService {
  static myExpenditures: ATJsonExpenditures = expenditures

  static getExpenditures(userUID: string): ATExpenditure[] {
    try {
      return [...ATExpendituresDataService.myExpenditures[userUID as string]]
    } catch (e) {
      ATExpendituresDataService.myExpenditures[userUID] = []
    }
    return [...ATExpendituresDataService.myExpenditures[userUID]]
  }

  static addExpenditure(expenditure: ATExpenditure, userUID: string): void {
    ATExpendituresDataService.myExpenditures[userUID].push(expenditure)
  }

  static deleteExpenditure(id: number, userUID: string): void {
    ATExpendituresDataService.myExpenditures[userUID] = ATExpendituresDataService.myExpenditures[
      userUID
    ].filter((expenditure) => expenditure.id !== id)
  }

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
