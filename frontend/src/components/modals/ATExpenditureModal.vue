<script setup lang="ts">
import ATTrashBinIcon from '@/base-components/icons/ATTrashBinIcon.vue'
import ATModal from '@/base-components/modal/ATModal.vue'
import ATInput from '@/base-components/input/ATInput.vue'
import ATButton from '@/base-components/button/ATButton.vue'
import dynamicText from '@/text/dynamicText.json'
import { computed, onBeforeMount, ref } from 'vue'
import type { Ref } from 'vue'
import { checkIfExpenditureIsComplete } from '@/utils/functions/checkIfExpenditureIsComplete'
import type { ATExpenditure } from '@/utils/types/atExpenditure'

interface Props {
  /**
   * The title of the modal
   */
  title: string

  /**
   * The function to call when the user presses the cancel button
   */
  handleCloseModalOnCancel: () => void

  /**
   * The function to call when the user presses the save button
   */
  handleCloseModalOnSave: (expenditure: ATExpenditure) => void

  /**
   * The passed expenditure
   */
  expenditure?: ATExpenditure

  /**
   * The function to call when the user presses the delete button
   */
  handleCloseModalOnDelete?: (expenditure: ATExpenditure) => void
}

const props = withDefaults(defineProps<Props>(), {
  expenditure: undefined,
  handleCloseModalOnDelete: undefined
})

onBeforeMount(() => {
  if (props.expenditure) {
    expenditure.value = props.expenditure
  } else {
    expenditure.value = {
      id: 0,
      sourceOfExpenditure: '',
      additionalInfo: '',
      amount: 0,
      date: ''
    }
  }
})

const expenditure: Ref<ATExpenditure> = ref({
  id: 0,
  sourceOfExpenditure: '',
  additionalInfo: '',
  amount: 0,
  date: ''
})

const computedDisabledSaveButtonState = computed(() => {
  return !checkIfExpenditureIsComplete(expenditure.value)
})

const validateString = (value: string) => {
  return value !== ''
}

const validateAmount = (value: number) => {
  return value > 0
}
</script>

<template>
  <div class="at-expenditure-modal-host">
    <ATModal :title="title">
      <template #inputs>
        <ATInput
          :title="dynamicText.source_of_expenditure"
          v-model:value="expenditure.sourceOfExpenditure"
          :validate="validateString"
          :invalid-message="dynamicText.incorrect_input_at_expenditure_source"
        />
        <ATInput
          :title="dynamicText.additional_information"
          v-model:value="expenditure.additionalInfo"
        />
        <ATInput
          :title="dynamicText.amount"
          v-model:value="expenditure.amount"
          :placeholder="dynamicText.placeholder_amount"
          :validate="validateAmount"
          :invalid-message="dynamicText.incorrect_input_at_amount"
        />
        <ATInput
          :title="dynamicText.date"
          v-model:value="expenditure.date"
          type-date
          :validate="validateString"
          :invalid-message="dynamicText.incorrect_input_at_date"
        />
      </template>
      <template #buttons>
        <ATButton
          v-if="handleCloseModalOnDelete"
          @press="handleCloseModalOnDelete ? handleCloseModalOnDelete(expenditure) : () => {}"
          tertiary
          width="50px"
        >
          <template #icon>
            <ATTrashBinIcon />
          </template>
        </ATButton>
        <ATButton :title="dynamicText.cancel" secondary @press="handleCloseModalOnCancel" />
        <ATButton
          :title="dynamicText.save"
          primary
          @press="handleCloseModalOnSave(expenditure)"
          :disabled="computedDisabledSaveButtonState"
        />
      </template>
    </ATModal>
  </div>
</template>
