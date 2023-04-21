<script setup lang="ts">
export interface Props {
  /**
   * The title of the segment item
   */
  title: string

  /**
   * The value of the segment item
   */
  value: string

  /**
   * Whether the segment item is editable
   */
  editable?: boolean
}

withDefaults(defineProps<Props>(), {
  editable: false
})
</script>

<template>
  <div class="at-segment-item-host">
    <section class="first-section">
      {{ title }}
    </section>
    <section class="second-section">
      {{ value }}
    </section>
    <section class="third-section">
      <slot name="button" v-if="editable"> </slot>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/base-components/segment-item/atSegmentItem.scss';
</style>
