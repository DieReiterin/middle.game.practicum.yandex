import { RouteObject } from 'react-router-dom'
import { Registration, Main } from '../pages'
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
]
