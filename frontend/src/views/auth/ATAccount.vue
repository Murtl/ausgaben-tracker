<script setup lang="ts">
import ATButton from '@/base-components/button/ATButton.vue'
import ATInput from '@/base-components/input/ATInput.vue'
import { ref, computed } from 'vue'
import ATCheckIcon from '@/base-components/icons/ATCheckIcon.vue'
import { useI18nStore } from '@/stores/i18nStore'
import { useUserDataStore } from '@/stores/userDataStore'
import { storeToRefs } from 'pinia'
import ATErrorModal from '@/components/modals/ATErrorModal.vue'
import ATSuccessModal from '@/components/modals/ATSuccessModal.vue'
import { useAccountsStore } from '@/stores/accountsStore'

const i18n = useI18nStore().i18n

const userDataStore = useUserDataStore()
const { userUID, userName } = storeToRefs(userDataStore)

const accountStore = useAccountsStore()

const newName = ref('')
const oldPassword = ref('')
const newPassword = ref('')
const newPasswordConfirm = ref('')

const modalTitleChangeSuccess = ref('')
const showModalChangeSuccess = ref(false)
const modalTitleChangeError = ref('')
const showModalErrorAtChange = ref(false)

const computedDisabledSaveNameButtonState = computed(() => {
  return newName.value === ''
})

const computedDisabledSavePasswordButtonState = computed(() => {
  return oldPassword.value === '' || newPassword.value === '' || newPasswordConfirm.value === ''
})

const handleShowModalChangeSuccess = () => {
  showModalChangeSuccess.value = !showModalChangeSuccess.value
}
const handleShowModalErrorAtChange = () => {
  showModalErrorAtChange.value = !showModalErrorAtChange.value
}
const handleSaveName = () => {
  if (accountStore.changeName(userUID.value, newName.value) === false) {
    modalTitleChangeError.value = i18n.name_already_in_use
    handleShowModalErrorAtChange()
  } else {
    userName.value = newName.value
    newName.value = ''
    modalTitleChangeSuccess.value = i18n.name_successfully_updated
    handleShowModalChangeSuccess()
  }
}

const handleSavePassword = () => {
  if (newPassword.value === newPasswordConfirm.value) {
    if (accountStore.checkPassword(userUID.value, oldPassword.value) === false) {
      modalTitleChangeError.value = i18n.wrong_old_password
      handleShowModalErrorAtChange()
      return
    }
    accountStore.changePassword(userUID.value, newPassword.value)
    newPassword.value = ''
    newPasswordConfirm.value = ''
    oldPassword.value = ''
    modalTitleChangeSuccess.value = i18n.password_successfully_updated
    handleShowModalChangeSuccess()
  } else {
    modalTitleChangeError.value = i18n.passwords_do_not_match
    handleShowModalErrorAtChange()
  }
}
</script>

<template>
  <div class="at-account-host">
    <section class="name-wrapper">
      <ATInput :title="i18n.name" v-model:value="userName" readonly />
      <ATInput :title="i18n.change_name" v-model:value="newName" />
      <section class="button-wrapper">
        <ATButton
          :title="i18n.save_name"
          width="260px"
          primary
          @press="handleSaveName"
          :disabled="computedDisabledSaveNameButtonState"
        >
          <template #icon>
            <ATCheckIcon />
          </template>
        </ATButton>
      </section>
    </section>

    <section class="pw-wrapper">
      <ATInput :title="i18n.old_password" v-model:value="oldPassword" password />
      <ATInput :title="i18n.new_password" v-model:value="newPassword" password />
      <ATInput :title="i18n.confirm_new_password" v-model:value="newPasswordConfirm" password />
      <section class="button-wrapper">
        <ATButton
          :title="i18n.save_password"
          width="240px"
          primary
          @press="handleSavePassword"
          :disabled="computedDisabledSavePasswordButtonState"
        >
          <template #icon>
            <ATCheckIcon />
          </template>
        </ATButton>
      </section>
    </section>
  </div>

  <ATSuccessModal
    v-if="showModalChangeSuccess"
    :title="modalTitleChangeSuccess"
    :handle-close-modal-on-ok="handleShowModalChangeSuccess"
  />

  <ATErrorModal
    v-if="showModalErrorAtChange"
    :title="modalTitleChangeError"
    :handle-close-modal-on-try-again="handleShowModalErrorAtChange"
  />
</template>

<style scoped lang="scss">
@import '@/styles/views/auth/atAccount.scss';
</style>
