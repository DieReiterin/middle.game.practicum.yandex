import { ThemeState } from './types'

export const getInitialTheme = (): ThemeState => {
  return {
    themes: [],
    currentTheme: { id: 1, name: 'Светлая' },
    loading: false,
    error: null,
  }
}
