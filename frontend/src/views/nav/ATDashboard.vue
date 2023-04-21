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
@import '@/styles/views/nav/atDashboard.scss';
</style>
