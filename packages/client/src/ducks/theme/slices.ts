import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThemeData, ThemeState } from './types'
import api, { Methods } from '../../api'
import { AxiosResponse, isAxiosError } from 'axios'
import { getThemesUrl, getUserThemeUrl, setUserThemeUrl } from '@/api/constants'

export const fetchThemes = createAsyncThunk(
  'theme/fetchThemes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api<undefined, AxiosResponse<ThemeData[]>>({
        url: getThemesUrl,
        method: Methods.GET,
      })
      return response.data
    } catch (err) {
      if (!isAxiosError(err)) throw err
      return rejectWithValue(err?.response?.data)
    }
  },
)

export const getUserTheme = createAsyncThunk(
  'theme/getUserTheme',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api<undefined, AxiosResponse<ThemeData>>({
        url: getUserThemeUrl(userId),
        method: Methods.GET,
      })
      return response.data
    } catch (err) {
      if (!isAxiosError(err)) throw err
      return rejectWithValue(err?.response?.data)
    }
  },
)

export const setUserTheme = createAsyncThunk(
  'theme/setUserTheme',
  async (
    { userId, themeId }: { userId: string; themeId: number },
    { rejectWithValue },
  ) => {
    try {
      await api<undefined, AxiosResponse<void>>({
        url: setUserThemeUrl,
        method: Methods.POST,
        data: { user_id: userId, theme_id: themeId },
      })
      return themeId
    } catch (err) {
      if (!isAxiosError(err)) throw err
      return rejectWithValue(err?.response?.data)
    }
  },
)

const initialState: ThemeState = {
  themes: [],
  currentTheme: null,
  loading: false,
  error: null,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setCurrentTheme(state, action: PayloadAction<ThemeData>) {
      state.currentTheme = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchThemes.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchThemes.fulfilled, (state, action) => {
        state.loading = false
        state.themes = action.payload
      })
      .addCase(fetchThemes.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch themes'
      })
      .addCase(getUserTheme.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getUserTheme.fulfilled, (state, action) => {
        state.loading = false
        state.currentTheme = action.payload
      })
      .addCase(getUserTheme.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch user theme'
      })
      .addCase(setUserTheme.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(setUserTheme.fulfilled, (state, action) => {
        state.loading = false
        const themeId = action.payload
        const theme = state.themes.find(t => t.id === themeId)
        if (theme) state.currentTheme = theme
      })
      .addCase(setUserTheme.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to set user theme'
      })
  },
})

export const { setCurrentTheme } = themeSlice.actions
export const themeReducer = themeSlice.reducer
