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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (search && code) {
        dispatch(getOauthAccessToken(code))
      } else if (!user) {
        dispatch(getUser())
      }
    }
  }, [search, code, dispatch])

  return { user, loader }
}
