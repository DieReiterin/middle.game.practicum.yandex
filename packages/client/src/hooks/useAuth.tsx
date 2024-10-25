import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/ducks/store'
import {
  getAccessToken,
  getUser,
  userLoaderSelector,
  UserResponse,
  userSelector,
} from '@/ducks/user'
import { useEffect } from 'react'
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

  const fetchUserData = (): void => {
    dispatch(getUser())
  }

  const getOAuthToken = () => {
    const { code } = parseQueryString(search)
    code && dispatch(getAccessToken(code))
  }

  useEffect(() => {
    if (search) {
      getOAuthToken()
    } else fetchUserData()
  }, [search])

  return { user, loader }
}
