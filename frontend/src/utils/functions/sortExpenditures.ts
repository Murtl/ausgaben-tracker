import type { ATExpenditureSorted } from '../types/atExpenditureSorted'

/**
 * @description Sorts a list of expenditures
 * @param presortedExpenditures The list of expenditures to sort
 * @param forPieChart Whether the expenditures should be sorted for the pie chart
 * @returns The sorted list of expenditures
 */
export const sortExpenditures = (
  presortedExpenditures: ATExpenditureSorted[],
  forPieChart?: boolean
) => {
  const sortedExpenditures: ATExpenditureSorted[] = []
  for (let i = 0; i < presortedExpenditures.length; i++) {
    let wasThere = false
    sortedExpenditures.forEach((sortedExpenditure) => {
      if (
        sortedExpenditure.month === presortedExpenditures[i].month &&
        sortedExpenditure.year === presortedExpenditures[i].year
      ) {
        if (
          forPieChart &&
          sortedExpenditure.sourceOfExpenditure === presortedExpenditures[i].sourceOfExpenditure
        ) {
          sortedExpenditure.height += presortedExpenditures[i].height
          wasThere = true
        }
        if (!forPieChart) {
          sortedExpenditure.height += presortedExpenditures[i].height
          wasThere = true
        }
      }
    })
    if (!wasThere) {
      sortedExpenditures.push({
        id: presortedExpenditures[i].id,
        height: presortedExpenditures[i].height,
        month: presortedExpenditures[i].month,
        year: presortedExpenditures[i].year,
        sourceOfExpenditure: presortedExpenditures[i].sourceOfExpenditure
      })
    }
  }
  return sortedExpenditures
}
