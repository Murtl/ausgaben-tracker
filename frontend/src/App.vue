<script setup lang="ts">
import { useLoggedInStore } from '@/stores/loggedInStore'
import { storeToRefs } from 'pinia'
import ATHome from '@/views/ATHome.vue'
import ATLogin from '@/views/auth/ATLogin.vue'
import { onBeforeMount, ref } from 'vue'
import { getJson } from '@/utils/functions/getJson'
import { useI18nStore } from '@/stores/i18nStore'
import { useAccountsStore } from '@/stores/accountsStore'
import type { ATJsonAccounts } from '@/utils/types/atJsonAccounts'

const i18n = useI18nStore()

const loggedInStore = useLoggedInStore()
const { loggedIn } = storeToRefs(loggedInStore)

const accountStore = useAccountsStore()
const { allAccounts } = storeToRefs(accountStore)

const loading = ref(true)

onBeforeMount(async () => {
  const accounts: ATJsonAccounts = await getJson('json/accounts.json')
  allAccounts.value = accounts.users ?? []
  await i18n.getI18n()
  loading.value = false
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
