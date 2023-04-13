<script setup lang="ts">
import ATBarChart from '@/components/diagrams/ATBarChart.vue'
import ATPieChart from '@/components/diagrams/ATPieChart.vue'
</script>

<template>
  <div class="at-dashboard-host">
    <section class="bar-chart">
      <ATBarChart />
    </section>

    <section class="pie-chart">
      <ATPieChart class="pie-chart-a" />
      <ATPieChart class="pie-chart-b" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.at-dashboard-host {
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;

  .bar-chart {
    margin-top: 30px;
    width: 80%;
  }
  .pie-chart {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    gap: 20px;
    width: 80%;

    .pie-chart-a,
    .pie-chart-b {
      width: 40%;
    }
  }
}
</style>
