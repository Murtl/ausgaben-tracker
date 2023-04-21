<script setup lang="ts">
interface Props {
  /**
   * The title of the modal
   */
  title: string
}
defineProps<Props>()
</script>

<template>
  <Teleport to="#modal-container">
    <div class="shadowbox"></div>
    <div class="at-modal-host">
      <header>
        {{ title }}
      </header>

      <main>
        <slot name="inputs"></slot>
      </main>

      <footer>
        <slot name="buttons"></slot>
      </footer>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
@import '@/styles/base-components/modal/atModal.scss';
</style>
