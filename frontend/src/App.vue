<script setup lang="ts">
import { useLoggedInStore } from './stores/loggedInStore'
import { storeToRefs } from 'pinia'
import ATHome from './views/ATHome.vue'
import ATLogin from './views/auth/ATLogin.vue'

const loggedInStore = useLoggedInStore()
const { loggedIn } = storeToRefs(loggedInStore)
</script>

<template>
  <ATLogin v-if="!loggedIn" />
  <ATHome v-else />
</template>
