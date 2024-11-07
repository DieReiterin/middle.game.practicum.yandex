import { FC, useEffect, useState } from 'react'
import { Box, Button, Grid2, Modal, Typography } from '@mui/material'
import { ButtonLink } from '@/components/ButtonLink'
import { PathsRoutes } from '@/router/types'
import styles from './GameModal.module.scss'
import { actions } from './const'
import { TGameModalMode, TGameModalAction } from './types'
import { getUser, sendGameData } from '@/ducks/user'
import { useAppDispatch } from '@/ducks/store'

interface IGameModalProps {
  mode: TGameModalMode
  modalAction: (action: TGameModalAction) => void
  isGamepadOn: boolean
}

export const GameModal: FC<IGameModalProps> = ({
  mode,
  modalAction,
  isGamepadOn,
}) => {
  const dispatch = useAppDispatch()
  const [user, setUser] = useState<{ first_name: string } | null>(null)
  const [points, setPoints] = useState(0)
  const [level, setLevel] = useState(1)

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await dispatch(getUser()).unwrap()
      setUser(userData)
    }

    fetchUser()
  }, [dispatch])

  useEffect(() => {
    if (mode === 'win') {
      setLevel(level + 1)
      setPoints(level * 100)
    }
    if (mode === 'lose') {
      setPoints(0)
      setLevel(1)
    }
    if (mode === 'win' || mode === 'lose') {
      sendGameData({
        myField: user?.first_name as string,
        otherField: points,
      })
    }
  }, [mode])

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

  const controlType = isGamepadOn ? 'геймпада 🎮' : 'клавиатуры ⌨️'

  const contentElems = {
    gameTips: (
      <Box className={styles.actionsWrapper}>
        <Grid2 container spacing={1} direction="column">
          <Grid2 container size={12}>
            <Typography variant="subtitle1">
              Управление игрой для {controlType}
            </Typography>
          </Grid2>
          {actions.map(({ keyboardKey, gamepadKey, action }) => {
            const key = isGamepadOn ? gamepadKey : keyboardKey
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
    <Modal open={mode !== 'closed'} className={styles.wrapper}>
      <Box className={styles.modal}>{contentVariants[mode] || null}</Box>
    </Modal>
  )
}
