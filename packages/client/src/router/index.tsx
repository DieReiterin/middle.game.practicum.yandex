import { RouteObject } from 'react-router-dom'
import { Login, Registration, Main, Leaderboard } from '../pages'
import { PathsRoutes } from './types'

export const routes: RouteObject[] = [
  {
    path: PathsRoutes.StartPage,
    element: <>Вот тут будет жить ваше приложение :)</>,
  },
  {
    path: PathsRoutes.Main,
    element: <Main />,
  },
  {
    path: PathsRoutes.Registration,
    element: <Registration />,
  },
  {
    path: PathsRoutes.Login,
    element: <Login />,
  },
  {
    path: PathsRoutes.Leaderboard,
    element: <Leaderboard />,
  },
]
