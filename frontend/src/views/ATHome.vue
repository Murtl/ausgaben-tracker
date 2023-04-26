<script setup lang="ts">
import ATButton from '@/base-components/button/ATButton.vue'
import ATGridBigIcon from '@/base-components/icons/ATGridBigIcon.vue'
import ATEditIcon from '@/base-components/icons/ATEditIcon.vue'
import ATHandshakeIcon from '@/base-components/icons/ATHandshakeIcon.vue'
import { RouterLink, RouterView } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import ATAccountFlyout from '@/components/account-flyout/ATAccountFlyout.vue'
import dynamicText from '@/text/dynamicText.json'
import { useUserDataStore } from '@/stores/userDataStore'
import { storeToRefs } from 'pinia'
import { useExpendituresStore } from '@/stores/expendituresStore'
import { useLiquidFundsStore } from '@/stores/liquidFundsStore'

const userDataStore = useUserDataStore()
const { userName } = storeToRefs(userDataStore)

const expendituresStore = useExpendituresStore()
const liquidFundsStore = useLiquidFundsStore()

onBeforeMount(() => {
  expendituresStore.initExpenditures()
  liquidFundsStore.initLiquidFunds()
})

const showFlyout = ref(false)

const handleShowFlyout = () => {
  showFlyout.value = !showFlyout.value
}
</script>

<template>
  <header>
    <section class="title">{{ dynamicText.expenditures_tracker }}</section>
    <section class="nav">
      <nav>
        <RouterLink to="/">
          <ATGridBigIcon />
          {{ dynamicText.Dashboard }}
        </RouterLink>
        <RouterLink to="/tracker">
          <ATEditIcon />
          {{ dynamicText.Tracker }}
        </RouterLink>
        <RouterLink to="/balance">
          <ATHandshakeIcon />
          {{ dynamicText.Balance }}
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

  <main>
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
@import '@/styles/views/atHome.scss';
</style>
