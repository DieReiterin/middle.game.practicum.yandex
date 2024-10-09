import { Box } from '@mui/material'
import { Navigation, NavigationProps } from './components'
import { PathsRoutes } from '../../router/types'
import { FC } from 'react'
import styles from './Main.module.scss'
import logo from '../../assets/images/logo.png'

const buttons: NavigationProps['buttons'] = [
  { title: 'Начать игру', to: PathsRoutes.GamePage },
  { title: 'Профиль и Настройки', to: PathsRoutes.Profile },
  { title: 'Лидерборд', to: PathsRoutes.Leaderboard },
  { title: 'Форум', to: PathsRoutes.Forum },
]

export const Main: FC = () => {
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
