import { RouteObject } from 'react-router-dom'
import { Login, Registration, Main, Game } from '../pages'
import GameDemo from '../game/GameDemo'
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
    path: PathsRoutes.Game,
    element: <Game />,
  },
  {
    path: PathsRoutes.Login,
    element: <Login />,
  },
  {
    path: PathsRoutes.GameDemo,
    element: <GameDemo />,
  },
]
