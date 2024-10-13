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
import {
  userURL,
  signinURL,
  signupURL,
  staticURL,
  logoutURL,
} from '../../api/constants'

const initialState: UserState = {
  user: null,
  avatarUrl: '',
  loading: false,
  error: undefined,
}

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

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await api<undefined, AxiosResponse<string>>({
        url: logoutURL,
        method: Methods.POST,
      })
      dispatch(actions.reset())
    } catch (err) {
      if (!isAxiosError(err)) {
        throw err
      }
      return rejectWithValue(err?.response?.data)
    }
  }
)

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api<undefined, AxiosResponse<UserResponse>>({
        url: userURL,
      })

      const user = response.data

      if (user.avatar && user.avatar !== '') {
        dispatch(getUserAvatar(user.avatar))
      }

      return user
    } catch (err) {
      if (!isAxiosError(err)) {
        throw err
      }

      return rejectWithValue(err?.response?.data)
    }
  }
)

export const getUserAvatar = createAsyncThunk(
  'user/getAvatar',
  async (pathToFile: string, { rejectWithValue }) => {
    try {
      const response = await api<undefined, AxiosResponse<Blob>>({
        url: staticURL + pathToFile,
        method: Methods.GET,
        responseType: 'blob',
      })

      const fileURL = URL.createObjectURL(response.data)
      return fileURL
    } catch (err) {
      if (!isAxiosError(err)) {
        throw err
      }
      return rejectWithValue(err?.response?.data)
    }
  }
)

const userStateSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
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

    builder.addCase(logout.fulfilled, state => {
      state.loading = false
      state.error = undefined
    })
    builder.addCase(logout.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(logout.rejected, (state, error) => {
      state.loading = false
      state.error = (error.payload as { reason?: string })?.reason
    })

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

    builder.addCase(
      getUserAvatar.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.avatarUrl = action.payload
        state.loading = false
      }
    )
    builder.addCase(getUserAvatar.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(getUserAvatar.rejected, (state, error) => {
      state.loading = false
      state.error = (error.payload as { reason?: string })?.reason
    })
  },
})

export const { actions, reducer } = userStateSlice
