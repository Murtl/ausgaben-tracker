<script setup lang="ts">
import ATButton from '@/base-components/button/ATButton.vue'
import ATInput from '@/base-components/input/ATInput.vue'
import { ref } from 'vue'
import ATCheckIcon from '@/base-components/icons/ATCheckIcon.vue'
import dynamicText from '../../assets/dynamicText.json'
import ATModal from '@/base-components/modal/ATModal.vue'
import { useUserDataStore } from '@/stores/userDataStore'
import { storeToRefs } from 'pinia'
import { ATAuthService } from '@/services/ATAuthService'

const userDataStore = useUserDataStore()
const { userUID, userMail, userPassword } = storeToRefs(userDataStore)

const newMail = ref('')
const newPassword = ref('')
const newPasswordConfirm = ref('')
const showModalMailChangeSuccess = ref(false)
const showModalPWChangeSuccess = ref(false)
const showModalPWNotMatch = ref(false)
const showModalMailInUse = ref(false)

const handleShowModalMailChangeSuccess = () => {
  showModalMailChangeSuccess.value = !showModalMailChangeSuccess.value
}
const handleShowModalPWChangeSuccess = () => {
  showModalPWChangeSuccess.value = !showModalPWChangeSuccess.value
}
const handleShowModalPWNotMatch = () => {
  showModalPWNotMatch.value = !showModalPWNotMatch.value
}
const handleShowModalMailInUse = () => {
  showModalMailInUse.value = !showModalMailInUse.value
}
const handleSaveMail = () => {
  if (newMail.value !== '') {
    if (ATAuthService.changeMail(userUID.value, newMail.value) === false) {
      handleShowModalMailInUse()
    } else {
      userMail.value = newMail.value
      newMail.value = ''
      handleShowModalMailChangeSuccess()
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
    <section class="mail-wrapper">
      <ATInput :title="dynamicText.email" v-model:value="userMail" readonly />
      <ATInput :title="dynamicText.change_email" v-model:value="newMail" />
      <section class="button-wrapper">
        <ATButton :title="dynamicText.save_email" width="210px" primary @press="handleSaveMail">
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
  <ATModal v-if="showModalMailChangeSuccess" :title="dynamicText.email_successfully_updated">
    <template #buttons>
      <ATButton
        :title="dynamicText.ok"
        width="50px"
        primary
        @press="handleShowModalMailChangeSuccess"
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
  <ATModal v-if="showModalMailInUse" :title="dynamicText.email_already_in_use">
    <template #buttons>
      <ATButton
        :title="dynamicText.try_again"
        width="200px"
        primary
        @press="handleShowModalMailInUse"
      />
    </template>
  </ATModal>
</template>

<style scoped lang="scss">
@import 'src/assets/main.scss';

.at-account-host {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin-left: auto;
  margin-right: auto;
  width: 400px;

  margin-top: 20px;
  box-shadow: $main-box-shadow;
  border-radius: 10px;
  background-color: $background-white;
  padding: 20px;

  .mail-wrapper {
    margin-bottom: 40px;
  }

  .button-wrapper {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
