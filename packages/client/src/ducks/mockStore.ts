import { configureStore } from '@reduxjs/toolkit'

// export const mockStore = configureStore({
//   reducer: {
//     userInfo: userReducer,
//   },
//   middleware: getDefaultMiddleware => getDefaultMiddleware(),
// })
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
