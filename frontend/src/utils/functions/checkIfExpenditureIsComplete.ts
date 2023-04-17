import type { ATExpenditure } from '@/utils/types/atExpenditure'

/**
 * @description Checks if an expenditure is complete
 * @param expenditure The expenditure to check
 * @returns True if the expenditure is complete, false if not
 */
export const checkIfExpenditureIsComplete = (expenditure: ATExpenditure) => {
  if (
    !expenditure.sourceOfExpenditure ||
    !expenditure.amount ||
    expenditure.amount === 0 ||
    !expenditure.date ||
    expenditure.amount < 0
  ) {
    return false
  }
  return true
}
