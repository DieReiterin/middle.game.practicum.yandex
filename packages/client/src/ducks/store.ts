import { Dispatch } from 'react'

import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { UserState, reducer as userReducer } from './user'

export const store = configureStore({
    reducer: {
        userInfo: userReducer,
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

export type RootState = ReturnType<typeof store.getState>
