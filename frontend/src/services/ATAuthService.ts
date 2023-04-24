import accounts from '@/database/accounts.json'

/**
 * @description The interface for the accounts.json file
 */
interface ATJsonAccounts {
  [key: string]: {
    userUID: string
    name: string
    password: string
  }[]
}

/**
 * @description Service for authentication and interacting with the accounts.json file
 */
export class ATAuthService {
  static myAccounts: ATJsonAccounts = accounts

  /**
   * @description Logs in a user
   * @param name name of the user
   * @param password password of the user
   * @returns if the login was successful and the userUID of the user
   */
  static login(
    name: string,
    password: string
  ): { state: boolean; currentUserUid: string | undefined } {
    for (let i = 0; i < ATAuthService.myAccounts.users.length; i++) {
      if (
        ATAuthService.myAccounts.users[i].name === name &&
        ATAuthService.myAccounts.users[i].password === password
      ) {
        return { state: true, currentUserUid: ATAuthService.myAccounts.users[i].userUID }
      }
    }
    return { state: false, currentUserUid: undefined }
  }

  /**
   * @description Registers a new user in the accounts.json file
   * @param name name of the new user
   * @param password password of the new user
   * @returns if the registration was successful and the userUID of the new user
   */
  static register(
    name: string,
    password: string
  ): { state: boolean; newUserUid: string | undefined } {
    for (let i = 0; i < ATAuthService.myAccounts.users.length; i++) {
      if (ATAuthService.myAccounts.users[i].name === name) {
        return { state: false, newUserUid: undefined }
      }
    }
    const newUserUid =
      ATAuthService.myAccounts.users[ATAuthService.myAccounts.users.length - 1].userUID + 1
    ATAuthService.myAccounts.users.push({ userUID: newUserUid, name, password })
    return { state: true, newUserUid }
  }

  /**
   * @description Changes the name in the accounts.json file
   * @param userUID userUID of the user
   * @param newName new name of the user
   * @returns if the change was successful
   */
  static changeName(userUID: string, newName: string): boolean {
    for (let i = 0; i < ATAuthService.myAccounts.users.length; i++) {
      if (ATAuthService.myAccounts.users[i].name === newName) {
        return false
      }
    }
    for (let i = 0; i < ATAuthService.myAccounts.users.length; i++) {
      if (ATAuthService.myAccounts.users[i].userUID === userUID) {
        ATAuthService.myAccounts.users[i].name = newName
        return true
      }
    }
    return false
  }

  /**
   * @description Changes the password in the accounts.json file
   * @param userUID userUID of the user
   * @param newPassword new password of the user
   */
  static changePassword(userUID: string, newPassword: string) {
    for (let i = 0; i < ATAuthService.myAccounts.users.length; i++) {
      if (ATAuthService.myAccounts.users[i].userUID === userUID) {
        ATAuthService.myAccounts.users[i].password = newPassword
      }
    }
  }
}
