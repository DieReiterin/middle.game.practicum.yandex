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

export const routes: RouteObject[] = [
  {
    path: PathsRoutes.Registration,
    Component: Registration,
  },
  {
    path: PathsRoutes.Login,
    Component: Login,
  },
  {
    path: PathsRoutes.Main,
    Component: Main,
  },
  {
    path: PathsRoutes.GamePage,
    Component: GamePage,
  },
  {
    path: PathsRoutes.Profile,
    Component: ProfilePage,
  },
  {
    path: PathsRoutes.Leaderboard,
    Component: Leaderboard,
  },
  {
    path: PathsRoutes.Forum,
    Component: Forum,
  },
  {
    path: PathsRoutes.ForumBlockPage,
    Component: ForumBlockPage,
  },
  {
    path: '*',
    element: (
      <Error title="404" descr="Не туда попали" text="Давайте вернемся назад" />
    ),
  },
]
