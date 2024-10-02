import { AxiosError, AxiosResponse, isAxiosError } from 'axios'
import { userURL } from '../constants'
import api from '..'

export type UserResponse = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

export const user = async (): Promise<
  | AxiosResponse<UserResponse, undefined>
  | AxiosError<{ reason: string }, UserResponse>
  | undefined
> => {
  try {
    const response = await api<undefined, AxiosResponse<UserResponse>>({
      url: userURL,
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
