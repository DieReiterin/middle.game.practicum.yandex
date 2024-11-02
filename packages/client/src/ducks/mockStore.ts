import { configureStore } from '@reduxjs/toolkit'
const initialState = {
  userInfo: {
    user: null,
    avatarUrl: '',
    loading: false,
    error: undefined,
  },
}

export const mockStore = configureStore({
  reducer: {
    userInfo: (state = initialState.userInfo) => state,
  },
})
