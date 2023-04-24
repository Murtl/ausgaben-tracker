<script setup lang="ts">
import ATButton from '@/base-components/button/ATButton.vue'
import ATInput from '@/base-components/input/ATInput.vue'
import { ref } from 'vue'
import ATCheckIcon from '@/base-components/icons/ATCheckIcon.vue'
import dynamicText from '@/text/dynamicText.json'
import ATModal from '@/base-components/modal/ATModal.vue'
import { useUserDataStore } from '@/stores/userDataStore'
import { storeToRefs } from 'pinia'
import { ATAuthService } from '@/services/ATAuthService'

const userDataStore = useUserDataStore()
const { userUID, userName, userPassword } = storeToRefs(userDataStore)

const newName = ref('')
const newPassword = ref('')
const newPasswordConfirm = ref('')
const showModalNameChangeSuccess = ref(false)
const showModalPWChangeSuccess = ref(false)
const showModalPWNotMatch = ref(false)
const showModalNameInUse = ref(false)

const handleShowModalNameChangeSuccess = () => {
  showModalNameChangeSuccess.value = !showModalNameChangeSuccess.value
}
const handleShowModalPWChangeSuccess = () => {
  showModalPWChangeSuccess.value = !showModalPWChangeSuccess.value
}
const handleShowModalPWNotMatch = () => {
  showModalPWNotMatch.value = !showModalPWNotMatch.value
}
const handleShowModalNameInUse = () => {
  showModalNameInUse.value = !showModalNameInUse.value
}
const handleSaveName = () => {
  if (newName.value !== '') {
    if (ATAuthService.changeName(userUID.value, newName.value) === false) {
      handleShowModalNameInUse()
    } else {
      userName.value = newName.value
      newName.value = ''
      handleShowModalNameChangeSuccess()
    }
  }
}

const handleSavePassword = () => {
  if (newPassword.value === newPasswordConfirm.value && newPassword.value !== '') {
    userPassword.value = newPassword.value
    newPassword.value = ''
    newPasswordConfirm.value = ''
    ATAuthService.changePassword(userUID.value, userPassword.value)
    handleShowModalPWChangeSuccess()
  } else {
    handleShowModalPWNotMatch()
  }
}
</script>

<template>
  <div class="at-account-host">
    <section class="name-wrapper">
      <ATInput :title="dynamicText.name" v-model:value="userName" readonly />
      <ATInput :title="dynamicText.change_name" v-model:value="newName" />
      <section class="button-wrapper">
        <ATButton :title="dynamicText.save_name" width="260px" primary @press="handleSaveName">
          <template #icon>
            <ATCheckIcon />
          </template>
        </ATButton>
      </section>
    </section>

    <section class="pw-wrapper">
      <ATInput :title="dynamicText.password" v-model:value="userPassword" password readonly />
      <ATInput :title="dynamicText.new_password" v-model:value="newPassword" password />
      <ATInput
        :title="dynamicText.confirm_new_password"
        v-model:value="newPasswordConfirm"
        password
      />
      <section class="button-wrapper">
        <ATButton
          :title="dynamicText.save_password"
          width="240px"
          primary
          @press="handleSavePassword"
        >
          <template #icon>
            <ATCheckIcon />
          </template>
        </ATButton>
      </section>
    </section>
  </div>
  <ATModal v-if="showModalNameChangeSuccess" :title="dynamicText.name_successfully_updated">
    <template #buttons>
      <ATButton
        :title="dynamicText.ok"
        width="50px"
        primary
        @press="handleShowModalNameChangeSuccess"
      />
    </template>
  </ATModal>
  <ATModal v-if="showModalPWChangeSuccess" :title="dynamicText.password_successfully_updated">
    <template #buttons>
      <ATButton
        :title="dynamicText.ok"
        width="50px"
        primary
        @press="handleShowModalPWChangeSuccess"
      />
    </template>
  </ATModal>
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

<style scoped lang="scss">
@import '@/styles/views/auth/atAccount.scss';
</style>
