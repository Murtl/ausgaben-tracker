<script setup lang="ts">
import ATButton from '@/base-components/button/ATButton.vue'
import ATInput from '@/base-components/input/ATInput.vue'
import ATWelcomeForm from '@/base-components/welcome-form/ATWelcomeForm.vue'
import { ref } from 'vue'
import ATRegister from './ATRegister.vue'
import dynamicText from '@/text/dynamicText.json'
import ATModal from '@/base-components/modal/ATModal.vue'
import { storeToRefs } from 'pinia'
import { useUserDataStore } from '@/stores/userDataStore'
import { useLoggedInStore } from '@/stores/loggedInStore'
import { ATAuthService } from '@/services/ATAuthService'

const loggedInStore = useLoggedInStore()
const { loggedIn } = storeToRefs(loggedInStore)

const userDataStore = useUserDataStore()
const { userUID, userMail, userPassword } = storeToRefs(userDataStore)

const mail = ref('')
const password = ref('')
const showRegister = ref(false)
const showModalLoginDataWrong = ref(false)

const handleShowRegister = () => {
  showRegister.value = true
}
const handleShowModalLoginDataWrong = () => {
  showModalLoginDataWrong.value = !showModalLoginDataWrong.value
}

const handleLogin = () => {
  if (mail.value !== '' && password.value !== '') {
    const { state, currentUserUid } = ATAuthService.login(mail.value, password.value)
    if (state && currentUserUid) {
      userUID.value = currentUserUid
      userMail.value = mail.value
      userPassword.value = password.value
      loggedIn.value = true
    } else {
      handleShowModalLoginDataWrong()
    }
  }
}
</script>

<template>
  <div class="at-login-host" v-if="!showRegister">
    <ATWelcomeForm :title="dynamicText.login" height="520px">
      <template #inputs>
        <ATInput :title="dynamicText.email" v-model:value="mail" />
        <ATInput :title="dynamicText.password" v-model:value="password" password />
      </template>
      <template #buttons>
        <ATButton :title="dynamicText.login" width="400px" primary @press="handleLogin" />
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
  <ATModal v-if="showModalLoginDataWrong" :title="dynamicText.wrong_login_data">
    <template #buttons>
      <ATButton
        :title="dynamicText.try_again"
        width="200px"
        primary
        @press="handleShowModalLoginDataWrong"
      />
    </template>
  </ATModal>
</template>
