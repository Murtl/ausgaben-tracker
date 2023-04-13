<script setup lang="ts">
export interface Props {
  title: string
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
@import 'src/assets/main.scss';

.at-segment-host {
  display: flex;
  flex-flow: column;
  margin-bottom: 10px;

  .title-section {
    padding: 10px 5px;
    font-weight: bold;
  }
}
</style>
