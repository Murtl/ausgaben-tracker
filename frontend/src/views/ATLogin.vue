<script setup lang="ts">
import ATButton from '@/components/button/ATButton.vue'
import ATInput from '@/components/input/ATInput.vue'
import ATWelcomeForm from '@/components/welcome-form/ATWelcomeForm.vue'
import { ref } from 'vue'
import { useLoggedInStore } from '../stores/loggedInStore'
import { storeToRefs } from 'pinia'
import ATRegister from './ATRegister.vue'

const loggedInStore = useLoggedInStore()
const { loggedIn } = storeToRefs(loggedInStore)

const inputValue = ref('')
const inputPwValue = ref('')
const handlePress = () => {
  loggedIn.value = true
}

const showRegister = ref(false)
const handlePressRegister = () => {
  showRegister.value = true
}
</script>

<template>
  <div class="at-login-host" v-if="!showRegister">
    <ATWelcomeForm title="Login" height="750px">
      <template #inputs>
        <ATInput title="E-Mail" v-model:value="inputValue" />
        <ATInput title="Passwort" v-model:value="inputPwValue" password />
      </template>
      <template #buttons>
        <ATButton title="Login" width="485px" primary @press="handlePress" />
        <ATButton title="Neu hier?" width="485px" secondary @press="handlePressRegister" />
      </template>
    </ATWelcomeForm>
  </div>
  <ATRegister v-else />
</template>
