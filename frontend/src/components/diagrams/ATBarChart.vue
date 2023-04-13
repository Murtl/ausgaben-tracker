<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import dynamicText from '../../assets/dynamicText.json'
import staticText from '../../assets/staticText.json'
import ATSortBanner from '@/components/sort-banner/ATSortBanner.vue'
import ATDropDown from '@/components/drop-down/ATDropDown.vue'
import { onBeforeMount, ref, computed } from 'vue'
import type { Ref } from 'vue'
import type { ATLiquidFund } from '@/services/ATLiquidFundsDataService'
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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const expendituresStore = useExpendituresStore()
const { allExpenditures } = storeToRefs(expendituresStore)

onBeforeMount(() => {
  presortExpenditures()
  sortExpenditures()
  yearOptions.value = getAvailableYears()
  selectedYear.value = yearOptions.value[0]
  labelOptions.value = monthOptions
  sortExpendituresInData()
})

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

const getAvailableYears = () => {
  const years: number[] = []
  presortedExpenditures.value.forEach((expenditure) => {
    if (!years.includes(expenditure.year)) {
      years.push(expenditure.year)
    }
  })
  return years
}

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
    labelOptions.value = monthOptions
    data.value = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    sortedExpenditures.value.forEach((expenditure) => {
      if (expenditure.year === selectedYear.value) {
        data.value[expenditure.month - 1] = expenditure.height
      }
    })
  }
}

const sortByOption = [dynamicText.months, dynamicText.years]
const monthOptions = [
  dynamicText.january,
  dynamicText.february,
  dynamicText.march,
  dynamicText.april,
  dynamicText.may,
  dynamicText.june,
  dynamicText.july,
  dynamicText.august,
  dynamicText.september,
  dynamicText.october,
  dynamicText.november,
  dynamicText.december
]
const labelOptions: Ref<number[] | string[]> = ref([])
const yearOptions: Ref<number[]> = ref([])
const data = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

const chartData = computed(() => {
  return {
    labels: labelOptions.value,
    datasets: [
      {
        data: data.value,
        backgroundColor: staticText.chart_color,
        label: dynamicText.expenditures_in_euro
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
        text: dynamicText.total_expenditures
      }
    },
    x: {
      grid: {
        color: staticText.line_color
      }
    }
  }
}

const showYearDropDown = ref(true)
const updateSort = (value: string) => {
  if (value === dynamicText.months) {
    showYearDropDown.value = true
  } else {
    showYearDropDown.value = false
  }
  sortExpendituresInData()
}

const selectedYear = ref(0)
const updateSelectedYear = (value: string) => {
  selectedYear.value = parseInt(value)
  sortExpendituresInData()
}
</script>

<template>
  <div class="bar-chart-host">
    <section class="bar-chart-options">
      <ATSortBanner :title="dynamicText.sorted_by" />
      <ATDropDown :options="sortByOption" @change="updateSort" />
      <ATDropDown v-if="showYearDropDown" :options="yearOptions" @change="updateSelectedYear" />
    </section>
    <section class="bar-chart">
      <Bar :options="chartOptions" :data="chartData" />
    </section>
  </div>
</template>

<style scoped lang="scss">
@import 'src/assets/main.scss';
.bar-chart-host {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: $main-box-shadow;
  background-color: $background-white;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;

  .bar-chart-options {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 10px;
    gap: 10px;
    width: 100%;
  }

  .bar-chart {
    width: 100%;
    height: 400px;
  }
}
</style>
