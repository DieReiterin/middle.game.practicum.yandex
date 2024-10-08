import { FC } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import { PathsRoutes } from '../../router/types'
// import { Profile } from '@/components/Profile'
import styles from './Profile.module.scss'

export const Profile: FC = () => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(PathsRoutes.Main)
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.leftPanel}>
        <nav className={styles.nav}>
          <IconButton
            className={styles.btn}
            onClick={handleBackClick}
            aria-label="назад">
            <ArrowBackIcon />
          </IconButton>
        </nav>
      </div>
      <div className={styles.main}>
        <Typography>main</Typography>
      </div>
    </div>
  )
}
