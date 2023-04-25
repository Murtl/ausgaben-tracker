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
const { userUID, userName } = storeToRefs(userDataStore)

const newName = ref('')
const oldPassword = ref('')
const newPassword = ref('')
const newPasswordConfirm = ref('')

const modalTitleChangeSuccess = ref('')
const showModalChangeSuccess = ref(false)
const modalTitleChangeError = ref('')
const showModalErrorAtChange = ref(false)

const handleShowModalChangeSuccess = () => {
  showModalChangeSuccess.value = !showModalChangeSuccess.value
}
const handleShowModalErrorAtChange = () => {
  showModalErrorAtChange.value = !showModalErrorAtChange.value
}
const handleSaveName = () => {
  if (newName.value === '') {
    modalTitleChangeError.value = dynamicText.fill_in_all_fields
    handleShowModalErrorAtChange()
    return
  }
  if (ATAuthService.changeName(userUID.value, newName.value) === false) {
    modalTitleChangeError.value = dynamicText.name_already_in_use
    handleShowModalErrorAtChange()
  } else {
    userName.value = newName.value
    newName.value = ''
    modalTitleChangeSuccess.value = dynamicText.name_successfully_updated
    handleShowModalChangeSuccess()
  }
}

const handleSavePassword = () => {
  if (newPassword.value === '' || oldPassword.value === '') {
    modalTitleChangeError.value = dynamicText.fill_in_all_fields
    handleShowModalErrorAtChange()
    return
  }
  if (
    newPassword.value === newPasswordConfirm.value &&
    newPassword.value !== '' &&
    oldPassword.value !== ''
  ) {
    if (ATAuthService.checkPassword(userUID.value, oldPassword.value) === false) {
      modalTitleChangeError.value = dynamicText.wrong_old_password
      handleShowModalErrorAtChange()
      return
    }
    ATAuthService.changePassword(userUID.value, newPassword.value)
    newPassword.value = ''
    newPasswordConfirm.value = ''
    oldPassword.value = ''
    modalTitleChangeSuccess.value = dynamicText.password_successfully_updated
    handleShowModalChangeSuccess()
  } else {
    modalTitleChangeError.value = dynamicText.passwords_do_not_match
    handleShowModalErrorAtChange()
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
      <ATInput :title="dynamicText.old_password" v-model:value="oldPassword" password />
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
  <ATModal v-if="showModalChangeSuccess" :title="modalTitleChangeSuccess">
    <template #buttons>
      <ATButton
        :title="dynamicText.ok"
        width="50px"
        primary
        @press="handleShowModalChangeSuccess"
      />
    </template>
  </ATModal>
  <ATModal v-if="showModalErrorAtChange" :title="modalTitleChangeError">
    <template #buttons>
      <ATButton
        :title="dynamicText.try_again"
        width="200px"
        primary
        @press="handleShowModalErrorAtChange"
      />
    </template>
  </ATModal>
</template>

<style scoped lang="scss">
@import '@/styles/views/auth/atAccount.scss';
</style>
