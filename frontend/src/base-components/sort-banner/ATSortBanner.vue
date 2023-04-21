<script setup lang="ts">
import ATFilterIcon from '../icons/ATFilterIcon.vue'

export interface Props {
  /**
   * The title of the sort banner
   */
  title: string
}

defineProps<Props>()
</script>

<template>
  <div class="at-sort-banner-host">
    <ATFilterIcon />
    <span class="title-section">{{ title }}</span>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/base-components/sort-banner/atSortBanner.scss';
</style>
