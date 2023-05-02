<script setup lang="ts">
import ATButton from '@/base-components/button/ATButton.vue'
import { useI18nStore } from '@/stores/i18nStore'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import ATEditItemIcon from '@/base-components/icons/ATEditItemIcon.vue'
import type { ATExpenditure } from '@/utils/types/atExpenditure'
import { filterExpenditures } from '@/utils/functions/filterExpenditures'
import ATDeleteModal from '../modals/ATDeleteModal.vue'
import ATExpenditureModal from '../modals/ATExpenditureModal.vue'

export interface Props {
  /**
   * The expenditures to display
   */
  data: ATExpenditure[]

  /**
   * The filter to apply to the expenditures
   */
  filter?: string
}

const props = withDefaults(defineProps<Props>(), {
  filter: ''
})

interface Emits {
  /**
   * Emitted when the user wants to delete an expenditure
   */
  (e: 'delete-expenditure', expenditure: ATExpenditure): void

  /**
   * Emitted when the user wants to update an expenditure
   */
  (e: 'update-expenditure', expenditure: ATExpenditure): void
}

const emit = defineEmits<Emits>()

const i18n = useI18nStore().i18n

const expendituresList: Ref<ATExpenditure[]> = ref(props.data)
const currentExpenditure: Ref<ATExpenditure> = ref({
  id: 0,
  sourceOfExpenditure: '',
  additionalInfo: '',
  amount: 0,
  date: ''
})

const showModalDelete = ref(false)
const showModalEditExpenditure = ref(false)

watch(
  () => props.filter,
  (newFilter) => {
    expendituresList.value = props.data
    expendituresList.value = filterExpenditures(expendituresList.value, newFilter)
  }
)

watch(
  () => props.data,
  (newData) => {
    expendituresList.value = newData
    expendituresList.value = filterExpenditures(expendituresList.value, props.filter)
  },
  { deep: true }
)

const handleShowModalDelete = () => {
  showModalDelete.value = true
}

const handleCloseModalDeleteOnCancel = () => {
  showModalDelete.value = false
}

const handleCloseModalDeleteOnConfirm = () => {
  emit('delete-expenditure', currentExpenditure.value)
  showModalEditExpenditure.value = false
  showModalDelete.value = false
}

const handleShowModalEditExpenditure = (expenditure: ATExpenditure) => {
  currentExpenditure.value = Object.create(expenditure)
  showModalEditExpenditure.value = true
}

const handleCloseModalEditExpenditureOnDelete = () => {
  handleShowModalDelete()
}

const handleCloseModalEditExpenditureOnSave = () => {
  emit('update-expenditure', currentExpenditure.value)
  showModalEditExpenditure.value = false
}

const handleCloseModalEditExpenditureOnCancel = () => {
  showModalEditExpenditure.value = false
}
</script>

<template>
  <div class="at-expenditure-list-host">
    <section class="table-header">
      <span class="first-column">{{ i18n.source_of_expenditure }}</span>
      <span class="second-column">{{ i18n.additional_information }}</span>
      <span class="third-column">{{ i18n.amount }}</span>
      <span class="fourth-column">{{ i18n.date }}</span>
      <span class="fifth-column"></span>
    </section>

    <section
      v-for="expenditure in expendituresList.slice().reverse()"
      :key="expenditure.id"
      class="table-content"
    >
      <span class="first-column">{{ expenditure.sourceOfExpenditure }}</span>
      <span class="second-column">{{ expenditure.additionalInfo }}</span>
      <span class="third-column">{{ `${expenditure.amount} €` }}</span>
      <span class="fourth-column">{{ expenditure.date }}</span>
      <span class="fifth-column">
        <ATButton secondary width="40px" @press="handleShowModalEditExpenditure(expenditure)">
          <template #icon>
            <ATEditItemIcon />
          </template>
        </ATButton>
      </span>
    </section>
  </div>

  <ATExpenditureModal
    v-if="showModalEditExpenditure"
    :title="i18n.edit_expenditure"
    :handle-close-modal-on-cancel="handleCloseModalEditExpenditureOnCancel"
    :handle-close-modal-on-save="handleCloseModalEditExpenditureOnSave"
    :handle-close-modal-on-delete="handleCloseModalEditExpenditureOnDelete"
    :expenditure="currentExpenditure"
  />

  <ATDeleteModal
    v-if="showModalDelete"
    :title="i18n.really_delete_Expenditure"
    :handle-close-modal-delete-on-cancel="handleCloseModalDeleteOnCancel"
    :handle-close-modal-delete-on-confirm="handleCloseModalDeleteOnConfirm"
  />
</template>

<style scoped lang="scss">
@import '@/styles/components/expenditures-list/atExpendituresList.scss';
</style>
