<script setup lang="ts">
import ATTrashBinIcon from '@/base-components/icons/ATTrashBinIcon.vue'
import ATModal from '@/base-components/modal/ATModal.vue'
import ATInput from '@/base-components/input/ATInput.vue'
import ATButton from '@/base-components/button/ATButton.vue'
import { useI18nStore } from '@/stores/i18nStore'
import { computed, onBeforeMount, ref } from 'vue'
import type { Ref } from 'vue'
import type { ATLiquidFund } from '@/utils/types/atLiquidFund'
import { checkIfLiquidFundIsComplete } from '@/utils/functions/checkIfLiquidFundIsComplete'

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
  handleCloseModalOnSave: (liquidFund: ATLiquidFund) => void

  /**
   * The passed liquid fund
   */
  propLiquidFund?: ATLiquidFund

  /**
   * The function to call when the user presses the delete button
   */
  handleCloseModalOnDelete?: (liquidFund: ATLiquidFund) => void
}

const props = withDefaults(defineProps<Props>(), {
  liquidFund: undefined,
  handleCloseModalOnDelete: undefined
})

const i18n = useI18nStore().i18n

onBeforeMount(() => {
  if (props.propLiquidFund) {
    liquidFund.value = props.propLiquidFund
  } else {
    liquidFund.value = {
      id: 0,
      height: 0,
      month: 0,
      year: 0
    }
  }
})

const liquidFund: Ref<ATLiquidFund> = ref({
  id: 0,
  height: 0,
  month: 0,
  year: 0
})

const computedDisabledSaveButtonState = computed(() => {
  return !checkIfLiquidFundIsComplete(liquidFund.value)
})

const validateHeight = (height: number) => {
  return height > 0
}

const validateMonth = (month: number) => {
  return month > 0 && month < 13
}

const validateYear = (year: number) => {
  return year > 1900 && year < 2100
}
</script>

<template>
  <div class="at-liquid-fund-modal-host">
    <ATModal :title="title">
      <template #inputs>
        <ATInput
          :title="i18n.height"
          :placeholder="i18n.placeholder_amount"
          v-model:value="liquidFund.height"
          :validate="validateHeight"
          :invalid-message="i18n.incorrect_input_at_height"
        />
        <ATInput
          :title="i18n.month"
          :placeholder="i18n.placeholder_month"
          v-model:value="liquidFund.month"
          type-month
          :validate="validateMonth"
          :invalid-message="i18n.incorrect_input_at_month"
        />
        <ATInput
          :title="i18n.year"
          :placeholder="i18n.placeholder_year"
          v-model:value="liquidFund.year"
          type-year
          :validate="validateYear"
          :invalid-message="i18n.incorrect_input_at_year"
        />
      </template>
      <template #buttons>
        <ATButton
          v-if="handleCloseModalOnDelete"
          @press="handleCloseModalOnDelete ? handleCloseModalOnDelete(liquidFund) : () => {}"
          tertiary
          width="50px"
        >
          <template #icon>
            <ATTrashBinIcon />
          </template>
        </ATButton>
        <ATButton :title="i18n.cancel" secondary @press="handleCloseModalOnCancel" />
        <ATButton
          :title="i18n.save"
          primary
          @press="handleCloseModalOnSave(liquidFund)"
          :disabled="computedDisabledSaveButtonState"
        />
      </template>
    </ATModal>
  </div>
</template>
