export interface ThemeData {
  id: number
  name: string
}

export interface ThemeState {
  themes: ThemeData[]
  currentTheme: ThemeData | null
  loading: boolean
  error: string | null
}
