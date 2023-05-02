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
   * The function to call when the user presses the ok button
   */
  handleCloseModalOnOk: () => void
}

defineProps<Props>()

const i18n = useI18nStore().i18n
</script>

<template>
  <div class="at-success-modal-host">
    <ATModal :title="title">
      <template #buttons>
        <ATButton :title="i18n.ok" width="50px" primary @press="handleCloseModalOnOk" />
      </template>
    </ATModal>
  </div>
</template>
