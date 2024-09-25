import { RouteObject } from 'react-router-dom'
import { Registration, Game } from '../pages'
import { PathsRoutes } from './types'

export const routes: RouteObject[] = [
  {
    path: PathsRoutes.Main,
    element: <>Вот тут будет жить ваше приложение :)</>,
  },
  {
    path: PathsRoutes.Registration,
    element: <Registration />,
  },
  {
    path: PathsRoutes.Game,
    element: <Game />,
  },
]
