<script setup lang="ts">
import ATButton from '@/base-components/button/ATButton.vue'
import { useI18nStore } from '@/stores/i18nStore'
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

const i18n = useI18nStore().i18n
</script>

<template>
  <div class="at-error-modal-host">
    <ATModal :title="title">
      <template #buttons>
        <ATButton
          :title="i18n.try_again"
          width="200px"
          primary
          @press="handleCloseModalOnTryAgain"
        />
      </template>
    </ATModal>
  </div>
</template>
