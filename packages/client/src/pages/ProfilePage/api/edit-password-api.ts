import HttpTransport from './HttpTransport'

const editPasswordApiInstance = new HttpTransport()

type TEditPasswordRequest = {
  oldPassword: string
  newPassword: string
}

type TErrorResponse = {
  reason: string
}
type TEditPasswordResponse = string | TErrorResponse

export default class EditPasswordApi {
  request(dataParam: TEditPasswordRequest): Promise<TEditPasswordResponse> {
    return editPasswordApiInstance
      .put('/user/password', {
        data: dataParam,
      })
      .then(xhr => {
        const rawResponse = (xhr as XMLHttpRequest).responseText
        if (rawResponse === 'OK') {
          return rawResponse
        } else {
          try {
            const parsedResponse = JSON.parse(rawResponse)
            return parsedResponse
          } catch (error) {
            return 'parse error'
          }
        }
      })
  }
}
