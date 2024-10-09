import HttpTransport from './HttpTransport'

const getUserInfoApiInstance = new HttpTransport()

type TResponse = string

export default class GetUserInfoApi {
  request(): Promise<TResponse> {
    return getUserInfoApiInstance.get('/auth/user').then(xhr => {
      try {
        const rawResponse = (xhr as XMLHttpRequest).responseText
        const parsedResponse = JSON.parse(rawResponse)
        return parsedResponse
      } catch (error) {
        return 'parse error'
      }
    })
  }
}
