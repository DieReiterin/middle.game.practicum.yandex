import { Dispatch, FC, SetStateAction, useState } from 'react'
import { Box, Button, Grid2, Modal, Typography } from '@mui/material'
import styles from './PreviewModal.module.scss'
import { actions } from './const'
import { Countdown } from '../Countdown'
import { TOpenMode } from './types'

interface IPreviewModalProps {
  openMode: TOpenMode
  setOpenMode: Dispatch<SetStateAction<TOpenMode>>
}

export const PreviewModal: FC<IPreviewModalProps> = ({
  openMode,
  setOpenMode,
}) => {
  const [isStart, setStart] = useState<boolean>(false)
  const buttonTitle = openMode === 'pause' ? 'Продолжить игру' : 'Начать игру'

  const handleClose = () => {
    if (openMode === 'start') setStart(true)
    setOpenMode('')
  }

  return (
    <>
      <Modal open={!!openMode}>
        <Box className={styles.modal}>
          <Typography variant="h6" textAlign="center">
            Добро пожаловать в игру Mage Fight!
          </Typography>
          <Box className={styles.actionsWrapper}>
            <Grid2 container spacing={1} direction="column">
              {actions.map(({ key, action }) => {
                const keyCode = Array.isArray(key)
                  ? '- ' + key.join('/') + ' -'
                  : '- ' + key + ' -'
                return (
                  <Grid2 container size={12} key={`key-${action}`}>
                    <Grid2 size={4}>
                      <Typography variant="subtitle1">{keyCode}</Typography>
                    </Grid2>
                    <Grid2 size={8}>
                      <Typography variant="subtitle1">{action}</Typography>
                    </Grid2>
                  </Grid2>
                )
              })}
            </Grid2>
          </Box>
          <Button
            fullWidth
            sx={{ marginTop: 'auto' }}
            disableElevation
            variant="contained"
            onClick={handleClose}>
            {buttonTitle}
          </Button>
        </Box>
      </Modal>
      {isStart && <Countdown />}
    </>
  )
}
