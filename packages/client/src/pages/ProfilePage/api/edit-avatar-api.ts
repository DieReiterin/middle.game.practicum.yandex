import HttpTransport from './HttpTransport'

const editAvatarApiInstance = new HttpTransport()

type TChangeProfileResponse = string

export default class EditAvatarApi {
  request(dataParam: FormData): Promise<TChangeProfileResponse> {
    return editAvatarApiInstance
      .put('/user/profile/avatar', {
        data: dataParam,
      })
      .then(xhr => {
        const rawResponse = (xhr as XMLHttpRequest).responseText
        return rawResponse
      })
  }
}
