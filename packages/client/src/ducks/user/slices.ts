import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  ServiceIdResponse,
  SigninData,
  SignupData,
  SignupResponse,
  UserResponse,
  UserState,
} from './types'

import { AxiosResponse, isAxiosError } from 'axios'
import api, { Methods } from '../../api'
import {
  getuserURL,
  logoutURL,
  oauthURL,
  redirectURL,
  serviceIdURL,
  signinURL,
  signupURL,
  staticURL,
} from '@/api/constants'

const initialState: UserState = {
  user: null,
  avatarUrl: '',
  loading: false,
  error: undefined,
  serviceId: '',
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

export const getOauthServiceId = createAsyncThunk(
  'user/getOauthServiceId',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api<undefined, AxiosResponse<ServiceIdResponse>>({
        url: serviceIdURL,
        params: { redirect_uri: redirectURL },
      })

      const { service_id } = response.data

      return service_id
    } catch (err) {
      if (!isAxiosError(err)) {
        throw err
      }

      return rejectWithValue(err?.response?.data)
    }
  }
)

export const getOauthAccessToken = createAsyncThunk(
  'user/getOauthAccessToken',
  async (serviceId: string, { rejectWithValue, dispatch }) => {
    try {
      await api<undefined, AxiosResponse<Blob>>({
        url: oauthURL,
        method: Methods.POST,
        data: { redirect_uri: redirectURL, code: serviceId },
      })

      dispatch(getUser())
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
      dispatch(getUser())
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
        url: getuserURL,
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

      return URL.createObjectURL(response.data)
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

    builder.addCase(getOauthServiceId.fulfilled, (state, action) => {
      state.serviceId = action.payload
      state.loading = false
    })
    builder.addCase(getOauthServiceId.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(getOauthServiceId.rejected, (state, error) => {
      state.loading = false
      state.error = (error.payload as { reason?: string })?.reason
    })

    builder.addCase(getOauthAccessToken.fulfilled, state => {
      state.error = undefined
      state.loading = false
    })
    builder.addCase(getOauthAccessToken.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(getOauthAccessToken.rejected, (state, error) => {
      state.loading = false
      state.error = (error.payload as { reason?: string })?.reason
    })

    builder.addCase(
      getUser.fulfilled,
      (state, action: PayloadAction<UserResponse>) => {
        state.user = action.payload
        state.loading = false
        state.error = undefined
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
