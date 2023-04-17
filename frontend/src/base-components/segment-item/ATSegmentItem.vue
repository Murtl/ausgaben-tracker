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
@import 'src/assets/main.scss';

.at-segment-item-host {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: $main-box-shadow;
  background-color: $background-white;
  border-radius: 5px;
  padding: 10px;
  font-size: $second-font-size;
  width: 700px;
  margin: 5px;
  height: 30px;

  .first-section {
    width: 70%;
  }

  .second-section {
    width: 20%;
  }

  .third-section {
    width: 10%;

    :deep(.at-button-host) {
      margin: 0;
      height: 30px;
    }
  }
}
</style>
