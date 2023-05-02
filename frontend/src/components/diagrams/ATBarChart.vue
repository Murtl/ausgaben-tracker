<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { useI18nStore } from '@/stores/i18nStore'
import ATSortBanner from '@/base-components/sort-banner/ATSortBanner.vue'
import ATDropDown from '@/base-components/drop-down/ATDropDown.vue'
import { onBeforeMount, ref, computed } from 'vue'
import type { Ref } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { storeToRefs } from 'pinia'
import { useExpendituresStore } from '@/stores/expendituresStore'
import { monthsConstant, sortByMonthOrYearOptions } from '@/utils/constants'
import { presortExpenditures } from '@/utils/functions/presortExpenditures'
import type { ATExpenditureSorted } from '@/utils/types/atExpenditureSorted'
import { sortExpenditures } from '@/utils/functions/sortExpenditures'
import { getAvailableYearsOfExpenditures } from '@/utils/functions/getAvailableYearsOfExpenditures'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const i18n = useI18nStore().i18n

const expendituresStore = useExpendituresStore()
const { allExpenditures } = storeToRefs(expendituresStore)
const presortedExpenditures: Ref<ATExpenditureSorted[]> = ref([])
const sortedExpenditures: Ref<ATExpenditureSorted[]> = ref([])

const yearOptions: Ref<number[]> = ref([])
const labelOptions: Ref<number[] | string[]> = ref([])
const data = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
const showYearDropDown = ref(true)
const selectedYear = ref(0)

const chartData = computed(() => {
  return {
    labels: labelOptions.value,
    datasets: [
      {
        data: data.value,
        backgroundColor: '#1676F3',
        label: i18n.expenditures_in_euro
      }
    ]
  }
})
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      title: {
        display: true,
        text: i18n.total_expenditures
      }
    },
    x: {
      grid: {
        color: '#FFFFFF'
      }
    }
  }
}

onBeforeMount(() => {
  presortedExpenditures.value = presortExpenditures(allExpenditures.value)
  sortedExpenditures.value = sortExpenditures(presortedExpenditures.value)
  yearOptions.value = getAvailableYearsOfExpenditures(presortedExpenditures.value)
  selectedYear.value = yearOptions.value[0]
  labelOptions.value = monthsConstant()
  sortExpendituresInData()
})

/**
 * Sorts the expenditures in the data and labelOptions array based on the selected sort option
 */
const sortExpendituresInData = () => {
  if (!showYearDropDown.value) {
    data.value = []
    labelOptions.value = yearOptions.value
    yearOptions.value.forEach((year) => {
      let sum = 0
      sortedExpenditures.value.forEach((expenditure) => {
        if (expenditure.year === year) {
          sum += expenditure.height
        }
      })
      data.value.push(sum)
    })
  } else {
    labelOptions.value = monthsConstant()
    data.value = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    sortedExpenditures.value.forEach((expenditure) => {
      if (expenditure.year === selectedYear.value) {
        data.value[expenditure.month - 1] = expenditure.height
      }
    })
  }
}

const updateSort = (value: string) => {
  if (value === i18n.months) {
    showYearDropDown.value = true
  } else {
    showYearDropDown.value = false
  }
  sortExpendituresInData()
}

const updateSelectedYear = (value: string) => {
  selectedYear.value = parseInt(value)
  sortExpendituresInData()
}
</script>

<template>
  <div class="bar-chart-host">
    <section class="bar-chart-options">
      <ATSortBanner :title="i18n.sorted_by" />
      <ATDropDown :options="sortByMonthOrYearOptions()" @change="updateSort" />
      <ATDropDown v-if="showYearDropDown" :options="yearOptions" @change="updateSelectedYear" />
    </section>
    <section class="bar-chart">
      <Bar :options="chartOptions" :data="chartData" />
    </section>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/components/diagrams/atBarChart.scss';
</style>
