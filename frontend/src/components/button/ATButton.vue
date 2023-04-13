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
  width: '150px',
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
@import 'src/assets/main.scss';

.at-button-host {
  align-items: center;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: $second-font-size;
  font-weight: 5500;
  padding: 8px 14px;
  gap: 4px;
  width: v-bind(width);
  height: 40px;
  margin-bottom: 10px;
  background-color: $button-white;

  &.primary {
    background-color: $main-blue;
    color: $text-white;
  }

  &.secondary {
    background-color: $button-gray;
    color: $text-blue;
  }

  &.tertiary {
    background-color: $button-modal-gray;
    color: $heading-text-light;
  }
}

.at-button-host:hover {
  background-color: $button-white-hover;
  &.primary {
    background-color: $main-blue-hover;
  }

  &.secondary {
    background-color: $button-gray-hover;
  }

  &.tertiary {
    background-color: $button-modal-gray-hover;
  }
}
</style>
