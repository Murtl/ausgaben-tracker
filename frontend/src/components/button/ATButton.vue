<script setup lang="ts">
export interface Props {
  title?: string
  width?: string
  primary?: boolean
  secondary?: boolean
  tertiary?: boolean
}

withDefaults(defineProps<Props>(), {
  title: '',
  width: '187px',
  primary: false,
  secondary: false,
  tertiary: false
})

interface Emits {
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
@import 'src/assets/base.scss';

.at-button-host {
  align-items: center;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  user-select: none;
  font-size: 25px;
  font-weight: 600;
  padding: 8px 14px;
  gap: 4px;
  width: v-bind(width);
  height: 60px;
  margin-bottom: 10px;

  &.primary {
    background-color: $main-blue;
    color: $text-white;
  }

  &.secondary {
    background-color: $button-grey;
    color: $text-blue;
  }

  &.tertiary {
    background-color: $button-white;
    color: $text-red;
  }
}
</style>
