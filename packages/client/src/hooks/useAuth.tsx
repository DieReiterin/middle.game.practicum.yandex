import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/ducks/store'
import {
  getOauthAccessToken,
  getUser,
  userLoaderSelector,
  UserResponse,
  userSelector,
} from '@/ducks/user'
import { useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { parseQueryString } from '@/utils'

export type AuthReturn = {
  user: UserResponse | null
  loader: boolean
}

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const user = useSelector(userSelector)
  const loader = useSelector(userLoaderSelector)
  const { search } = useLocation()
  const { code } = parseQueryString(search)

  const fetchUserData = (): void => {
    dispatch(getUser())
  }

  const getOAuthToken = useCallback(() => {
    if (code) dispatch(getOauthAccessToken(code))
  }, [code, dispatch])

  useEffect(() => {
    if (search) {
      getOAuthToken()
    } else fetchUserData()
  }, [search])

  return { user, loader }
}
