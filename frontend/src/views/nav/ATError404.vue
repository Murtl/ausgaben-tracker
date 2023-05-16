<script setup lang="ts">
import router from '@/router'
import { useI18nStore } from '@/stores/i18nStore'

const i18n = useI18nStore().i18n
</script>

<template>
  <div class="at-error-404-host">
    <h1>{{ i18n.error_404 }}</h1>
    <p>{{ i18n.page_not_found }} {{ router.currentRoute.value.path }}</p>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/views/nav/atError404.scss';
</style>
