<script setup lang="ts">
import ATButton from '@/base-components/button/ATButton.vue'
import ATGridBigIcon from '@/base-components/icons/ATGridBigIcon.vue'
import ATEditIcon from '@/base-components/icons/ATEditIcon.vue'
import ATHandshakeIcon from '@/base-components/icons/ATHandshakeIcon.vue'
import { RouterLink, RouterView } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import ATAccountFlyout from '@/components/account-flyout/ATAccountFlyout.vue'
import dynamicText from '../assets/dynamicText.json'
import { storeToRefs } from 'pinia'
import { ATExpendituresDataService } from '@/services/ATExpendituresDataService'
import { useExpendituresStore } from '@/stores/expendituresStore'
import { useUserDataStore } from '@/stores/userDataStore'
import { useLiquidFundsStore } from '@/stores/liquidFundsStore'
import { ATLiquidFundsDataService } from '@/services/ATLiquidFundsDataService'

const expendituresStore = useExpendituresStore()
const { allExpenditures } = storeToRefs(expendituresStore)

const liquidFundsStore = useLiquidFundsStore()
const { allLiquidFunds } = storeToRefs(liquidFundsStore)

const userDataStore = useUserDataStore()
const { userUID } = storeToRefs(userDataStore)

const showFlyout = ref(false)

onBeforeMount(() => {
  allExpenditures.value = ATExpendituresDataService.getExpenditures(userUID.value)
  allLiquidFunds.value = ATLiquidFundsDataService.getLiquidFunds(userUID.value)
})

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
      <ATButton primary title="MM" width="40px" @press="handleShowFlyout" />
      <ATAccountFlyout v-if="showFlyout" @close="handleShowFlyout" />
    </section>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
@import 'src/assets/main.scss';

header {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  background-color: $background-white;

  .title {
    font-size: $main-font-size;
    margin-top: 15px;
    margin-left: 10px;
    color: $heading-text-light;
  }

  .nav {
    display: flex;
    align-items: center;
    font-size: 17px;

    a {
      padding: 5px 20px 5px 5px;
      text-decoration: none;
      color: $heading-text-light;

      &.router-link-exact-active {
        color: $main-blue;
        background-color: $nav-hover;
      }
    }

    a:hover {
      background-color: $nav-hover;
    }
  }

  .avatar {
    width: 215px;
    display: flex;
    justify-content: flex-end;

    :deep(.at-button-host) {
      border-radius: 50px;
      margin: 5px 10px 5px 5px;
      font-size: $second-font-size;
    }
  }
}
</style>
