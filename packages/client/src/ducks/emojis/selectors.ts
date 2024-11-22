import { RootState } from '../store'
import { EmojiState } from './types'

export const emojisSelector = (state: RootState): EmojiState['emojis'] =>
  state.emojis.emojis

export const emojisLoadingSelector = (
  state: RootState,
): EmojiState['loading'] => state.theme.loading
