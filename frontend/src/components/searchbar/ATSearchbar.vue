<script setup lang="ts">
import { ref, watch } from 'vue'
import ATSearchbarIcon from '@/components/icons/ATSearchbarIcon.vue'

export interface Props {
  placeholder: string
}

defineProps<Props>()

interface Emits {
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
@import 'src/assets/main.scss';
.at-searchbar-host {
  display: flex;
  align-items: center;
  background-color: $background-white;
  border-radius: 5px;

  .searchbar-icon {
    margin-left: 10px;
    margin-right: 5px;
  }
  .native-input-element {
    border: none;
    height: 38px;
    width: 400px;
    border-radius: 5px;
    font-size: $second-font-size;
  }

  .native-input-element:focus {
    outline: none;
  }
}
</style>
