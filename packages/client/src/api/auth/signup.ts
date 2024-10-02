import { AxiosError, AxiosResponse, isAxiosError } from 'axios'
import { signupURL } from '../constants'
import api, { Methods } from '..'

export type SignupData = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export type SignupResponse = {
  id: number
}

export const signup = async (
  data: SignupData
): Promise<
  | AxiosResponse<SignupResponse, SignupData>
  | AxiosError<{ reason: string }, SignupResponse>
  | undefined
> => {
  try {
    const response = await api<SignupData, AxiosResponse<SignupResponse>>({
      method: Methods.POST,
      url: signupURL,
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
