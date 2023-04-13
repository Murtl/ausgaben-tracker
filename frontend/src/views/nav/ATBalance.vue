<script setup lang="ts">
import ATButton from '@/components/button/ATButton.vue'
import ATInput from '@/components/input/ATInput.vue'
import ATModal from '@/components/modal/ATModal.vue'
import { onBeforeMount, ref } from 'vue'
import type { Ref } from 'vue'
import dynamicText from '../../assets/dynamicText.json'
import ATSearchbar from '@/components/searchbar/ATSearchbar.vue'
import ATPlusIcon from '@/components/icons/ATPlusIcon.vue'
import ATSegmentItem from '@/components/segment-item/ATSegmentItem.vue'
import ATSegment from '@/components/segment/ATSegment.vue'
import { useLiquidFundsStore } from '@/stores/liquidFundsStore'
import { storeToRefs } from 'pinia'
import { useExpendituresStore } from '@/stores/expendituresStore'
import { ATLiquidFundsDataService, type ATLiquidFund } from '@/services/ATLiquidFundsDataService'
import { useUserDataStore } from '@/stores/userDataStore'

const userDataStore = useUserDataStore()
const { userUID } = storeToRefs(userDataStore)

const liquidFundsStore = useLiquidFundsStore()
const { allLiquidFunds } = storeToRefs(liquidFundsStore)
const sortedLiquidFunds: Ref<ATLiquidFund[]> = ref(allLiquidFunds.value)

const sortLiquidFundsByMonthAndYear = () => {
  sortedLiquidFunds.value.sort((a, b) => {
    if (a.year < b.year) {
      return -1
    }
    if (a.year > b.year) {
      return 1
    }
    if (a.month < b.month) {
      return -1
    }
    if (a.month > b.month) {
      return 1
    }
    return 0
  })
}

const expendituresStore = useExpendituresStore()
const { allExpenditures } = storeToRefs(expendituresStore)

const presortedExpenditures: Ref<ATLiquidFund[]> = ref([])
const presortExpenditures = () => {
  allExpenditures.value.forEach((expenditure) => {
    presortedExpenditures.value.push({
      id: expenditure.id,
      height: expenditure.amount,
      month: parseInt(expenditure.date.substring(3, 5)),
      year: parseInt(expenditure.date.substring(6))
    })
  })
}

const sortedExpenditures: Ref<ATLiquidFund[]> = ref([])
const sortExpenditures = () => {
  for (let i = 0; i < presortedExpenditures.value.length; i++) {
    let wasThere = false
    sortedExpenditures.value.forEach((sortedExpenditure) => {
      if (
        sortedExpenditure.month === presortedExpenditures.value[i].month &&
        sortedExpenditure.year === presortedExpenditures.value[i].year
      ) {
        sortedExpenditure.height += presortedExpenditures.value[i].height
        wasThere = true
      }
    })
    if (!wasThere) {
      sortedExpenditures.value.push({
        id: presortedExpenditures.value[i].id,
        height: presortedExpenditures.value[i].height,
        month: presortedExpenditures.value[i].month,
        year: presortedExpenditures.value[i].year
      })
    }
  }
}

const getExpenditure = (liquidFund: { height: number; month: number; year: number }) => {
  let expenditure = 0
  sortedExpenditures.value.forEach((sortedExpenditure) => {
    if (
      sortedExpenditure.month === liquidFund.month &&
      sortedExpenditure.year === liquidFund.year
    ) {
      expenditure = sortedExpenditure.height
    }
  })
  return expenditure
}

onBeforeMount(() => {
  sortLiquidFundsByMonthAndYear()
  presortExpenditures()
  sortExpenditures()
})

const monthsArray = [
  '0',
  dynamicText.january,
  dynamicText.february,
  dynamicText.march,
  dynamicText.april,
  dynamicText.march,
  dynamicText.june,
  dynamicText.july,
  dynamicText.august,
  dynamicText.september,
  dynamicText.october,
  dynamicText.november,
  dynamicText.december
]

const newLiquidFund: Ref<ATLiquidFund> = ref({
  id: 0,
  height: 0,
  month: 0,
  year: 0
})

const showModalWrongInfo = ref(false)
const handleShowModalWrongInfo = () => {
  showModalWrongInfo.value = true
}

const handleCloseModalWrongInfo = () => {
  showModalWrongInfo.value = false
}

const checkIfLiquidFundIsComplete = () => {
  if (
    newLiquidFund.value.height === 0 ||
    !newLiquidFund.value.height ||
    newLiquidFund.value.month === 0 ||
    !newLiquidFund.value.month ||
    newLiquidFund.value.year === 0 ||
    !newLiquidFund.value.year ||
    newLiquidFund.value.month > 12 ||
    newLiquidFund.value.month < 1 ||
    newLiquidFund.value.year < 1900 ||
    newLiquidFund.value.year > 2100 ||
    newLiquidFund.value.height < 0
  ) {
    return false
  }
  return true
}

const showModalAddLiquidFund = ref(false)

const handleShowModalAddLiquidFund = () => {
  showModalAddLiquidFund.value = true
}

