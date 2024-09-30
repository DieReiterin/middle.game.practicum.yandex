import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { user, UserResponse } from '../api/auth/user'
import { isAxiosError } from 'axios'
import { CircularProgress } from '@mui/material'
import { Loader } from '../components/Loader'

export type AuthContextInterface = {
  userInfo?: UserResponse
  fetchUserData: () => Promise<void>
  setUserInfo: Dispatch<SetStateAction<UserResponse | undefined>>
}

export const AuthContext = createContext<AuthContextInterface | null>(null)

export const AuthProvider = ({
  children,
}: {
  children: ReactNode
}): ReactElement => {
  const [userInfo, setUserInfo] = useState<UserResponse>()
  const [loading, setLoading] = useState<boolean>(true)

  const fetchUserData = async () => {
    setLoading(true)
    const result = await user()

    if (isAxiosError(result)) {
      setUserInfo(undefined)
    } else {
      setUserInfo(result?.data)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const value: AuthContextInterface = useMemo(() => {
    return {
      userInfo,
      setUserInfo,
      fetchUserData,
    }
  }, [userInfo])

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  )
}
