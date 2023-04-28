<script setup lang="ts">
import ATButton from '@/base-components/button/ATButton.vue'
import { ref } from 'vue'
import dynamicText from '@/text/dynamicText.json'
import ATSearchbar from '@/base-components/searchbar/ATSearchbar.vue'
import ATPlusIcon from '@/base-components/icons/ATPlusIcon.vue'
import { useLiquidFundsStore } from '@/stores/liquidFundsStore'
import { storeToRefs } from 'pinia'
import type { ATLiquidFund } from '@/utils/types/atLiquidFund'
import ATLiquidFundsList from '@/components/liquid-funds-list/ATLiquidFundsList.vue'
import { getHighestIdOfLiquidFunds } from '@/utils/functions/getHighestIdOfLiquidFunds'
import ATLiquidFundModal from '@/components/modals/ATLiquidFundModal.vue'

const liquidFundsStore = useLiquidFundsStore()
const { allLiquidFunds } = storeToRefs(liquidFundsStore)

const searchbarValue = ref('')
const showModalNewLiquidFund = ref(false)

const handleShowModalNewLiquidFund = () => {
  showModalNewLiquidFund.value = true
}

const handleCloseModalNewLiquidFundOnCancel = () => {
  showModalNewLiquidFund.value = false
}

const handleCloseModalNewLiquidFundOnCreation = (newLiquidFund: ATLiquidFund) => {
  let wasThere = false
  allLiquidFunds.value.forEach((liquidFund) => {
    if (newLiquidFund.month === liquidFund.month && newLiquidFund.year === liquidFund.year) {
      liquidFund.height += newLiquidFund.height
      liquidFundsStore.updateLiquidFund(liquidFund)
      wasThere = true
    }
  })
  if (!wasThere) {
    try {
      newLiquidFund.id = getHighestIdOfLiquidFunds(allLiquidFunds.value) + 1
    } catch {
      newLiquidFund.id = 1
    }
    liquidFundsStore.addLiquidFund(newLiquidFund)
  }
  showModalNewLiquidFund.value = false
}

const handleDeleteLiquidFund = (liquidFund: ATLiquidFund) => {
  liquidFundsStore.deleteLiquidFund(liquidFund.id)
}

const handleUpdateLiquidFund = (liquidFund: ATLiquidFund) => {
  liquidFundsStore.updateLiquidFund(liquidFund)
}

const searchChanged = (newFilter: string) => {
  searchbarValue.value = newFilter
}
</script>

<template>
  <div class="at-balance-host">
    <header>
      <ATSearchbar :placeholder="dynamicText.search_month_year" @search-changed="searchChanged" />
      <ATButton
        :title="dynamicText.add_liquid_fund"
        width="261px"
        primary
        @press="handleShowModalNewLiquidFund"
      >
        <template #icon>
          <ATPlusIcon />
        </template>
      </ATButton>
    </header>
    <main>
      <ATLiquidFundsList
        :data="allLiquidFunds"
        :filter="searchbarValue"
        @delete-liquid-fund="handleDeleteLiquidFund"
        @update-liquid-fund="handleUpdateLiquidFund"
      />
    </main>
  </div>

  <ATLiquidFundModal
    v-if="showModalNewLiquidFund"
    :title="dynamicText.add_liquid_fund"
    :handle-close-modal-on-cancel="handleCloseModalNewLiquidFundOnCancel"
    :handle-close-modal-on-save="handleCloseModalNewLiquidFundOnCreation"
  />
</template>

<style scoped lang="scss">
@import '@/styles/views/nav/atBalance.scss';
</style>
