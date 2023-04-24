<script setup lang="ts">
import ATButton from '@/base-components/button/ATButton.vue'
import ATInput from '@/base-components/input/ATInput.vue'
import ATWelcomeForm from '@/base-components/welcome-form/ATWelcomeForm.vue'
import { ref } from 'vue'
import ATLogin from './ATLogin.vue'
import dynamicText from '@/text/dynamicText.json'
import ATModal from '@/base-components/modal/ATModal.vue'
import { useUserDataStore } from '@/stores/userDataStore'
import { storeToRefs } from 'pinia'
import { useLoggedInStore } from '@/stores/loggedInStore'
import { ATAuthService } from '@/services/ATAuthService'

const loggedInStore = useLoggedInStore()
const { loggedIn } = storeToRefs(loggedInStore)

const userDataStore = useUserDataStore()
const { userUID, userName, userPassword } = storeToRefs(userDataStore)

const name = ref('')
const password = ref('')
const passwordConfirm = ref('')
const showLogin = ref(false)
const showModalPWNotMatch = ref(false)
const showModalNameInUse = ref(false)

const handleShowLogin = () => {
  showLogin.value = true
}

const handleShowModalPWNotMatch = () => {
  showModalPWNotMatch.value = !showModalPWNotMatch.value
}

const handleShowModalNameInUse = () => {
  showModalNameInUse.value = !showModalNameInUse.value
}

const handleRegister = () => {
  if (password.value !== '' && name.value !== '') {
    if (password.value !== passwordConfirm.value) {
      handleShowModalPWNotMatch()
    } else {
      const { state, newUserUid } = ATAuthService.register(name.value, password.value)
      if (state && newUserUid) {
        userUID.value = newUserUid
        userName.value = name.value
        userPassword.value = password.value
        loggedIn.value = true
      } else {
        handleShowModalNameInUse()
      }
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
        <ATButton :title="dynamicText.register" width="400px" primary @press="handleRegister" />
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
  <ATModal v-if="showModalPWNotMatch" :title="dynamicText.passwords_do_not_match">
    <template #buttons>
      <ATButton
        :title="dynamicText.try_again"
        width="200px"
        primary
        @press="handleShowModalPWNotMatch"
      />
    </template>
  </ATModal>
  <ATModal v-if="showModalNameInUse" :title="dynamicText.name_already_in_use">
    <template #buttons>
      <ATButton
        :title="dynamicText.try_again"
        width="200px"
        primary
        @press="handleShowModalNameInUse"
      />
    </template>
  </ATModal>
</template>
