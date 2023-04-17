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
@import 'src/assets/main.scss';

.at-drop-down-host {
  background-color: $main-blue;
  display: flex;
  align-items: center;
  height: 20px;
  font-size: $second-font-size;
  width: fit-content;
  border-radius: 5px;
  padding: 10px;

  .drop-down {
    cursor: pointer;
    border: none;
    font-size: $second-font-size;
    color: $text-white;
    background-color: $main-blue;
    height: 40px;
  }

  .drop-down:focus {
    outline: none;
  }
}
</style>
