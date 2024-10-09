import { FC } from 'react'
import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import { PathsRoutes } from '../../router/types'
import { Profile } from './components'
import styles from './ProfilePage.module.scss'

export const ProfilePage: FC = () => {
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
        <Profile />
      </div>
    </div>
  )
}
