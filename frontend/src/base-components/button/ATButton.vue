<script setup lang="ts">
export interface Props {
  /**
   * The title of the button
   */
  title?: string

  /**
   * The width of the button
   */
  width?: string

  /**
   * Whether the button is primary
   */
  primary?: boolean

  /**
   * Whether the button is secondary
   */
  secondary?: boolean

  /**
   * Whether the button is tertiary
   */
  tertiary?: boolean
}

withDefaults(defineProps<Props>(), {
  title: '',
  width: '150px',
  primary: false,
  secondary: false,
  tertiary: false
})

interface Emits {
  /**
   * Emitted when the button is pressed
   */
  (e: 'press'): void
}

const emit = defineEmits<Emits>()
</script>

<template>
  <button
    :class="{
      primary,
      secondary,
      tertiary
    }"
    class="at-button-host"
    @click="emit('press')"
  >
    <slot name="icon"></slot>
    {{ title }}
  </button>
</template>

<style scoped lang="scss">
@import '@/styles/base-components/button/atButton.scss';

.at-button-host {
  width: v-bind(width);
}
</style>
