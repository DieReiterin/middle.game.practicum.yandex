import { RootState } from '../store'
import { ThemeState } from './types'

export const themesSelector = (state: RootState): ThemeState['themes'] =>
  state.theme.themes

export const currentThemeSelector = (
  state: RootState,
): ThemeState['currentTheme'] => state.theme.currentTheme

export const themeLoadingSelector = (state: RootState): ThemeState['loading'] =>
  state.theme.loading

export const themeErrorSelector = (state: RootState): ThemeState['error'] =>
  state.theme.error
