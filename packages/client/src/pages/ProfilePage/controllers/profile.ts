import ProfileApi from '../api/profile-api'
import EditPasswordApi from '../api/edit-password-api'
import EditAvatarApi from '../api/edit-avatar-api'
import validate from '../tools/validate'

interface IProfileFormModel {
  email: string
  login: string
  first_name: string
  second_name: string
  display_name: string
  phone: string
}

interface IPasswordFormModel {
  old_password: string
  new_password: string
  repeat_password: string
}

const profileApi = new ProfileApi()
const editPasswordApi = new EditPasswordApi()
const editAvatarApi = new EditAvatarApi()

export default class ProfileController {
  public async editProfile(requestData: IProfileFormModel) {
    try {
      const validateEmail = validate('email', requestData.email)
      const validateLogin = validate('login', requestData.login)
      const validateFirstName = validate('first_name', requestData.first_name)
      const validateSecondName = validate(
        'second_name',
        requestData.second_name
      )
      const validateDisplayName = validate(
        'display_name',
        requestData.display_name
      )
      const validatePhone = validate('phone', requestData.phone)

      const statuses = [
        validateEmail,
        validateLogin,
        validateFirstName,
        validateSecondName,
        validateDisplayName,
        validatePhone,
      ]

      if (!statuses.every(status => status === 'ok')) {
        return 'Поля не прошли валидацию'
      } else {
        const response = await profileApi.request(requestData)
        return response
      }
    } catch (error) {
      throw error
    }
  }

  public async editPassword(data: IPasswordFormModel) {
    try {
      const validateNewPassword = validate('password', data.new_password)
      if (validateNewPassword !== 'ok') {
        return `Ошибка в новом пароле: ${validateNewPassword}`
      }
      if (data.old_password === data.new_password) {
        return 'Новый пароль должен отличаться от старого'
      }
      if (data.repeat_password !== data.new_password) {
        return 'Повторите пароль корректно'
      }

      const preppedData = {
        oldPassword: data.old_password,
        newPassword: data.new_password,
      }
      const response = await editPasswordApi.request(preppedData)
      return response
    } catch (error) {
      throw error
    }
  }

  public async editAvatar(data: FormData) {
    try {
      const response = await editAvatarApi.request(data)
      return response
    } catch (error) {
      throw error
    }
  }
}
