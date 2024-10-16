import Forum from '../pages/Forum/Forum'
import ForumBlockPage from '../pages/ForumBlockPage/ForumBlockPage'
import { Navigate, RouteObject } from 'react-router-dom'
import {
  Login,
  Registration,
  Main,
  GamePage,
  Leaderboard,
  Error,
  ProfilePage,
} from '../pages'
import { PathsRoutes } from './types'

const closePathUnauthorized = (
  isAuthorized: boolean,
  page: JSX.Element
): JSX.Element =>
  isAuthorized ? page : <Navigate to={PathsRoutes.Login} replace />

const closePathAuthorized = (
  isAuthorized: boolean,
  page: JSX.Element
): JSX.Element =>
  isAuthorized ? <Navigate to={PathsRoutes.Main} replace /> : page

export const getRoutes = (isAuthorized: boolean): RouteObject[] => [
  {
    path: PathsRoutes.Registration,
    element: closePathAuthorized(isAuthorized, <Registration />),
  },
  {
    path: PathsRoutes.Login,
    element: closePathAuthorized(isAuthorized, <Login />),
  },
  {
    path: PathsRoutes.Main,
    element: closePathUnauthorized(isAuthorized, <Main />),
  },
  {
    path: PathsRoutes.GamePage,
    element: closePathUnauthorized(isAuthorized, <GamePage />),
  },
  {
    path: PathsRoutes.Profile,
    element: closePathUnauthorized(isAuthorized, <ProfilePage />),
  },
  {
    path: '*',
    element: <Error title="404" text="Не туда попали" />,
  },
  {
    path: PathsRoutes.Leaderboard,
    element: closePathUnauthorized(isAuthorized, <Leaderboard />),
  },
  {
    path: PathsRoutes.Forum,
    element: closePathUnauthorized(isAuthorized, <Forum />),
  },
  {
    path: PathsRoutes.ForumBlockPage,
    element: closePathUnauthorized(isAuthorized, <ForumBlockPage />),
  },
]
