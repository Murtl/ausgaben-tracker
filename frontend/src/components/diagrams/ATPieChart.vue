<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import type { Ref } from 'vue'
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from 'chart.js'
import { useI18nStore } from '@/stores/i18nStore'
import ATSortBanner from '@/base-components/sort-banner/ATSortBanner.vue'
import ATDropDown from '@/base-components/drop-down/ATDropDown.vue'
import { storeToRefs } from 'pinia'
import { onBeforeMount, ref, computed } from 'vue'
import { useExpendituresStore } from '@/stores/expendituresStore'
import { monthsConstant, sortByMonthOrYearOptions } from '@/utils/constants'
import { presortExpenditures } from '@/utils/functions/presortExpenditures'
import type { ATExpenditureSorted } from '@/utils/types/atExpenditureSorted'
import { sortExpenditures } from '@/utils/functions/sortExpenditures'
import { getAvailableYearsOfExpenditures } from '@/utils/functions/getAvailableYearsOfExpenditures'

ChartJS.register(ArcElement, Tooltip, Legend)

const i18n = useI18nStore().i18n

const expendituresStore = useExpendituresStore()
const { allExpenditures } = storeToRefs(expendituresStore)
const presortedExpenditures: Ref<ATExpenditureSorted[]> = ref([])
const sortedExpenditures: Ref<ATExpenditureSorted[]> = ref([])

const yearOptions: Ref<number[]> = ref([])
const labelOptions: Ref<string[]> = ref([])
const data: Ref<number[]> = ref([])
const showMonthDropDown = ref(true)
const selectedMonth = ref('')
const selectedYear = ref(0)

const chartData = computed(() => {
  return {
    labels: labelOptions.value,
    datasets: [
      {
        backgroundColor: [
          '#1676F3',
          '#E46651',
          '#00D8FF',
          '#DD1B16',
          '#FF9F40',
          '#FFCD56',
          '#FF6384',
          '#4BC0C0',
          '#9966FF',
          '#C9CB40',
          '#FFCE56',
          '#36A2EB'
        ],
        data: data.value
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}

onBeforeMount(() => {
  presortedExpenditures.value = presortExpenditures(allExpenditures.value)
  sortedExpenditures.value = sortExpenditures(presortedExpenditures.value, true)
  yearOptions.value = getAvailableYearsOfExpenditures(presortedExpenditures.value)
  selectedYear.value = yearOptions.value[0]
  selectedMonth.value = monthsConstant()[0]
  sortExpendituresInData()
})

/**
 * Sorts the expenditures in the data and labelOptions array based on the selected sort option
 */
const sortExpendituresInData = () => {
  data.value = []
  labelOptions.value = []
  sortedExpenditures.value = sortedExpenditures.value.sort((a, b) => {
    return b.height - a.height
  })
  if (!showMonthDropDown.value) {
    sortedExpenditures.value.forEach((expenditure) => {
      if (expenditure.year === selectedYear.value) {
        let wasThere = false
        labelOptions.value.forEach((sourceOfExpenditure) => {
          if (sourceOfExpenditure === expenditure.sourceOfExpenditure) {
            data.value[labelOptions.value.indexOf(sourceOfExpenditure)] += expenditure.height
            wasThere = true
            return
          }
        })
        if (!wasThere) {
          data.value.push(expenditure.height)
          labelOptions.value.push(expenditure.sourceOfExpenditure)
        }
      }
    })
  } else {
    sortedExpenditures.value.forEach((expenditure) => {
      if (
        expenditure.year === selectedYear.value &&
        monthsConstant()[expenditure.month - 1] === selectedMonth.value
      ) {
        data.value.push(expenditure.height)
        labelOptions.value.push(expenditure.sourceOfExpenditure)
      }
    })
  }
  sliceDataIfToBig()
  if (!labelOptions.value[0]) {
    labelOptions.value = [i18n.no_expenditures]
    data.value = [1]
  }
}

const sliceDataIfToBig = () => {
  if (data.value.length > 12) {
    for (let i = 12; i < data.value.length; i++) {
      data.value[11] += data.value[i]
    }
    data.value = data.value.slice(0, 12)
    labelOptions.value = labelOptions.value.slice(0, 12)
    labelOptions.value[11] = i18n.other
  }
}

const updateSort = (value: string) => {
  if (value === i18n.months) {
    selectedMonth.value = monthsConstant()[0]
    showMonthDropDown.value = true
  } else {
    showMonthDropDown.value = false
  }
  sortExpendituresInData()
}

const updateSelectedMonth = (value: string) => {
  selectedMonth.value = value
  sortExpendituresInData()
}

const updateSelectedYear = (value: string) => {
  selectedYear.value = parseInt(value)
  sortExpendituresInData()
}
</script>

<template>
  <div class="pie-chart-host">
    <section class="pie-chart-options">
      <ATSortBanner :title="i18n.sorted_by" />
      <ATDropDown :options="sortByMonthOrYearOptions()" @change="updateSort" />
      <ATDropDown
        v-if="showMonthDropDown"
        :options="monthsConstant()"
        @change="updateSelectedMonth"
      />
      <ATDropDown :options="yearOptions" @change="updateSelectedYear" />
    </section>
    <section class="pie-chart">
      <Pie :options="chartOptions" :data="chartData" />
    </section>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/components/diagrams/atPieChart.scss';
</style>
