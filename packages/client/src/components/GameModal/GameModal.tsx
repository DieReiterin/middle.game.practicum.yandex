import { FC } from 'react'
import { Box, Button, Grid2, Modal, Typography } from '@mui/material'
import { ButtonLink } from '@/components/ButtonLink'
import { PathsRoutes } from '@/router/types'
import styles from './GameModal.module.scss'
import { actions } from './const'
import { TGameModalMode, TGameModalAction } from './types'

interface IGameModalProps {
  mode: TGameModalMode
  modalAction: (action: TGameModalAction) => void
}

export const GameModal: FC<IGameModalProps> = ({ mode, modalAction }) => {
  const renderTitle = (text: string) => (
    <Typography
      sx={{ marginBottom: theme => theme.spacing(2) }}
      variant="h6"
      textAlign="center">
      {text}
    </Typography>
  )
  const renderBtn = (text: string, onClick: () => void) => (
    <Button
      sx={{ marginBottom: theme => theme.spacing(2) }}
      fullWidth
      disableElevation
      variant="contained"
      onClick={onClick}>
      {text}
    </Button>
  )

  const contentElems = {
    gameTips: (
      <>
        <Box className={styles.actionsWrapper}>
          <Grid2 container spacing={1} direction="column">
            {actions.map(({ key, action }) => {
              const keyCode = Array.isArray(key)
                ? '- ' + key.join('/') + ' -'
                : '- ' + key + ' -'
              return (
                <Grid2 container size={12} key={action}>
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
      </>
    ),
    navLinks: (
      <>
        <ButtonLink
          sx={{ marginBottom: theme => theme.spacing(2) }}
          fullWidth
          disableElevation
          variant="outlined"
          to={PathsRoutes.Leaderboard}>
          Лидерборд
        </ButtonLink>
        <ButtonLink
          sx={{ marginBottom: theme => theme.spacing(2) }}
          fullWidth
          to={PathsRoutes.Main}
          disableElevation
          variant="outlined">
          На главную
        </ButtonLink>
      </>
    ),
  }

  const contentVariants: Record<TGameModalMode, JSX.Element | null> = {
    start: (
      <>
        {renderTitle('Добро пожаловать в игру Mage Fight!')}
        {contentElems.gameTips}
        {renderBtn('Начать игру', () => modalAction('play'))}
      </>
    ),
    pause: (
      <>
        {renderTitle('Пауза')}
        {contentElems.gameTips}
        {renderBtn('Продолжить игру', () => modalAction('play'))}
      </>
    ),
    win: (
      <>
        {renderTitle('Победа!')}
        {renderBtn('Новый уровень', () => modalAction('nextLevel'))}
        {contentElems.navLinks}
      </>
    ),
    lose: (
      <>
        {renderTitle('Вы проиграли')}
        {renderBtn('Начать заново', () => modalAction('restart'))}
        {contentElems.navLinks}
      </>
    ),
    closed: null,
  }

  return (
    <>
      <Modal open={mode !== 'closed'} className={styles.wrapper}>
        <Box className={styles.modal}>{contentVariants[mode] || null}</Box>
      </Modal>
    </>
  )
}
