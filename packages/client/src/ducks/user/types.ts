export interface UserState {
  user: UserResponse | null
  loading: boolean
  error?: string
}

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

export type SigninData = {
  login: string
  password: string
}
