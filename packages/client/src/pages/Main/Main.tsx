import { Box } from '@mui/material'
import { Navigation, NavigationProps } from './components'
import { PathsRoutes } from '../../router/types'
import { FC } from 'react'
import styles from './Main.module.scss'
import logo from '../../assets/images/logo.png'
import { usePage } from '@/hooks'
import { PageInitArgs } from '@/ducks/store'
import { getUser, userSelector } from '@/ducks/user'

const buttons: NavigationProps['buttons'] = [
  { title: 'Начать игру', to: PathsRoutes.GamePage },
  { title: 'Профиль и настройки', to: PathsRoutes.Profile },
  { title: 'Лидерборд', to: PathsRoutes.Leaderboard },
  { title: 'Форум', to: PathsRoutes.Forum },
]

export const Main: FC = () => {
  usePage({ initPage: initMainPage })

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.main}>
        <Box className={styles.logoWrapper}>
          <img src={logo} className={styles.logo} alt="Mage Fight Logo" />
        </Box>
        <Navigation buttons={buttons} />
      </Box>
    </Box>
  )
}

export const initMainPage = async ({
  dispatch,
  state,
  cookies,
}: PageInitArgs) => {
  const queue: Array<Promise<unknown>> = []

  if (!userSelector(state)) {
    queue.push(dispatch(getUser(cookies)))
  }

  return Promise.all(queue)
}
