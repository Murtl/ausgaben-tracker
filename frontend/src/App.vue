<script setup lang="ts">
import { useLoggedInStore } from '@/stores/loggedInStore'
import { storeToRefs } from 'pinia'
import ATHome from '@/views/ATHome.vue'
import ATLogin from '@/views/auth/ATLogin.vue'
import { onBeforeMount, onUnmounted, ref } from 'vue'
import { useAccountsStore } from '@/stores/accountsStore'
import { useI18nStore } from '@/stores/i18nStore'

const i18nStore = useI18nStore()

const loggedInStore = useLoggedInStore()
const { loggedIn } = storeToRefs(loggedInStore)

const accountStore = useAccountsStore()

const loading = ref(true)

onBeforeMount(async () => {
  window.addEventListener('languagechange', i18nStore.getI18n)
  await accountStore.fetchAccounts()
  loading.value = false
})

onUnmounted(() => {
  window.removeEventListener('languagechange', i18nStore.getI18n)
})
</script>

<template>
  <div v-if="!loading">
    <ATLogin v-if="!loggedIn" />
    <ATHome v-else />
  </div>
  <div v-else class="loader"></div>
</template>

<style lang="scss">
@import '@/styles/app.scss';
</style>
