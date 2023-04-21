<script setup lang="ts">
import router from '@/router'
import { useLoggedInStore } from '@/stores/loggedInStore'
import { storeToRefs } from 'pinia'
import ATArrowRightIcon from '@/base-components/icons/ATArrowRightIcon.vue'
import ATHandsUpIcon from '@/base-components/icons/ATHandsUpIcon.vue'
import ATButton from '@/base-components/button/ATButton.vue'
import ATCornerUpperLeftIcon from '@/base-components/icons/ATCornerUpperLeftIcon.vue'
import dynamicText from '@/text/dynamicText.json'

interface Emits {
  /**
   * Emitted when the user wants to close the flyout
   */
  (e: 'close'): void
}

const emit = defineEmits<Emits>()

const loggedInStore = useLoggedInStore()
const { loggedIn } = storeToRefs(loggedInStore)

const showAccount = () => {
  emit('close')
  router.push('/account')
}

const handleLogout = () => {
  emit('close')
  loggedIn.value = false
}
</script>

<template>
  <div class="at-flyout-host">
    <section class="arrow">
      <ATCornerUpperLeftIcon />
    </section>
    <section class="first-button">
      <ATButton :title="dynamicText.account" width="110px" @press="showAccount">
        <template #icon>
          <ATHandsUpIcon />
        </template>
      </ATButton>
    </section>
    <section class="second-button">
      <ATButton :title="dynamicText.logout" width="110px" @press="handleLogout">
        <template #icon>
          <ATArrowRightIcon />
        </template>
      </ATButton>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/components/account-flyout/atAccountFlyout.scss';
</style>
