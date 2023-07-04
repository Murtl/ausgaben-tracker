<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ATLiquidFund } from '@/utils/types/atLiquidFund'
import type { Ref } from 'vue'
import { useI18nStore } from '@/stores/i18nStore'
import { storeToRefs } from 'pinia'
import { useExpendituresStore } from '@/stores/expendituresStore'
import ATSegmentItem from '@/base-components/segment-item/ATSegmentItem.vue'
import ATSegment from '@/base-components/segment/ATSegment.vue'
import ATEditItemIconVue from '@/base-components/icons/ATEditItemIcon.vue'
import ATButton from '@/base-components/button/ATButton.vue'
import { monthsConstant } from '@/utils/constants'
import { presortExpenditures } from '@/utils/functions/presortExpenditures'
import { sortExpenditures } from '@/utils/functions/sortExpenditures'
import { getExpenditureHeightOfMonthAndYear } from '@/utils/functions/getExpenditureHeightOfMonthAndYear'
import { filterLiquidFunds } from '@/utils/functions/filterLiquidFunds'
import ATDeleteModal from '../modals/ATDeleteModal.vue'
import ATLiquidFundModal from '@/components/modals/ATLiquidFundModal.vue'

export interface Props {
  /**
   * The liquid funds to display
   */
  data: ATLiquidFund[]

  /**
   * The filter to apply to the liquid funds
   */
  filter?: string
}

const props = withDefaults(defineProps<Props>(), {
  filter: ''
})

interface Emits {
  /**
   * Emitted when the user wants to delete a liquid fund
   */
  (e: 'delete-liquid-fund', liquidFund: ATLiquidFund): void

  /**
   * Emitted when the user wants to update a liquid fund
   */
  (e: 'update-liquid-fund', liquidFund: ATLiquidFund): void
}

const emit = defineEmits<Emits>()

const i18n = useI18nStore().i18n

const expendituresStore = useExpendituresStore()
const { allExpenditures } = storeToRefs(expendituresStore)

const presortedExpenditures = computed(() => {
  return presortExpenditures(allExpenditures.value)
})
const sortedExpenditures = computed(() => {
  return sortExpenditures(presortedExpenditures.value)
})
const liquidFundsList = computed(() => {
  return filterLiquidFunds(Object.create(props.data), props.filter.toLowerCase().split(' '))
})
const currentLiquidFund: Ref<ATLiquidFund> = ref({
  id: 0,
  height: 0,
  month: 0,
  year: 0
})

const showModalDelete = ref(false)
const showModalEditLiquidFund = ref(false)

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

const handleShowModalEditLiquidFund = (liquidFund: ATLiquidFund) => {
  currentLiquidFund.value = Object.create(liquidFund)
  showModalEditLiquidFund.value = true
}

const handleCloseModalEditLiquidFundOnSave = () => {
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
  <div class="at-liquid-funds-list-host">
    <section
      v-for="liquidFund in liquidFundsList.slice().reverse()"
      :key="liquidFund.id"
      class="liquid-funds-list"
    >
      <ATSegment :title="monthsConstant()[liquidFund.month - 1]" :year="liquidFund.year">
        <ATSegmentItem :title="i18n.liquid_funds" :value="`${liquidFund.height} €`" editable>
          <template #button>
            <ATButton @press="handleShowModalEditLiquidFund(liquidFund)" width="40px" secondary>
              <template #icon>
                <ATEditItemIconVue />
              </template>
            </ATButton>
          </template>
        </ATSegmentItem>
        <ATSegmentItem
          :title="i18n.minus_expenditures"
          :value="`${getExpenditureHeightOfMonthAndYear(sortedExpenditures, liquidFund)} €`"
        />
        <ATSegmentItem
          :title="i18n.balance"
          :value="`${
            liquidFund.height - getExpenditureHeightOfMonthAndYear(sortedExpenditures, liquidFund)
          } €`"
        />
      </ATSegment>
    </section>
  </div>

  <ATLiquidFundModal
    v-if="showModalEditLiquidFund"
    :title="i18n.edit_liquid_fund"
    :handle-close-modal-on-cancel="handleCloseModalEditLiquidFundOnCancel"
    :handle-close-modal-on-save="handleCloseModalEditLiquidFundOnSave"
    :prop-liquid-fund="currentLiquidFund"
    :handle-close-modal-on-delete="handleCloseModalEditLiquidFundOnDelete"
  />

  <ATDeleteModal
    v-if="showModalDelete"
    :title="i18n.really_delete_liquid_fund"
    :handle-close-modal-delete-on-cancel="handleCloseModalDeleteOnCancel"
    :handle-close-modal-delete-on-confirm="handleCloseModalDeleteOnConfirm"
  />
</template>

<style scoped lang="scss">
@import '@/styles/components/liquid-funds-list/atLiquidFundsList.scss';
</style>
