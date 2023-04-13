<script setup lang="ts">
interface Props {
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
@import 'src/assets/main.scss';

.shadowbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $background-shadowbox;
  opacity: 0.5;
}

.at-modal-host {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: $background-white;
  box-shadow: $main-box-shadow;
  border-radius: 10px;

  header {
    font-weight: bold;
    font-size: $main-font-size;
    color: $heading-text-light;
    padding: 20px 20px 10px 20px;
  }

  main {
    display: grid;
    padding: 20px;
  }

  footer {
    display: flex;
    justify-content: flex-end;
    background-color: $background-modal-footer;
    gap: 20px;
    padding: 15px 20px 10px 20px;
    border-radius: 0 0 10px 10px;
  }
}
</style>
