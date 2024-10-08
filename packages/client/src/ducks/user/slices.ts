import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  SigninData,
  SignupData,
  SignupResponse,
  UserResponse,
  UserState,
} from './types'

import { AxiosResponse, isAxiosError } from 'axios'
import api, { Methods } from '../../api'
import { userURL, signinURL, signupURL } from '../../api/constants'

const initialState: UserState = {
  user: null,
  loading: false,
  error: undefined,
}

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api<undefined, AxiosResponse<UserResponse>>({
        url: userURL,
      })

      return response.data
    } catch (err) {
      if (!isAxiosError(err)) {
        throw err
      }

      return rejectWithValue(err?.response?.data)
    }
  }
)

export const signin = createAsyncThunk(
  'user/signin',
  async (data: SigninData, { rejectWithValue, dispatch }) => {
    try {
      const response = await api<undefined, AxiosResponse<UserResponse>>({
        url: signinURL,
        method: Methods.POST,
        data: data,
      })

      dispatch(getUser())
      return response.data
    } catch (err) {
      if (!isAxiosError(err)) {
        throw err
      }
      return rejectWithValue(err?.response?.data)
    }
  }
)

export const signup = createAsyncThunk(
  'user/signup',
  async (data: SignupData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api<undefined, AxiosResponse<SignupResponse>>({
        url: signupURL,
        method: Methods.POST,
        data: data,
      })

      dispatch(getUser())
      return response.data
    } catch (err) {
      if (!isAxiosError(err)) {
        throw err
      }

      return rejectWithValue(err?.response?.data)
    }
  }
)

const userStateSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(
      getUser.fulfilled,
      (state, action: PayloadAction<UserResponse>) => {
        state.user = action.payload
        state.loading = false
      }
    )
    builder.addCase(getUser.pending, state => {
      state.loading = true
    })
    builder.addCase(getUser.rejected, state => {
      state.loading = false
    })

    builder.addCase(signin.fulfilled, state => {
      state.loading = false
      state.error = undefined
    })
    builder.addCase(signin.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(signin.rejected, (state, error) => {
      state.loading = false
      state.error = (error.payload as { reason?: string })?.reason
    })

    builder.addCase(signup.fulfilled, state => {
      state.loading = false
      state.error = undefined
    })
    builder.addCase(signup.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(signup.rejected, (state, error) => {
      state.loading = false
      state.error = (error.payload as { reason?: string })?.reason
    })
  },
})

export const { actions, reducer } = userStateSlice
