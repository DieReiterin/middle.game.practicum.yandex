import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  ServiceIdResponse,
  SigninData,
  SignupData,
  SignupResponse,
  UserResponse,
  UserState,
  GameDataType,
  LeaderboardParams,
  Topic,
  CreateTopicParams,
  CreateTopicResponse,
  TopicResponse,
  AddMessageParams,
  AddMessageResponse,
} from './types'

import axios, { AxiosResponse, isAxiosError } from 'axios'
import api, { Methods } from '../../api'
import {
  addUserToLeaderbordURL,
  getAllLeaderboardURL,
  getUserURL,
  logoutURL,
  oauthURL,
  redirectURL,
  serviceIdURL,
  signinURL,
  signupURL,
  staticURL,
  apiPrefix,
  AllTopicsURL,
  topicURL,
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
        baseURL: apiPrefix,
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
  },
)

export const signin = createAsyncThunk(
  'user/signin',
  async (data: SigninData, { rejectWithValue, dispatch }) => {
    try {
      const response = await api<undefined, AxiosResponse<UserResponse>>({
        baseURL: apiPrefix,
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
  },
)

export const getOauthServiceId = createAsyncThunk(
  'user/getOauthServiceId',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api<undefined, AxiosResponse<ServiceIdResponse>>({
        baseURL: apiPrefix,
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
  },
)

export const getOauthAccessToken = createAsyncThunk(
  'user/getOauthAccessToken',
  async (serviceId: string, { rejectWithValue, dispatch }) => {
    try {
      await api<undefined, AxiosResponse<Blob>>({
        baseURL: apiPrefix,
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
  },
)

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await api<undefined, AxiosResponse<string>>({
        baseURL: apiPrefix,
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
  },
)

export const sendGameData = createAsyncThunk(
  'leaderboard',
  async (gameData: GameDataType) => {
    try {
      const response = await api({
        baseURL: apiPrefix,
        url: addUserToLeaderbordURL,
        method: Methods.POST,
        data: {
          data: gameData,
          ratingFieldName: 'result',
        },
      })
      return response.data
    } catch (error) {
      throw error
    }
  },
)

export const getLeaderboard = createAsyncThunk(
  'leaderboard/getData',
  async (params: LeaderboardParams, { rejectWithValue }) => {
    try {
      const response = await api<undefined, AxiosResponse<LeaderboardParams>>({
        baseURL: apiPrefix,
        url: getAllLeaderboardURL,
        method: Methods.POST,
        data: params,
      })

      return response.data
    } catch (err) {
      if (!isAxiosError(err)) {
        throw err
      }
      return rejectWithValue(err?.response?.data)
    }
  },
)

//Получение списка топиков: Метод запроса - GET Адрес - /topics
export const fetchTopics = async () => {
  try {
    const response = await axios.get(AllTopicsURL)
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data || 'Ошибка при загрузке тем')
    }
    throw new Error('Неизвестная ошибка')
  }
}

//Создать новый топик: Метод запроса - POST Адрес - /topics
export const createTopic = createAsyncThunk(
  'topics/createData',
  async (params: CreateTopicParams, { rejectWithValue }) => {
    try {
      const response = await api<undefined, AxiosResponse<CreateTopicResponse>>(
        {
          url: AllTopicsURL,
          method: Methods.POST,
          data: params,
        },
      )

      return response.data
    } catch (err) {
      if (!isAxiosError(err)) {
        throw err
      }
      return rejectWithValue(err?.response?.data)
    }
  },
)

//Получить один топик и его сообщения: Метод запроса - GET Адрес - /topic/:topic_id
export const getTopic = async (topicId: number) => {
  try {
    const response = await axios.get(topicURL(topicId))
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data || 'Ошибка при загрузке тем')
    }
    throw new Error('Неизвестная ошибка')
  }
}

//Добавить сообщение в топик: Метод запроса - POST Адрес - /topic/:topic_id
export const addMessageToTopic = createAsyncThunk(
  'topics/addMessage',
  async (
    { topicId, params }: { topicId: number; params: AddMessageParams },
    { rejectWithValue },
  ) => {
    try {
      const response = await api<undefined, AxiosResponse<AddMessageResponse>>({
        url: topicURL(topicId),
        method: Methods.POST,
        data: params,
      })

      return response.data
    } catch (err) {
      if (!isAxiosError(err)) {
        throw err
      }
      return rejectWithValue(err?.response?.data)
    }
  },
)

export const getUser = createAsyncThunk(
  'user/getUser',
  async (cookies: string | undefined, { rejectWithValue, dispatch }) => {
    try {
      const response = await api<undefined, AxiosResponse<UserResponse>>({
        baseURL: apiPrefix,
        url: getUserURL,
        headers: {
          Cookie: cookies,
        },
      })

      const user = response.data

      if (user.avatar && user.avatar !== '') {
        dispatch(getUserAvatar({ pathToFile: user.avatar, cookies }))
      }

      return user
    } catch (err) {
      if (!isAxiosError(err)) {
        throw err
      }

      return rejectWithValue(err?.response?.data)
    }
  },
)

export const getUserAvatar = createAsyncThunk(
  'user/getAvatar',
  async (
    { pathToFile, cookies }: { pathToFile: string; cookies?: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await api<undefined, AxiosResponse<Blob>>({
        baseURL: apiPrefix,
        url: staticURL + pathToFile,
        method: Methods.GET,
        responseType: 'blob',
        headers: {
          Cookie: cookies,
        },
      })

      return URL.createObjectURL(response.data)
    } catch (err) {
      if (!isAxiosError(err)) {
        throw err
      }
      return rejectWithValue(err?.response?.data)
    }
  },
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
      },
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
      },
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
