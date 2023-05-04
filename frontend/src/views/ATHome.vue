<script setup lang="ts">
import ATButton from '@/base-components/button/ATButton.vue'
import ATGridBigIcon from '@/base-components/icons/ATGridBigIcon.vue'
import ATEditIcon from '@/base-components/icons/ATEditIcon.vue'
import ATHandshakeIcon from '@/base-components/icons/ATHandshakeIcon.vue'
import { RouterLink, RouterView } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import ATAccountFlyout from '@/components/account-flyout/ATAccountFlyout.vue'
import { useI18nStore } from '@/stores/i18nStore'
import { useUserDataStore } from '@/stores/userDataStore'
import { storeToRefs } from 'pinia'
import { useExpendituresStore } from '@/stores/expendituresStore'
import { useLiquidFundsStore } from '@/stores/liquidFundsStore'
import { getJson } from '@/utils/functions/getJson'
import type { ATExpenditure } from '@/utils/types/atExpenditure'
import type { ATLiquidFund } from '@/utils/types/atLiquidFund'

const i18n = useI18nStore().i18n

const userDataStore = useUserDataStore()
const { userName, userUID } = storeToRefs(userDataStore)

const expendituresStore = useExpendituresStore()
const { allExpenditures } = storeToRefs(expendituresStore)
const liquidFundsStore = useLiquidFundsStore()
const { allLiquidFunds } = storeToRefs(liquidFundsStore)

const loading = ref(true)

onBeforeMount(async () => {
  const expendituresJson: Record<string, ATExpenditure[]> = await getJson('json/expenditures.json')
  allExpenditures.value = expendituresJson[userUID.value] ?? []

  const liquidFundsJson: Record<string, ATLiquidFund[]> = await getJson('json/liquidFunds.json')
  allLiquidFunds.value = liquidFundsJson[userUID.value] ?? []

  loading.value = false
})

const showFlyout = ref(false)

const handleShowFlyout = () => {
  showFlyout.value = !showFlyout.value
}
</script>

<template>
  <header>
    <section class="title">{{ i18n.expenditures_tracker }}</section>
    <section class="nav">
      <nav>
        <RouterLink to="/">
          <ATGridBigIcon />
          {{ i18n.Dashboard }}
        </RouterLink>
        <RouterLink to="/tracker">
          <ATEditIcon />
          {{ i18n.Tracker }}
        </RouterLink>
        <RouterLink to="/balance">
          <ATHandshakeIcon />
          {{ i18n.Balance }}
        </RouterLink>
      </nav>
    </section>
    <section class="avatar">
      <ATButton
        primary
        :title="userName.substring(0, 2).toUpperCase()"
        width="40px"
        @press="handleShowFlyout"
      />
      <ATAccountFlyout v-if="showFlyout" @close="handleShowFlyout" />
    </section>
  </header>

  <main v-if="!loading">
    <RouterView />
  </main>

  <main v-else>
    <div class="loader"></div>
  </main>
</template>

<style scoped lang="scss">
@import '@/styles/views/atHome.scss';
</style>
