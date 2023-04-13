import accounts from '../database/accounts.json'

export class ATAuthService {
  static login(
    mail: string,
    password: string
  ): { state: boolean; currentUserUid: string | undefined } {
    for (let i = 0; i < accounts.users.length; i++) {
      if (accounts.users[i].mail === mail && accounts.users[i].password === password) {
        return { state: true, currentUserUid: accounts.users[i].userUID }
      }
    }
    return { state: false, currentUserUid: undefined }
  }

  static register(
    mail: string,
    password: string
  ): { state: boolean; newUserUid: string | undefined } {
    for (let i = 0; i < accounts.users.length; i++) {
      if (accounts.users[i].mail === mail) {
        return { state: false, newUserUid: undefined }
      }
    }
    const newUserUid = accounts.users[accounts.users.length - 1].userUID + 1
    accounts.users.push({ userUID: newUserUid, mail, password })
    return { state: true, newUserUid }
  }

  static changeMail(userUID: string, newMail: string): boolean {
    for (let i = 0; i < accounts.users.length; i++) {
      if (accounts.users[i].mail === newMail) {
        return false
      }
    }
    for (let i = 0; i < accounts.users.length; i++) {
      if (accounts.users[i].userUID === userUID) {
        accounts.users[i].mail = newMail
        return true
      }
    }
    return false
  }

  static changePassword(userUID: string, newPassword: string) {
    for (let i = 0; i < accounts.users.length; i++) {
      if (accounts.users[i].userUID === userUID) {
        accounts.users[i].password = newPassword
      }
    }
  }
}
