<script setup lang="ts">
import dynamicText from '@/text/dynamicText.json'
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
</script>

<template>
  <div class="at-delete-modal-buttons-host">
    <ATModal :title="title">
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
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/components/modals/atDeleteModal.scss';
</style>
