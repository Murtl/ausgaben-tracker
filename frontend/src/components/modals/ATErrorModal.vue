<script setup lang="ts">
import ATButton from '@/base-components/button/ATButton.vue'
import dynamicText from '@/text/dynamicText.json'
import ATModal from '@/base-components/modal/ATModal.vue'

interface Props {
  /**
   * The title of the modal
   */
  title: string

  /**
   * The function to call when the user presses the try again button
   */
  handleCloseModalOnTryAgain: () => void
}

defineProps<Props>()
</script>

<template>
  <div class="at-error-modal-host">
    <ATModal :title="title">
      <template #buttons>
        <ATButton
          :title="dynamicText.try_again"
          width="200px"
          primary
          @press="handleCloseModalOnTryAgain"
        />
      </template>
    </ATModal>
  </div>
</template>
