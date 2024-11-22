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

export type Topic = {
  topic_id: number
  topic_name: string
  topic_descr: string
  messages_count: number
}

export type AddTopicParams = {
  topic_name: string
  topic_descr: string
}

export type CreateTopicResponse = {
  message: string
  data: AddTopicParams
}

export type Message = {
  user_name: string
  message_text: string
  emoji_id?: number
  message_id: number
}

export type GetTopicResponse = {
  topic_id: number
  topic_name: string
  topic_descr: string
  messages_count: number
  messages: Message[]
}

export type AddMessageParams = {
  user_name: string
  message_text: string
}

export type AddMessageResponse = {
  message: string
  data: {
    message_id: number
    topic_id: number
    user_name: string
    message_text: string
  }
}

export type AddEmojiToMessageParams = {
  emoji_id?: number
  message_id: number
}
