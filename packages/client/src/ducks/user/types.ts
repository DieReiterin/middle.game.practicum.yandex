export interface UserState {
  user: UserResponse | null
  avatarUrl: string
  loading: boolean
  error?: string
  serviceId?: string
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

export type ServiceIdResponse = {
  service_id: string
}

export type SigninData = {
  login: string
  password: string
}

export type GameDataType = {
  name: string
  result: number
}

export type LeaderboardParams = {
  ratingFieldName: string
  cursor: number
  limit: number
}
