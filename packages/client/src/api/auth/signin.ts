import { AxiosError, AxiosResponse, isAxiosError } from 'axios'
import { signinURL } from '../constants'
import api, { Methods } from '..'

export type SigninData = {
  login: string
  password: string
}

export const signin = async (
  data: SigninData
): Promise<
  | AxiosResponse<string, SigninData>
  | AxiosError<{ reason: string }, string>
  | undefined
> => {
  try {
    const response = await api<SigninData, AxiosResponse<string>>({
      method: Methods.POST,
      url: signinURL,
      data,
    })

    if (response.status === 200) {
      return response
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return error
    }
  }
}
