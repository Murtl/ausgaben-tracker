<script setup lang="ts">
import ATButton from '@/base-components/button/ATButton.vue'
import ATInput from '@/base-components/input/ATInput.vue'
import ATModal from '@/base-components/modal/ATModal.vue'
import { ref } from 'vue'
import type { Ref } from 'vue'
import dynamicText from '../../assets/dynamicText.json'
import ATSearchbar from '@/base-components/searchbar/ATSearchbar.vue'
import ATPlusIcon from '@/base-components/icons/ATPlusIcon.vue'
import { useLiquidFundsStore } from '@/stores/liquidFundsStore'
import { storeToRefs } from 'pinia'
import { ATLiquidFundsDataService } from '@/services/ATLiquidFundsDataService'
import type { ATLiquidFund } from '@/utils/types/atLiquidFund'
import { useUserDataStore } from '@/stores/userDataStore'
import ATLiquidFundsList from '@/components/liquid-funds-list/ATLiquidFundsList.vue'
import { getHighestIdOfLiquidFunds } from '@/utils/functions/getHighestIdOfLiquidFunds'
import { checkIfLiquidFundIsComplete } from '@/utils/functions/checkIfLiquidFundIsComplete'

const userDataStore = useUserDataStore()
const { userUID } = storeToRefs(userDataStore)

const liquidFundsStore = useLiquidFundsStore()
const { allLiquidFunds } = storeToRefs(liquidFundsStore)

const searchbarValue = ref('')
const newLiquidFund: Ref<ATLiquidFund> = ref({
  id: 0,
  height: 0,
  month: 0,
  year: 0
})
const showModalWrongInfo = ref(false)
const showModalNewLiquidFund = ref(false)

const handleShowModalNewLiquidFund = () => {
  showModalNewLiquidFund.value = true
}

const handleCloseModalNewLiquidFundOnCancel = () => {
  showModalNewLiquidFund.value = false
}

const handleShowModalWrongInfo = () => {
  showModalWrongInfo.value = true
}

const handleCloseModalWrongInfo = () => {
  showModalWrongInfo.value = false
}

const handleCloseModalNewLiquidFundOnCreation = () => {
  if (!checkIfLiquidFundIsComplete(newLiquidFund.value)) {
    handleShowModalWrongInfo()
    return
  }
  let wasThere = false
  allLiquidFunds.value.forEach((liquidFund) => {
    if (
      newLiquidFund.value.month === liquidFund.month &&
      newLiquidFund.value.year === liquidFund.year
    ) {
      liquidFund.height += newLiquidFund.value.height
      newLiquidFund.value.id = liquidFund.id
      newLiquidFund.value.height = liquidFund.height
      ATLiquidFundsDataService.updateLiquidFund(newLiquidFund.value, userUID.value)
      wasThere = true
    }
  })
  if (!wasThere) {
    try {
      newLiquidFund.value.id = getHighestIdOfLiquidFunds(allLiquidFunds.value) + 1
    } catch {
      newLiquidFund.value.id = 1
    }
    allLiquidFunds.value.push(newLiquidFund.value)
    ATLiquidFundsDataService.addLiquidFund(newLiquidFund.value, userUID.value)
  }
  newLiquidFund.value = {
    id: 0,
    height: 0,
    month: 0,
    year: 0
  }
  showModalNewLiquidFund.value = false
}

const handleDeleteLiquidFund = (liquidFund: ATLiquidFund) => {
  allLiquidFunds.value = allLiquidFunds.value.filter((fm) => fm.id !== liquidFund.id)
  ATLiquidFundsDataService.deleteLiquidFund(liquidFund.id, userUID.value)
}

const handleUpdateLiquidFund = (liquidFund: ATLiquidFund) => {
  allLiquidFunds.value = allLiquidFunds.value.map((lf) => {
    if (lf.id === liquidFund.id) {
      return liquidFund
    }
    return lf
  })
  ATLiquidFundsDataService.updateLiquidFund(liquidFund, userUID.value)
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

  <ATModal v-if="showModalNewLiquidFund" :title="dynamicText.add_liquid_fund">
    <template #inputs>
      <ATInput
        :title="dynamicText.height"
        :placeholder="dynamicText.placeholder_amount"
        v-model:value="newLiquidFund.height"
      />
      <ATInput
        :title="dynamicText.month"
        :placeholder="dynamicText.placeholder_month"
        v-model:value="newLiquidFund.month"
        type-month
      />
      <ATInput
        :title="dynamicText.year"
        :placeholder="dynamicText.placeholder_year"
        v-model:value="newLiquidFund.year"
        type-year
      />
    </template>
    <template #buttons>
      <ATButton
        :title="dynamicText.cancel"
        secondary
        @press="handleCloseModalNewLiquidFundOnCancel"
      />
      <ATButton
        :title="dynamicText.save"
        primary
        @press="handleCloseModalNewLiquidFundOnCreation"
      />
    </template>
  </ATModal>

  <ATModal v-if="showModalWrongInfo" :title="dynamicText.incorrect_input">
    <template #inputs>
      <p>{{ dynamicText.incorrect_input_at_height }}</p>
      <p>{{ dynamicText.incorrect_input_at_month }}</p>
      <p>{{ dynamicText.incorrect_input_at_year }}</p>
    </template>
    <template #buttons>
      <ATButton
        :title="dynamicText.try_again"
        primary
        @press="handleCloseModalWrongInfo"
        width="200px"
      />
    </template>
  </ATModal>
</template>

<style scoped lang="scss">
@import 'src/assets/main.scss';

.at-balance-host {
  header {
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $background-searchbar-color;
    gap: 10px;

    :deep(.at-button-host) {
      margin-bottom: 0;
    }
  }
}
</style>
