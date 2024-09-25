import { Box } from '@mui/material'
import { Navigation, NavigationProps, Routes } from './conponents'
import { FC } from 'react'
import styles from './Main.module.scss'
import logo from '../../assets/images/logo.png'

const buttons: NavigationProps['buttons'] = [
  { title: 'Начать игру', link: Routes.Game },
  { title: 'Профиль и Настройки', link: Routes.Profile },
  { title: 'Лидерборд', link: Routes.Leaderboard },
  { title: 'Форум', link: Routes.Forum },
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
