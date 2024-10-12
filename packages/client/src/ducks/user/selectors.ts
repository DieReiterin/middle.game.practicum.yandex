import { RootState } from '../store'
import { UserState } from './types'

export const userSelector = (state: RootState): UserState['user'] =>
  state.userData.user

export const userAvatarSelector = (state: RootState): UserState['avatarUrl'] =>
  state.userData.avatarUrl

export const userLoaderSelector = (state: RootState): UserState['loading'] =>
  state.userData.loading

export const userErrorSelector = (state: RootState): UserState['error'] =>
  state.userData.error
