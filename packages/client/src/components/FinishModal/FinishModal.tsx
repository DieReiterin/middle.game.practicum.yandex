import { FC } from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'
import styles from './FinishModal.module.scss'

import { TFinishMode } from './types'
import { ButtonLink } from '../ButtonLink'
import { PathsRoutes } from '../../router/types'

interface IPreviewModalProps {
  mode: TFinishMode
  onStart: () => void
}

export const FinishModal: FC<IPreviewModalProps> = ({ mode, onStart }) => {
  const title = mode === 'win' ? 'Победа!' : 'Вы проиграли :('

  const handleStartGame = () => {
    onStart()
  }

  return (
    <>
      <Modal open={true} className={styles.wrapper}>
        <Box className={styles.modal}>
          <Typography variant="h6" textAlign="center">
            {title}
          </Typography>
          <ButtonLink
            fullWidth
            disableElevation
            variant="contained"
            to={PathsRoutes.Leaderboard}>
            Лидерборд
          </ButtonLink>
          <Button
            fullWidth
            disableElevation
            variant="contained"
            onClick={handleStartGame}>
            Заново
          </Button>
          <ButtonLink
            fullWidth
            to={PathsRoutes.Main}
            disableElevation
            variant="contained">
            На главную
          </ButtonLink>
        </Box>
      </Modal>
    </>
  )
}
