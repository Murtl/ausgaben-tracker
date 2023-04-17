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
@import 'src/assets/main.scss';

.at-sort-banner-host {
  background-color: $background-sort-banner;
  display: flex;
  align-items: center;
  height: 20px;
  font-size: $second-font-size;
  padding: 10px;
  width: 160px;
  border-radius: 5px;

  .title-section {
    margin-left: 10px;
  }
}
</style>
