import { useEffect } from 'react'
import Forum, { initForumPage } from '../pages/Forum/Forum'
import ForumBlockPage, {
  initForumBlockPage,
} from '../pages/ForumBlockPage/ForumBlockPage'
import { Navigate, RouteObject } from 'react-router-dom'
import {
  Login,
  Registration,
  Main,
  GamePage,
  Leaderboard,
  Error,
  ProfilePage,
  initRegistrationPage,
  initLoginPage,
  initMainPage,
  initGamePage,
  initLeaderboardPage,
  initErrorPage,
} from '../pages'
import { PathsRoutes } from './types'
import { initProfilePage } from '@/pages/ProfilePage/components'
import { PageInitArgs } from '@/ducks/store'
import { useSelector } from 'react-redux'
import {
  fetchThemes,
  getUserTheme,
  setUserTheme,
  setCurrentTheme,
  currentThemeSelector,
} from '@/ducks/theme'
import { useAppDispatch } from '@/ducks/store'
import { useAuth } from '@/hooks'
import { FC, PropsWithChildren } from 'react'
import { Loader } from '@/components'

type Route = RouteObject & {
  fetchData: (props: PageInitArgs) => Promise<unknown>
}

export type PageCookies = { [key: string]: string }

const routesConfig: Route[] = [
  {
    path: PathsRoutes.Registration,
    element: <Registration />,
    fetchData: initRegistrationPage,
  },
  {
    path: PathsRoutes.Login,
    element: <Login />,
    fetchData: initLoginPage,
  },
  {
    path: PathsRoutes.Main,
    element: <Main />,
    fetchData: initMainPage,
  },
  {
    path: PathsRoutes.GamePage,
    element: <GamePage />,
    fetchData: initGamePage,
  },
  {
    path: PathsRoutes.Profile,
    element: <ProfilePage />,
    fetchData: initProfilePage,
  },
  {
    path: PathsRoutes.Leaderboard,
    element: <Leaderboard />,
    fetchData: initLeaderboardPage,
  },
  {
    path: PathsRoutes.Forum,
    element: <Forum />,
    fetchData: initForumPage,
  },
  {
    path: PathsRoutes.ForumBlockPage,
    element: <ForumBlockPage />,
    fetchData: initForumBlockPage,
  },
  {
    path: '*',
    element: (
      <Error title="404" descr="Не туда попали" text="Давайте вернемся назад" />
    ),
    fetchData: initErrorPage,
  },
]

const Auth: FC<PropsWithChildren<{ path?: string }>> = ({ path, children }) => {
  const { loader, user } = useAuth()
  const dispatch = useAppDispatch()
  const currentTheme = useSelector(currentThemeSelector)
  const isAuthorized = Boolean(user)

  useEffect(() => {
    if (user && user.id && localStorage.getItem('themeId')) {
      const themeId = parseInt(localStorage.getItem('themeId')!, 10)
      dispatch(setUserTheme({ userId: user.id, themeId }))
      dispatch(setCurrentTheme({ id: themeId, name: '' }))
      localStorage.removeItem('themeId')
    }
  }, [user])

  useEffect(() => {
    dispatch(fetchThemes())

    if (user && user.id) {
      dispatch(getUserTheme(user.id))
    } else {
      const storedThemeId = localStorage.getItem('themeId')
      if (
        storedThemeId &&
        currentTheme?.id &&
        storedThemeId !== currentTheme.id.toString()
      ) {
        const themeId = parseInt(storedThemeId, 10)
        dispatch(setCurrentTheme({ id: themeId, name: '' }))
      }
    }
  }, [dispatch, user])

  if (!isAuthorized && path !== PathsRoutes.Registration) {
    return (
      <>
        {children}
        <Navigate to={PathsRoutes.Login} replace />
      </>
    )
  }

  return loader ? <Loader /> : children
}

export const routes: Route[] = routesConfig.map(
  ({ path, element, ...otherData }) => ({
    path,
    element: <Auth path={path}>{element}</Auth>,
    ...otherData,
  }),
)
