<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

export interface Props {
  /**
   * The options to display
   */
  options: string[] | number[]
}

defineProps<Props>()

interface Emit {
  /**
   * Emitted when the user selects an option
   */
  (event: 'change', value: string): void
}

const emit = defineEmits<Emit>()

const selectRef = ref<HTMLSelectElement>()

onMounted(() => {
  if (selectRef.value) {
    selectRef.value.addEventListener('change', handleOptionChange)
  }
})

onBeforeUnmount(() => {
  if (selectRef.value) {
    selectRef.value.removeEventListener('change', handleOptionChange)
  }
})

const handleOptionChange = (event: Event) => {
  emit('change', (event.target as HTMLSelectElement).value)
}
</script>

<template>
  <div class="at-drop-down-host">
    <select class="drop-down" ref="selectRef">
      <option v-for="sortOption in options" :key="sortOption" :value="sortOption">
        {{ sortOption }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/base-components/drop-down/atDropDown.scss';
</style>
