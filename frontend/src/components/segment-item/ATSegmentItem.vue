<script setup lang="ts">
import ATEditItemIconVue from '../icons/ATEditItemIcon.vue'
import ATButton from '../button/ATButton.vue'
import ATInput from '@/components/input/ATInput.vue'
import ATModal from '@/components/modal/ATModal.vue'
import { onBeforeMount, ref, watch } from 'vue'
import ATTrashBinIcon from '@/components/icons/ATTrashBinIcon.vue'
import dynamicText from '../../assets/dynamicText.json'
import type { ATLiquidFund } from '@/services/ATLiquidFundsDataService'

export interface Props {
  title: string
  value: string
  editable?: boolean
  liquidFund?: ATLiquidFund
}

const props = withDefaults(defineProps<Props>(), {
  editable: false,
  liquidFund: undefined
})

interface Emits {
  (e: 'delete-liquid-fund', liquidFund: ATLiquidFund): void
  (e: 'update-liquid-fund', liquidFund: ATLiquidFund): void
}

const emit = defineEmits<Emits>()

onBeforeMount(() => {
  if (props.liquidFund) {
    currentLiquidFund.value = {
      id: props.liquidFund.id,
      height: props.liquidFund.height,
      month: props.liquidFund.month,
      year: props.liquidFund.year
    }
  }
})

watch(
  () => props.liquidFund,
  (newValue) => {
    if (newValue) {
      currentLiquidFund.value = {
        id: newValue.id,
        height: newValue.height,
        month: newValue.month,
        year: newValue.year
      }
    }
  },
  { deep: true }
)

const currentLiquidFund = ref({
  id: 0,
  height: 0,
  month: 0,
  year: 0
})

const showModalWrongInfo = ref(false)
const handleShowModalWrongInfo = () => {
  showModalWrongInfo.value = true
}

const handleCloseModalWrongInfo = () => {
  showModalWrongInfo.value = false
}

const checkIfLiquidFundIsComplete = () => {
  if (
    currentLiquidFund.value.height === 0 ||
    !currentLiquidFund.value.height ||
    currentLiquidFund.value.month === 0 ||
    !currentLiquidFund.value.month ||
    currentLiquidFund.value.year === 0 ||
    !currentLiquidFund.value.year ||
    currentLiquidFund.value.month > 12 ||
    currentLiquidFund.value.month < 1 ||
    currentLiquidFund.value.year < 1900 ||
    currentLiquidFund.value.year > 2100 ||
    currentLiquidFund.value.height < 0
  ) {
    return false
  }
  return true
}

const showModalDelete = ref(false)
const handleShowModalDelete = () => {
  showModalDelete.value = true
}

const handleCloseModalDeleteOnCancel = () => {
  showModalDelete.value = false
}

const handleCloseModalDeleteOnConfirm = () => {
  emit('delete-liquid-fund', currentLiquidFund.value)
  showModalDelete.value = false
  showModalEditLiquidFund.value = false
}

const showModalEditLiquidFund = ref(false)
const handleShowModalEditLiquidFund = () => {
  showModalEditLiquidFund.value = true
}

const handleCloseModalEditLiquidFundOnSave = () => {
  if (!checkIfLiquidFundIsComplete()) {
    handleShowModalWrongInfo()
    return
  }
  emit('update-liquid-fund', currentLiquidFund.value)
  showModalEditLiquidFund.value = false
}

const handleCloseModalEditLiquidFundOnCancel = () => {
  showModalEditLiquidFund.value = false
}

const handleCloseModalEditLiquidFundOnDelete = () => {
  handleShowModalDelete()
}
</script>

<template>
  <div class="at-segment-item-host">
    <section class="first-section">
      {{ title }}
    </section>
    <section class="second-section">
      {{ value }}
    </section>
    <section class="third-section">
      <ATButton v-if="editable" @press="handleShowModalEditLiquidFund" width="40px" secondary>
        <template #icon>
          <ATEditItemIconVue />
        </template>
      </ATButton>
    </section>
  </div>
  <ATModal v-if="showModalEditLiquidFund" :title="dynamicText.edit_liquid_fund">
    <template #inputs>
      <ATInput :title="dynamicText.height" v-model:value="currentLiquidFund.height" />
      <ATInput :title="dynamicText.month" v-model:value="currentLiquidFund.month" type-month />
      <ATInput :title="dynamicText.year" v-model:value="currentLiquidFund.year" type-year />
    </template>
    <template #buttons>
      <ATButton @press="handleCloseModalEditLiquidFundOnDelete" tertiary width="50px">
        <template #icon>
          <ATTrashBinIcon />
        </template>
      </ATButton>
      <ATButton
        :title="dynamicText.cancel"
        secondary
        @press="handleCloseModalEditLiquidFundOnCancel"
      />
      <ATButton :title="dynamicText.save" primary @press="handleCloseModalEditLiquidFundOnSave" />
    </template>
  </ATModal>
  <ATModal v-if="showModalWrongInfo" :title="dynamicText.incorrect_input">
    <template #inputs>
      <p>{{ dynamicText.incorrect_input_at_height }}</p>
      <p>{{ dynamicText.incorrect_input_at_month }}</p>
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
  <ATModal v-if="showModalDelete" :title="dynamicText.really_delete_liquid_fund">
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

.at-segment-item-host {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: $main-box-shadow;
  background-color: $background-white;
  border-radius: 5px;
  padding: 10px;
  font-size: $second-font-size;
  width: 700px;
  margin: 5px;
  height: 30px;

  .first-section {
    width: 70%;
  }

  .second-section {
    width: 20%;
  }

  .third-section {
    width: 10%;

    :deep(.at-button-host) {
      margin: 0;
      height: 30px;
    }
  }
}

.delete-button {
  background-color: $background-red !important;
}

.delete-button:hover {
  background-color: $background-red-hover !important;
}
</style>
