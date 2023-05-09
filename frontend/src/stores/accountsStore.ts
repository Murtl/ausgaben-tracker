import type { ATAccount } from '@/utils/types/atAccount'
import type { ATJsonAccounts } from '@/utils/types/atJsonAccounts'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { getJson } from '@/utils/functions/getJson'

/**
 * @description Store for all accounts
 */
export const useAccountsStore = defineStore('accountsStore', () => {
  const allAccounts: Ref<ATAccount[]> = ref([])

  /**
   * @description fetches all accounts from the json file
   */
  const fetchAccounts = async () => {
    const accounts: ATJsonAccounts = await getJson('json/accounts.json')
    allAccounts.value = accounts.users ?? []
  }

  /**
   * @description logs in a user
   * @param name name of the user
   * @param password password of the user
   * @returns state and userUID
   */
  const login = (
    name: string,
    password: string
  ): { state: boolean; currentUserUid: string | undefined } => {
    for (let i = 0; i < allAccounts.value.length; i++) {
      if (allAccounts.value[i].name === name && allAccounts.value[i].password === password) {
        return { state: true, currentUserUid: allAccounts.value[i].userUID }
      }
    }
    return { state: false, currentUserUid: undefined }
  }

  /**
   * @description registers a new user
   * @param name name of the user
   * @param password password of the user
   * @returns state and userUID
   */
  const register = (
    name: string,
    password: string
  ): { state: boolean; newUserUid: string | undefined } => {
    for (let i = 0; i < allAccounts.value.length; i++) {
      if (allAccounts.value[i].name === name) {
        return { state: false, newUserUid: undefined }
      }
    }
    const newUserUid = allAccounts.value[allAccounts.value.length - 1].userUID + 1
    allAccounts.value.push({ userUID: newUserUid, name, password })
    return { state: true, newUserUid }
  }

  /**
   * @description changes the name of a user
   * @param userUID userUID of the user
   * @param newName new name of the user
   * @returns state if the name was changed
   */
  const changeName = (userUID: string, newName: string): boolean => {
    for (let i = 0; i < allAccounts.value.length; i++) {
      if (allAccounts.value[i].name === newName) {
        return false
      }
    }
    for (let i = 0; i < allAccounts.value.length; i++) {
      if (allAccounts.value[i].userUID === userUID) {
        allAccounts.value[i].name = newName
        return true
      }
    }
    return false
  }

  /**
   * @description changes the password of a user
   * @param userUID userUID of the user
   * @param newPassword new password of the user
   */
  const changePassword = (userUID: string, newPassword: string) => {
    for (let i = 0; i < allAccounts.value.length; i++) {
      if (allAccounts.value[i].userUID === userUID) {
        allAccounts.value[i].password = newPassword
      }
    }
  }

  /**
   * @description checks if the password is correct
   * @param userUID userUID of the user
   * @param password password of the user
   * @returns state if the password is correct
   */
  const checkPassword = (userUID: string, password: string): boolean => {
    for (let i = 0; i < allAccounts.value.length; i++) {
      if (allAccounts.value[i].userUID === userUID) {
        return allAccounts.value[i].password === password
      }
    }
    return false
  }

  return { fetchAccounts, login, register, changeName, changePassword, checkPassword }
})
