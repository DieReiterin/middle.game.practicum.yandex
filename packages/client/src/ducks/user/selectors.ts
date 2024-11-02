import { RootState } from '../store'
import { UserState } from './types'

export const userSelector = (state: RootState): UserState['user'] =>
  state.userInfo.user

export const userAvatarSelector = (state: RootState): UserState['avatarUrl'] =>
  state.userInfo.avatarUrl

export const userLoaderSelector = (state: RootState): UserState['loading'] =>
  state.userInfo.loading

export const userErrorSelector = (state: RootState): UserState['error'] =>
  state.userInfo.error

export const userServiceIdSelector = (
  state: RootState,
): UserState['serviceId'] => state.userInfo.serviceId
