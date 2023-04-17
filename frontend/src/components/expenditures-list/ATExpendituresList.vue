<script setup lang="ts">
import ATTrashBinIcon from '@/base-components/icons/ATTrashBinIcon.vue'
import ATButton from '@/base-components/button/ATButton.vue'
import ATInput from '@/base-components/input/ATInput.vue'
import ATModal from '@/base-components/modal/ATModal.vue'
import dynamicText from '../../assets/dynamicText.json'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import ATEditItemIcon from '@/base-components/icons/ATEditItemIcon.vue'
import type { ATExpenditure } from '@/utils/types/atExpenditure'
import { checkIfExpenditureIsComplete } from '@/utils/functions/checkIfExpenditureIsComplete'
import { filterExpenditures } from '@/utils/functions/filterExpenditures'

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

const expendituresList: Ref<ATExpenditure[]> = ref(props.data)
const currentExpenditure: Ref<ATExpenditure> = ref({
  id: 0,
  sourceOfExpenditure: '',
  additionalInfo: '',
  amount: 0,
  date: ''
})

const showModalWrongInfo = ref(false)
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

const handleShowModalWrongInfo = () => {
  showModalWrongInfo.value = true
}

const handleCloseModalWrongInfo = () => {
  showModalWrongInfo.value = false
}

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

const handleShowModalEditExpenditure = (
  id: number,
  sourceOfExpenditure: string,
  additionalInfo: string,
  amount: number,
  date: string
) => {
  currentExpenditure.value = {
    id: id,
    sourceOfExpenditure: sourceOfExpenditure,
    additionalInfo: additionalInfo,
    amount: amount,
    date: date
  }
  showModalEditExpenditure.value = true
}

const handleCloseModalEditExpenditureOnDelete = () => {
  handleShowModalDelete()
}

const handleCloseModalEditExpenditureOnSave = () => {
  if (!checkIfExpenditureIsComplete(currentExpenditure.value)) {
    handleShowModalWrongInfo()
    return
  }
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
      <span class="first-column">{{ dynamicText.source_of_expenditure }}</span>
      <span class="second-column">{{ dynamicText.additional_information }}</span>
      <span class="third-column">{{ dynamicText.amount }}</span>
      <span class="fourth-column">{{ dynamicText.date }}</span>
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
        <ATButton
          secondary
          width="40px"
          @press="
            handleShowModalEditExpenditure(
              expenditure.id,
              expenditure.sourceOfExpenditure,
              expenditure.additionalInfo,
              expenditure.amount,
              expenditure.date
            )
          "
        >
          <template #icon>
            <ATEditItemIcon />
          </template>
        </ATButton>
      </span>
    </section>
  </div>
  <ATModal v-if="showModalEditExpenditure" :title="dynamicText.edit_expenditure">
    <template #inputs>
      <ATInput
        :title="dynamicText.source_of_expenditure"
        v-model:value="currentExpenditure.sourceOfExpenditure"
      />
      <ATInput
        :title="dynamicText.additional_information"
        v-model:value="currentExpenditure.additionalInfo"
      />
      <ATInput :title="dynamicText.amount" v-model:value="currentExpenditure.amount" />
      <ATInput :title="dynamicText.date" v-model:value="currentExpenditure.date" type-date />
    </template>
    <template #buttons>
      <ATButton @press="handleCloseModalEditExpenditureOnDelete" tertiary width="50px">
        <template #icon>
          <ATTrashBinIcon />
        </template>
      </ATButton>
      <ATButton
        :title="dynamicText.cancel"
        secondary
        @press="handleCloseModalEditExpenditureOnCancel"
      />
      <ATButton :title="dynamicText.save" primary @press="handleCloseModalEditExpenditureOnSave" />
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
  <ATModal v-if="showModalDelete" :title="dynamicText.really_delete_Expenditure">
    <template #buttons>
      <ATButton
        :title="dynamicText.cancel"
        secondary
        @press="handleCloseModalDeleteOnCancel"
        width="200px"
      />
      <ATButton
        :title="dynamicText.delete"
        primary
        @press="handleCloseModalDeleteOnConfirm"
        width="200px"
        class="delete-button"
      />
    </template>
  </ATModal>
</template>

<style scoped lang="scss">
@import 'src/assets/main.scss';
.at-expenditure-list-host {
  background-color: $background-white;
  width: 1000px;
  min-height: calc(100vh - 120px);

  :deep(.at-button-host) {
    margin: 0;
    height: 30px;
  }

  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row;
    padding: 10px;
    border-bottom: 1px solid $border-table-color;
    font-weight: bold;
    height: 30px;
  }

  .table-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row;
    padding: 10px;
    height: 30px;
    border-bottom: 1px solid $border-table-color;
  }

  .first-column {
    width: 25%;
  }

  .second-column {
    width: 45%;
  }

  .third-column {
    width: 15%;
  }

  .fourth-column {
    width: 15%;
  }

  .fifth-column {
    width: 5%;
  }
}

.delete-button {
  background-color: $background-red !important;
}

.delete-button:hover {
  background-color: $background-red-hover !important;
}
</style>
