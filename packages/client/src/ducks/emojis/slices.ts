import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api, { Methods } from '../../api'
import { AxiosResponse, isAxiosError } from 'axios'
import { getEmojisUrl } from '@/api/constants'
import { Emoji, EmojiState } from './types'

export const fetchEmojis = createAsyncThunk(
  'theme/fetchEmojis',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api<undefined, AxiosResponse<Emoji[]>>({
        baseURL: '/',
        url: getEmojisUrl,
        method: Methods.GET,
      })
      return response.data
    } catch (err) {
      if (!isAxiosError(err)) throw err
      return rejectWithValue(err?.response?.data)
    }
  },
)

const initialState: EmojiState = {
  emojis: [],
  loading: false,
  error: null,
}

const emojisSlice = createSlice({
  name: 'emojis',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEmojis.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEmojis.fulfilled, (state, action) => {
        state.loading = false
        state.emojis = action.payload
      })
      .addCase(fetchEmojis.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch emoji'
      })
  },
})

export const { actions, reducer } = emojisSlice
