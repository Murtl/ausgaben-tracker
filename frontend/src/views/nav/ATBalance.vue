<script setup lang="ts">
import ATButton from '@/components/button/ATButton.vue'
import { useLoggedInStore } from '../../stores/loggedInStore'
import { storeToRefs } from 'pinia'

const loggedInStore = useLoggedInStore()
const { loggedIn } = storeToRefs(loggedInStore)

const handlePress = () => {
  loggedIn.value = false
}
</script>

<template>
  <div class="at-balance-host">
    <ATButton title="Logout Balance" primary @press="handlePress" />
  </div>
</template>
