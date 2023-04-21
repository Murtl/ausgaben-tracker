import accounts from '@/database/accounts.json'

/**
 * @description The interface for the accounts.json file
 */
interface ATJsonAccounts {
  [key: string]: {
    userUID: string
    mail: string
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
   * @param mail mail of the user
   * @param password password of the user
   * @returns if the login was successful and the userUID of the user
   */
  static login(
    mail: string,
    password: string
  ): { state: boolean; currentUserUid: string | undefined } {
    for (let i = 0; i < ATAuthService.myAccounts.users.length; i++) {
      if (
        ATAuthService.myAccounts.users[i].mail === mail &&
        ATAuthService.myAccounts.users[i].password === password
      ) {
        return { state: true, currentUserUid: ATAuthService.myAccounts.users[i].userUID }
      }
    }
    return { state: false, currentUserUid: undefined }
  }

  /**
   * @description Registers a new user in the accounts.json file
   * @param mail mail of the new user
   * @param password password of the new user
   * @returns if the registration was successful and the userUID of the new user
   */
  static register(
    mail: string,
    password: string
  ): { state: boolean; newUserUid: string | undefined } {
    for (let i = 0; i < ATAuthService.myAccounts.users.length; i++) {
      if (ATAuthService.myAccounts.users[i].mail === mail) {
        return { state: false, newUserUid: undefined }
      }
    }
    const newUserUid =
      ATAuthService.myAccounts.users[ATAuthService.myAccounts.users.length - 1].userUID + 1
    ATAuthService.myAccounts.users.push({ userUID: newUserUid, mail, password })
    return { state: true, newUserUid }
  }

  /**
   * @description Changes the mail in the accounts.json file
   * @param userUID userUID of the user
   * @param newMail new mail of the user
   * @returns if the change was successful
   */
  static changeMail(userUID: string, newMail: string): boolean {
    for (let i = 0; i < ATAuthService.myAccounts.users.length; i++) {
      if (ATAuthService.myAccounts.users[i].mail === newMail) {
        return false
      }
    }
    for (let i = 0; i < ATAuthService.myAccounts.users.length; i++) {
      if (ATAuthService.myAccounts.users[i].userUID === userUID) {
        ATAuthService.myAccounts.users[i].mail = newMail
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
