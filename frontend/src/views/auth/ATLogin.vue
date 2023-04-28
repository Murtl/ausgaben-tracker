<script setup lang="ts">
import ATButton from '@/base-components/button/ATButton.vue'
import ATInput from '@/base-components/input/ATInput.vue'
import ATWelcomeForm from '@/base-components/welcome-form/ATWelcomeForm.vue'
import { computed, ref } from 'vue'
import ATRegister from './ATRegister.vue'
import dynamicText from '@/text/dynamicText.json'
import { storeToRefs } from 'pinia'
import { useUserDataStore } from '@/stores/userDataStore'
import { useLoggedInStore } from '@/stores/loggedInStore'
import { ATAuthService } from '@/services/ATAuthService'
import ATErrorModal from '@/components/modals/ATErrorModal.vue'

const loggedInStore = useLoggedInStore()
const { loggedIn } = storeToRefs(loggedInStore)

const userDataStore = useUserDataStore()
const { userUID, userName } = storeToRefs(userDataStore)

const name = ref('')
const password = ref('')
const showRegister = ref(false)
const showModalErrorAtLogin = ref(false)

const computedDisabledButtonState = computed(() => {
  return name.value === '' || password.value === ''
})

const handleShowRegister = () => {
  showRegister.value = true
}
const handleShowModalErrorAtLogin = () => {
  showModalErrorAtLogin.value = !showModalErrorAtLogin.value
}

const handleLogin = () => {
  const { state, currentUserUid } = ATAuthService.login(name.value, password.value)
  if (state && currentUserUid) {
    userUID.value = currentUserUid
    userName.value = name.value
    loggedIn.value = true
  } else {
    handleShowModalErrorAtLogin()
  }
}
</script>

<template>
  <div class="at-login-host" v-if="!showRegister">
    <ATWelcomeForm :title="dynamicText.login" height="520px">
      <template #inputs>
        <ATInput :title="dynamicText.name" v-model:value="name" />
        <ATInput :title="dynamicText.password" v-model:value="password" password />
      </template>
      <template #buttons>
        <ATButton
          :title="dynamicText.login"
          width="400px"
          primary
          @press="handleLogin"
          :disabled="computedDisabledButtonState"
        />
        <ATButton
          :title="dynamicText.new_here"
          width="400px"
          secondary
          @press="handleShowRegister"
        />
      </template>
    </ATWelcomeForm>
  </div>
  <ATRegister v-else />

  <ATErrorModal
    v-if="showModalErrorAtLogin"
    :title="dynamicText.wrong_login_data"
    :handle-close-modal-on-try-again="handleShowModalErrorAtLogin"
  />
</template>
