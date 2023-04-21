<script setup lang="ts">
export interface Props {
  /**
   * The title of the segment
   */
  title: string

  /**
   * The year of the segment
   */
  year: number
}

defineProps<Props>()
</script>

<template>
  <div class="at-segment-host">
    <section class="title-section">{{ title }} {{ year }}</section>
    <section class="slot-section">
      <slot></slot>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/base-components/segment/atSegment.scss';
</style>
