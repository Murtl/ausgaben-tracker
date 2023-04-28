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
   * The function to call when the user presses the ok button
   */
  handleCloseModalOnOk: () => void
}

defineProps<Props>()
</script>

<template>
  <div class="at-success-modal-host">
    <ATModal :title="title">
      <template #buttons>
        <ATButton :title="dynamicText.ok" width="50px" primary @press="handleCloseModalOnOk" />
      </template>
    </ATModal>
  </div>
</template>
