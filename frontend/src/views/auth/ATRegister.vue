<script setup lang="ts">
import ATButton from '@/base-components/button/ATButton.vue'
import ATInput from '@/base-components/input/ATInput.vue'
import ATWelcomeForm from '@/base-components/welcome-form/ATWelcomeForm.vue'
import { ref, computed } from 'vue'
import ATLogin from './ATLogin.vue'
import dynamicText from '@/text/dynamicText.json'
import { useUserDataStore } from '@/stores/userDataStore'
import { storeToRefs } from 'pinia'
import { useLoggedInStore } from '@/stores/loggedInStore'
import { ATAuthService } from '@/services/ATAuthService'
import ATErrorModal from '@/components/modals/ATErrorModal.vue'

const loggedInStore = useLoggedInStore()
const { loggedIn } = storeToRefs(loggedInStore)

const userDataStore = useUserDataStore()
const { userUID, userName } = storeToRefs(userDataStore)

const name = ref('')
const password = ref('')
const passwordConfirm = ref('')
const showLogin = ref(false)
const modalTitleErrorAtRegister = ref('')
const showModalErrorAtRegister = ref(false)

const computedDisabledButtonState = computed(() => {
  return name.value === '' || password.value === '' || passwordConfirm.value === ''
})

const handleShowLogin = () => {
  showLogin.value = true
}

const handleShowModalErrorAtRegister = () => {
  showModalErrorAtRegister.value = !showModalErrorAtRegister.value
}

const handleRegister = () => {
  if (password.value !== passwordConfirm.value) {
    modalTitleErrorAtRegister.value = dynamicText.passwords_do_not_match
    handleShowModalErrorAtRegister()
  } else {
    const { state, newUserUid } = ATAuthService.register(name.value, password.value)
    if (state && newUserUid) {
      userUID.value = newUserUid
      userName.value = name.value
      loggedIn.value = true
    } else {
      modalTitleErrorAtRegister.value = dynamicText.name_already_in_use
      handleShowModalErrorAtRegister()
    }
  }
}
</script>

<template>
  <div class="at-login-host" v-if="!showLogin">
    <ATWelcomeForm :title="dynamicText.register" height="600px">
      <template #inputs>
        <ATInput :title="dynamicText.name" v-model:value="name" />
        <ATInput :title="dynamicText.password" v-model:value="password" password />
        <ATInput :title="dynamicText.confirm_password" v-model:value="passwordConfirm" password />
      </template>
      <template #buttons>
        <ATButton
          :title="dynamicText.register"
          width="400px"
          primary
          @press="handleRegister"
          :disabled="computedDisabledButtonState"
        />
        <ATButton
          :title="dynamicText.already_have_an_account"
          width="400px"
          secondary
          @press="handleShowLogin"
        />
      </template>
    </ATWelcomeForm>
  </div>
  <ATLogin v-else />

  <ATErrorModal
    v-if="showModalErrorAtRegister"
    :title="modalTitleErrorAtRegister"
    :handle-close-modal-on-try-again="handleShowModalErrorAtRegister"
  />
</template>
