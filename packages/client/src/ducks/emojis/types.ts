export type Emoji = {
  emoji_id: number
  emoji_name: string
  emoji: string
}

export type EmojiState = {
  emojis: Emoji[]
  loading: boolean
  error: string | null
}
