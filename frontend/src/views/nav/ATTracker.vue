<script setup lang="ts">
import ATButton from '@/base-components/button/ATButton.vue'
import { ref } from 'vue'
import { useI18nStore } from '@/stores/i18nStore'
import ATSearchbar from '@/base-components/searchbar/ATSearchbar.vue'
import ATPlusIcon from '@/base-components/icons/ATPlusIcon.vue'
import ATExpendituresList from '@/components/expenditures-list/ATExpendituresList.vue'
import { useExpendituresStore } from '@/stores/expendituresStore'
import type { ATExpenditure } from '@/utils/types/atExpenditure'
import { storeToRefs } from 'pinia'
import ATExpenditureModal from '@/components/modals/ATExpenditureModal.vue'

const i18n = useI18nStore().i18n

const expendituresStore = useExpendituresStore()
const { allExpenditures } = storeToRefs(expendituresStore)

const searchbarValue = ref('')
const showModalNewExpenditure = ref(false)

const handleShowModalNewExpenditure = () => {
  showModalNewExpenditure.value = true
}

const handleCloseModalNewExpenditureOnCancel = () => {
  showModalNewExpenditure.value = false
}

const handleCloseModalNewExpenditureOnCreation = (newExpenditure: ATExpenditure) => {
  try {
    newExpenditure.id = allExpenditures.value[allExpenditures.value.length - 1].id + 1
  } catch {
    newExpenditure.id = 1
  }
  expendituresStore.addExpenditure(newExpenditure)
  showModalNewExpenditure.value = false
}

const handleDeleteExpenditure = (expenditure: ATExpenditure) => {
  expendituresStore.deleteExpenditure(expenditure.id)
}

const handleUpdateExpenditure = (expenditure: ATExpenditure) => {
  expendituresStore.updateExpenditure(expenditure)
}

const searchChanged = (newFilter: string) => {
  searchbarValue.value = newFilter
}
</script>

<template>
  <div class="at-tracker-host">
    <header>
      <ATSearchbar :placeholder="i18n.search_expenditure" @search-changed="searchChanged" />
      <ATButton
        :title="i18n.new_expenditure"
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

  <ATExpenditureModal
    v-if="showModalNewExpenditure"
    :title="i18n.new_expenditure"
    :handle-close-modal-on-cancel="handleCloseModalNewExpenditureOnCancel"
    :handle-close-modal-on-save="handleCloseModalNewExpenditureOnCreation"
  />
</template>

<style scoped lang="scss">
@import '@/styles/views/nav/atTracker.scss';
</style>
