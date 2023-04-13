<script setup lang="ts">
import ATButton from '@/components/button/ATButton.vue'
import ATInput from '@/components/input/ATInput.vue'
import ATModal from '@/components/modal/ATModal.vue'
import { ref } from 'vue'
import dynamicText from '../../assets/dynamicText.json'
import ATSearchbar from '@/components/searchbar/ATSearchbar.vue'
import ATPlusIcon from '@/components/icons/ATPlusIcon.vue'
import ATExpendituresList from '@/components/expenditures-list/ATExpendituresList.vue'
import { storeToRefs } from 'pinia'
import { useExpendituresStore } from '@/stores/expendituresStore'
import { ATExpendituresDataService } from '@/services/ATExpendituresDataService'
import type { ATExpenditure } from '@/services/ATExpendituresDataService'
import { useUserDataStore } from '@/stores/userDataStore'

const expendituresStore = useExpendituresStore()
const { allExpenditures } = storeToRefs(expendituresStore)

const userDataStore = useUserDataStore()
const { userUID } = storeToRefs(userDataStore)

const showModalNewExpenditure = ref(false)
const handleShowModalNewExpenditure = () => {
  showModalNewExpenditure.value = true
}

const handleCloseModalOnCancel = () => {
  showModalNewExpenditure.value = false
}

const showModalWrongInfo = ref(false)
const handleShowModalWrongInfo = () => {
  showModalWrongInfo.value = true
}

const handleCloseModalWrongInfo = () => {
  showModalWrongInfo.value = false
}

const newExpenditure = ref({
  id: 0,
  sourceOfExpenditure: '',
  additionalInfo: '',
  amount: 0,
  date: ''
})

const checkIfExpenditureIsComplete = () => {
  if (
    !newExpenditure.value.sourceOfExpenditure ||
    !newExpenditure.value.amount ||
    newExpenditure.value.amount === 0 ||
    !newExpenditure.value.date ||
    newExpenditure.value.amount < 0
  ) {
    return false
  }
  return true
}

const handleCloseModalOnCreation = () => {
  if (!checkIfExpenditureIsComplete()) {
    handleShowModalWrongInfo()
    return
  }
  try {
    newExpenditure.value.id = allExpenditures.value[allExpenditures.value.length - 1].id + 1
  } catch {
    newExpenditure.value.id = 1
  }
  allExpenditures.value.push(newExpenditure.value)
  ATExpendituresDataService.addExpenditure(newExpenditure.value, userUID.value)
  newExpenditure.value = {
    id: 0,
    sourceOfExpenditure: '',
    additionalInfo: '',
    amount: 0,
    date: ''
  }
  showModalNewExpenditure.value = false
}

const handleDeleteExpenditure = (expenditure: ATExpenditure) => {
  allExpenditures.value = allExpenditures.value.filter((a) => a.id !== expenditure.id)
  ATExpendituresDataService.deleteExpenditure(expenditure.id, userUID.value)
}

const handleUpdateExpenditure = (expenditure: ATExpenditure) => {
  allExpenditures.value = allExpenditures.value.map((e) => {
    if (e.id === expenditure.id) {
      return expenditure
    }
    return e
  })
  ATExpendituresDataService.updateExpenditure(expenditure, userUID.value)
}

const searchbarValue = ref('')
const searchChanged = (newFilter: string) => {
  searchbarValue.value = newFilter
}
</script>

<template>
  <div class="at-tracker-host">
    <header>
      <ATSearchbar :placeholder="dynamicText.search_expenditure" @search-changed="searchChanged" />
      <ATButton
        :title="dynamicText.new_expenditure"
        width="175px"
        primary
        @press="handleShowModalNewExpenditure"
      >
        <template #icon>
          <ATPlusIcon />
        </template>
      </ATButton>
    </header>

    <main>
      <ATExpendituresList
        :data="allExpenditures"
        :filter="searchbarValue"
        @delete-expenditure="handleDeleteExpenditure"
        @update-expenditure="handleUpdateExpenditure"
      />
    </main>
  </div>

  <ATModal v-if="showModalNewExpenditure" :title="dynamicText.new_expenditure">
    <template #inputs>
      <ATInput
        :title="dynamicText.source_of_expenditure"
        v-model:value="newExpenditure.sourceOfExpenditure"
      />
      <ATInput
        :title="dynamicText.additional_information"
        v-model:value="newExpenditure.additionalInfo"
      />
      <ATInput
        :title="dynamicText.amount"
        v-model:value="newExpenditure.amount"
        :placeholder="dynamicText.placeholder_amount"
      />
      <ATInput :title="dynamicText.date" v-model:value="newExpenditure.date" type-date />
    </template>
    <template #buttons>
      <ATButton :title="dynamicText.cancel" secondary @press="handleCloseModalOnCancel" />
      <ATButton :title="dynamicText.save" primary @press="handleCloseModalOnCreation" />
    </template>
  </ATModal>

  <ATModal v-if="showModalWrongInfo" :title="dynamicText.incorrect_input">
    <template #inputs>
      <p>{{ dynamicText.incorrect_input_at_expenditure_source }}</p>
      <p>{{ dynamicText.incorrect_input_at_amount }}</p>
      <p>{{ dynamicText.incorrect_input_at_date }}</p>
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
.at-tracker-host {
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

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
