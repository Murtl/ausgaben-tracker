<script setup lang="ts">
import { useI18nStore } from '@/stores/i18nStore'
import ATButton from '@/base-components/button/ATButton.vue'
import ATModal from '@/base-components/modal/ATModal.vue'

interface Props {
  /**
   * the title of the modal
   */
  title: string

  /**
   * The function to call when the user cancels the deletion
   */
  handleCloseModalDeleteOnCancel: () => void

  /**
   * The function to call when the user confirms the deletion
   */
  handleCloseModalDeleteOnConfirm: () => void
}

defineProps<Props>()

const i18n = useI18nStore().i18n
</script>

<template>
  <div class="at-delete-modal-buttons-host">
    <ATModal :title="title">
      <template #buttons>
        <ATButton
          :title="i18n.cancel"
          secondary
          @press="handleCloseModalDeleteOnCancel"
          width="200px"
        />
        <ATButton
          :title="i18n.delete"
          primary
          @press="handleCloseModalDeleteOnConfirm"
          width="200px"
          class="delete-button"
        />
      </template>
    </ATModal>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/components/modals/atDeleteModal.scss';
</style>
