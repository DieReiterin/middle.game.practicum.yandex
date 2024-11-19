import { Dispatch } from 'react'

import {
  AnyAction,
  combineReducers,
  configureStore,
  ThunkDispatch,
} from '@reduxjs/toolkit'
import { useDispatch, useStore as useStoreBase } from 'react-redux'

import { UserState, reducer as userReducer } from './user'
import { themeReducer, getInitialTheme } from './theme'
import { reducer as emojisReducer } from './emojis'

declare global {
  interface Window {
    APP_INITIAL_STATE: Partial<{ userInfo: UserState | undefined }>
  }
}

export const reducer = combineReducers({
  userInfo: userReducer,
  theme: themeReducer,
  emojis: emojisReducer,
})

export const store = configureStore({
  reducer,
  preloadedState:
    typeof window === 'undefined'
      ? {
          theme: getInitialTheme(),
        }
      : {
          ...window.APP_INITIAL_STATE,
          theme: getInitialTheme(),
        },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

export const useAppDispatch = (): ThunkDispatch<
  {
    userInfo: UserState
  },
  undefined,
  AnyAction
> &
  Dispatch<AnyAction> => useDispatch<typeof store.dispatch>()

export const useStore: () => typeof store = useStoreBase

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type PageInitArgs = {
  dispatch: AppDispatch
  state: RootState
  cookies?: string
}
