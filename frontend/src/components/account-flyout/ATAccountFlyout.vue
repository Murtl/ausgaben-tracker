<script setup lang="ts">
import router from '@/router'
import { useLoggedInStore } from '../../stores/loggedInStore'
import { storeToRefs } from 'pinia'
import ATArrowRightIcon from '@/components/icons/ATArrowRightIcon.vue'
import ATHandsUpIcon from '@/components/icons/ATHandsUpIcon.vue'
import ATButton from '../button/ATButton.vue'
import ATCornerUpperLeftIcon from '@/components/icons/ATCornerUpperLeftIcon.vue'
import dynamicText from '../../assets/dynamicText.json'

interface Emits {
  (e: 'close'): void
}

const emit = defineEmits<Emits>()

const showAccount = () => {
  emit('close')
  router.push('/account')
}

const loggedInStore = useLoggedInStore()
const { loggedIn } = storeToRefs(loggedInStore)

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
@import 'src/assets/main.scss';

.at-flyout-host {
  position: absolute;
  margin-top: 58px;
  margin-right: 5px;
  background-color: $background-white;
  border-radius: 10px;

  .arrow {
    position: absolute;
    margin-top: -7px;
    margin-left: 88px;
    rotate: 45deg;
  }

  .first-button {
    border-bottom: 1px solid #dddddd;
  }

  .first-button:hover,
  .second-button:hover {
    background-color: $button-white-hover;
  }
}
</style>
