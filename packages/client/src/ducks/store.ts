import { Dispatch } from 'react'

import {
  AnyAction,
  combineReducers,
  configureStore,
  ThunkDispatch,
} from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { UserState, reducer as userReducer } from './user'

declare global {
  interface Window {
    APP_INITIAL_STATE: Partial<{ userInfo: UserState | undefined }>
  }
}

export const reducer = combineReducers({
  userInfo: userReducer,
})

export const store = configureStore({
  reducer,
  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
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

export type RootState = ReturnType<typeof store.getState>
