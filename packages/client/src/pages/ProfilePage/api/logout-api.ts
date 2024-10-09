import HttpTransport from './HttpTransport'

const logoutApiInstance = new HttpTransport()

type TLogoutResponse = string

export default class LogoutApi {
  request(): Promise<TLogoutResponse> {
    return logoutApiInstance.post('/auth/logout').then(xhr => {
      return (xhr as XMLHttpRequest).responseText
    })
  }
}
