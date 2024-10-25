import { useSelector } from 'react-redux'
import { useAppDispatch } from '../ducks/store'
import {
  getUser,
  userLoaderSelector,
  UserResponse,
  userSelector,
} from '../ducks/user'
import { useEffect } from 'react'

export type AuthReturn = {
  user: UserResponse | null
  loader: boolean
}

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const user = useSelector(userSelector)
  const loader = useSelector(userLoaderSelector)

  const fetchUserData = (): void => {
    dispatch(getUser())
  }

  useEffect(() => {
    fetchUserData()
  }, [dispatch])

  return { user, loader }
}
