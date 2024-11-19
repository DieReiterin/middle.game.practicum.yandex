export type Emoji = {
  emoji_id: number
  emoji_name: string
  emoji: string
}

export type EmojiState = {
  emoji: Emoji[]
  loading: boolean
  error: string | null
}