const handleCloseModalAddLiquidFundOnCreation = () => {
  if (!checkIfLiquidFundIsComplete()) {
    handleShowModalWrongInfo()
    return
  }
  let wasThere = false
  allLiquidFunds.value.forEach((liquidFund) => {
    if (
      newLiquidFund.value.month === liquidFund.month &&
      newLiquidFund.value.year === liquidFund.year
    ) {
      liquidFund.height += newLiquidFund.value.height
      newLiquidFund.value.id = liquidFund.id
      newLiquidFund.value.height = liquidFund.height
      ATLiquidFundsDataService.updateLiquidFund(newLiquidFund.value, userUID.value)
      wasThere = true
    }
  })
  if (!wasThere) {
    try {
      newLiquidFund.value.id = getHighestId() + 1
    } catch {
      newLiquidFund.value.id = 1
    }
    allLiquidFunds.value.push(newLiquidFund.value)
    ATLiquidFundsDataService.addLiquidFund(newLiquidFund.value, userUID.value)
  }
  newLiquidFund.value = {
    id: 0,
    height: 0,
    month: 0,
    year: 0
  }
  sortLiquidFundsByMonthAndYear()
  searchChanged(searchbarValue.value)
  showModalAddLiquidFund.value = false
}

const handleCloseModalAddLiquidFundOnCancel = () => {
  showModalAddLiquidFund.value = false
}

const handleDeleteLiquidFund = (liquidFund: ATLiquidFund) => {
  allLiquidFunds.value = allLiquidFunds.value.filter((fm) => fm.id !== liquidFund.id)
  sortedLiquidFunds.value = sortedLiquidFunds.value.filter((fm) => fm.id !== liquidFund.id)
  ATLiquidFundsDataService.deleteLiquidFund(liquidFund.id, userUID.value)
}

const handleUpdateLiquidFund = (liquidFund: ATLiquidFund) => {
  allLiquidFunds.value = allLiquidFunds.value.map((lf) => {
    if (lf.id === liquidFund.id) {
      return liquidFund
    }
    return lf
  })
  sortedLiquidFunds.value = sortedLiquidFunds.value.map((lf) => {
    if (lf.id === liquidFund.id) {
      return liquidFund
    }
    return lf
  })
  ATLiquidFundsDataService.updateLiquidFund(liquidFund, userUID.value)
  sortLiquidFundsByMonthAndYear()
}

const searchbarValue = ref('')
const searchChanged = (newFilter: string) => {
  searchbarValue.value = newFilter
  sortedLiquidFunds.value = allLiquidFunds.value
  sortLiquidFundsByMonthAndYear()
  const filterArray = newFilter.toLowerCase().split(' ')
  sortedLiquidFunds.value = sortedLiquidFunds.value.filter((liquidFund) => {
    if (
      monthsArray[liquidFund.month].toLowerCase().includes(filterArray[0]) ||
      liquidFund.year.toString().includes(filterArray[0])
    ) {
      if (filterArray.length === 2) {
        if (
          monthsArray[liquidFund.month].toLowerCase().includes(filterArray[0]) &&
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

const getHighestId = () => {
  let highestId = 0
  allLiquidFunds.value.forEach((liquidFund) => {
    if (liquidFund.id > highestId) {
      highestId = liquidFund.id
    }
  })
  return highestId
}
</script>

<template>
  <div class="at-balance-host">
    <header>
      <ATSearchbar :placeholder="dynamicText.search_month_year" @search-changed="searchChanged" />
      <ATButton
        :title="dynamicText.add_liquid_fund"
        width="261px"
        primary
        @press="handleShowModalAddLiquidFund"
      >
        <template #icon>
          <ATPlusIcon />
        </template>
      </ATButton>
    </header>
    <main v-for="liquidFund in sortedLiquidFunds.slice().reverse()" :key="liquidFund.id">
      <ATSegment :title="monthsArray[liquidFund.month]" :year="liquidFund.year">
        <ATSegmentItem
          :title="dynamicText.liquid_funds"
          :value="`${liquidFund.height} €`"
          :liquid-fund="liquidFund"
          editable
          @delete-liquid-fund="handleDeleteLiquidFund"
          @update-liquid-fund="handleUpdateLiquidFund"
        />
        <ATSegmentItem
          :title="dynamicText.minus_expenditures"
          :value="`${getExpenditure(liquidFund)} €`"
        />
        <ATSegmentItem
          :title="dynamicText.balance"
          :value="`${liquidFund.height - getExpenditure(liquidFund)} €`"
        />
      </ATSegment>
    </main>
  </div>
  <ATModal v-if="showModalAddLiquidFund" :title="dynamicText.add_liquid_fund">
    <template #inputs>
      <ATInput
        :title="dynamicText.height"
        :placeholder="dynamicText.placeholder_amount"
        v-model:value="newLiquidFund.height"
      />
      <ATInput
        :title="dynamicText.month"
        :placeholder="dynamicText.placeholder_month"
        v-model:value="newLiquidFund.month"
        type-month
      />
      <ATInput
        :title="dynamicText.year"
        :placeholder="dynamicText.placeholder_year"
        v-model:value="newLiquidFund.year"
        type-year
      />
    </template>
    <template #buttons>
      <ATButton
        :title="dynamicText.cancel"
        secondary
        @press="handleCloseModalAddLiquidFundOnCancel"
      />
      <ATButton
        :title="dynamicText.save"
        primary
        @press="handleCloseModalAddLiquidFundOnCreation"
      />
    </template>
  </ATModal>
  <ATModal v-if="showModalWrongInfo" :title="dynamicText.incorrect_input">
    <template #inputs>
      <p>{{ dynamicText.incorrect_input_at_height }}</p>
      <p>{{ dynamicText.incorrect_input_at_month }}</p>
      <p>{{ dynamicText.incorrect_input_at_year }}</p>
    </template>
    <template #buttons>
      <ATButton
        :title="dynamicText.try_again"
        primary
        @press="handleCloseModalWrongInfo"
        width="200px"
      />
    </template>
  </ATModal>
</template>

<style scoped lang="scss">
.at-balance-host {
  @import 'src/assets/main.scss';

  header {
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $background-searchbar-color;
    gap: 10px;

    :deep(.at-button-host) {
      margin-bottom: 0;
    }
  }

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
