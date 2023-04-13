<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import type { Ref } from 'vue'
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from 'chart.js'
import dynamicText from '../../assets/dynamicText.json'
import staticText from '../../assets/staticText.json'
import ATSortBanner from '@/components/sort-banner/ATSortBanner.vue'
import ATDropDown from '@/components/drop-down/ATDropDown.vue'
import { storeToRefs } from 'pinia'
import { onBeforeMount, ref, computed } from 'vue'
import { useExpendituresStore } from '@/stores/expendituresStore'

ChartJS.register(ArcElement, Tooltip, Legend)

type ATExpenditureItem = {
  id: number
  height: number
  month: number
  year: number
  sourceOfExpenditure: string
}

const expendituresStore = useExpendituresStore()
const { allExpenditures } = storeToRefs(expendituresStore)

onBeforeMount(() => {
  presortExpenditures()
  sortExpenditures()
  yearOptions.value = getAvailableYears()
  selectedYear.value = yearOptions.value[0]
  selectedMonth.value = monthOptions[0]
  sortExpendituresInData()
})

const presortedExpenditures: Ref<ATExpenditureItem[]> = ref([])
const presortExpenditures = () => {
  allExpenditures.value.forEach((expenditure) => {
    presortedExpenditures.value.push({
      id: expenditure.id,
      height: expenditure.amount,
      month: parseInt(expenditure.date.substring(3, 5)),
      year: parseInt(expenditure.date.substring(6)),
      sourceOfExpenditure: expenditure.sourceOfExpenditure
    })
  })
}

const sortedExpenditures: Ref<ATExpenditureItem[]> = ref([])
const sortExpenditures = () => {
  for (let i = 0; i < presortedExpenditures.value.length; i++) {
    let wasThere = false
    sortedExpenditures.value.forEach((sortedExpenditure) => {
      if (
        sortedExpenditure.sourceOfExpenditure ===
          presortedExpenditures.value[i].sourceOfExpenditure &&
        sortedExpenditure.year === presortedExpenditures.value[i].year &&
        sortedExpenditure.month === presortedExpenditures.value[i].month
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
        year: presortedExpenditures.value[i].year,
        sourceOfExpenditure: presortedExpenditures.value[i].sourceOfExpenditure
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
  if (!showMonthDropDown.value) {
    data.value = []
    labelOptions.value = []
    sortedExpenditures.value = sortedExpenditures.value.sort((a, b) => {
      return b.height - a.height
    })
    sortedExpenditures.value.forEach((expenditure) => {
      if (expenditure.year === selectedYear.value) {
        data.value.push(expenditure.height)
        labelOptions.value.push(expenditure.sourceOfExpenditure)
      }
    })
    if (data.value.length > 12) {
      for (let i = 12; i < data.value.length; i++) {
        data.value[11] += data.value[i]
      }
      data.value = data.value.slice(0, 12)
      labelOptions.value = labelOptions.value.slice(0, 12)
      labelOptions.value[11] = dynamicText.other
    }
  } else {
    labelOptions.value = []
    data.value = []
    sortedExpenditures.value.forEach((expenditure) => {
      if (
        expenditure.year === selectedYear.value &&
        monthOptions[expenditure.month - 1] === selectedMonth.value
      ) {
        data.value.push(expenditure.height)
        labelOptions.value.push(expenditure.sourceOfExpenditure)
      }
    })
  }
  if (!labelOptions.value[0]) {
    labelOptions.value = [dynamicText.no_expenditures]
    data.value = [1]
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
const yearOptions: Ref<number[]> = ref([])
const labelOptions: Ref<string[]> = ref([])
const data: Ref<number[]> = ref([])

const chartData = computed(() => {
  return {
    labels: labelOptions.value,
    datasets: [
      {
        backgroundColor: staticText.pie_chart_colors,
        data: data.value
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}

const showMonthDropDown = ref(true)
const updateSort = (value: string) => {
  if (value === dynamicText.months) {
    showMonthDropDown.value = true
  } else {
    showMonthDropDown.value = false
  }
  sortExpendituresInData()
}

const selectedMonth = ref('')
const updateSelectedMonth = (value: string) => {
  selectedMonth.value = value
  sortExpendituresInData()
}

const selectedYear = ref(0)
const updateSelectedYear = (value: string) => {
  selectedYear.value = parseInt(value)
  sortExpendituresInData()
}
</script>

<template>
  <div class="pie-chart-host">
    <section class="pie-chart-options">
      <ATSortBanner :title="dynamicText.sorted_by" />
      <ATDropDown :options="sortByOption" @change="updateSort" />
      <ATDropDown v-if="showMonthDropDown" :options="monthOptions" @change="updateSelectedMonth" />
      <ATDropDown :options="yearOptions" @change="updateSelectedYear" />
    </section>
    <section class="pie-chart">
      <Pie :options="chartOptions" :data="chartData" />
    </section>
  </div>
</template>

<style scoped lang="scss">
@import 'src/assets/main.scss';
.pie-chart-host {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: $main-box-shadow;
  background-color: $background-white;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;

  .pie-chart-options {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    gap: 10px;
  }

  .pie-chart {
    height: 400px;
  }
}
</style>
