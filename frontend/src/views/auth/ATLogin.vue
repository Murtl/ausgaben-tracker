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
const { userUID, userName } = storeToRefs(userDataStore)

const name = ref('')
const password = ref('')
const showRegister = ref(false)
const modalTitleErrorAtLogin = ref('')
const showModalErrorAtLogin = ref(false)

const handleShowRegister = () => {
  showRegister.value = true
}
const handleShowModalErrorAtLogin = () => {
  showModalErrorAtLogin.value = !showModalErrorAtLogin.value
}

const handleLogin = () => {
  if (name.value === '' && password.value === '') {
    modalTitleErrorAtLogin.value = dynamicText.fill_in_all_fields
    handleShowModalErrorAtLogin()
    return
  }
  const { state, currentUserUid } = ATAuthService.login(name.value, password.value)
  if (state && currentUserUid) {
    userUID.value = currentUserUid
    userName.value = name.value
    loggedIn.value = true
  } else {
    modalTitleErrorAtLogin.value = dynamicText.wrong_login_data
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
  <ATModal v-if="showModalErrorAtLogin" :title="modalTitleErrorAtLogin">
    <template #buttons>
      <ATButton
        :title="dynamicText.try_again"
        width="200px"
        primary
        @press="handleShowModalErrorAtLogin"
      />
    </template>
  </ATModal>
</template>
