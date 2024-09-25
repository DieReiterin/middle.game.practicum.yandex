import { Box } from '@mui/material'
import { Navigation } from './conponents'
import { FC } from 'react'
import styles from './Main.module.scss'
import logo from '../../assets/images/logo.png'

export const Main: FC = () => {
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.main}>
        <Box className={styles.logoWrapper}>
          <img src={logo} className={styles.logo} alt="Mage Fight Logo" />
        </Box>
        <Navigation
          buttons={[
            {
              title: 'Начать игру',
              link: '/game',
            },
            {
              title: 'Профиль и Настройки',
              link: '/profile',
            },
            {
              title: 'Лидерборд',
              link: '/leaderboard',
            },
            {
              title: 'Форум',
              link: '/forum',
            },
          ]}
        />
      </Box>
    </Box>
  )
}
