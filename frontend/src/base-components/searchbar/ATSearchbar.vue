<script setup lang="ts">
import { ref, watch } from 'vue'
import ATSearchbarIcon from '../icons/ATSearchbarIcon.vue'

export interface Props {
  /**
   * The placeholder of the input
   */
  placeholder: string
}

defineProps<Props>()

interface Emits {
  /**
   * Emitted when the searchbar input value changes
   */
  (e: 'search-changed', newValue: string): void
}

const emit = defineEmits<Emits>()

const inputValue = ref('')

watch(inputValue, (newValue) => {
  emit('search-changed', newValue)
})
</script>

<template>
  <div class="at-searchbar-host">
    <ATSearchbarIcon class="searchbar-icon" />
    <input class="native-input-element" :placeholder="placeholder" v-model="inputValue" />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/base-components/searchbar/atSearchbar.scss';
</style>
