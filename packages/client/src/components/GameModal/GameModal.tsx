import { FC } from 'react'
import { Box, Button, Grid2, Modal, Typography } from '@mui/material'
import styles from './GameModal.module.scss'
import { ButtonLink } from '../ButtonLink'
import { PathsRoutes } from '../../router/types'
import { actions } from './const'
import { TGameModalMode, TGameModalAction } from './types'

interface IGameModalProps {
    mode: TGameModalMode
    modalAction: (action: TGameModalAction) => void
}

export const GameModal: FC<IGameModalProps> = ({ mode, modalAction }) => {
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
                                        <Typography variant="subtitle1">
                                            {keyCode}
                                        </Typography>
                                    </Grid2>
                                    <Grid2 size={8}>
                                        <Typography variant="subtitle1">
                                            {action}
                                        </Typography>
                                    </Grid2>
                                </Grid2>
                            )
                        })}
                    </Grid2>
                </Box>
            </>
        ),
        navBtns: (
            <>
                <ButtonLink
                    sx={{ marginBottom: '20px' }}
                    fullWidth
                    disableElevation
                    variant="outlined"
                    to={PathsRoutes.Leaderboard}>
                    Лидерборд
                </ButtonLink>
                <ButtonLink
                    sx={{ marginBottom: '20px' }}
                    fullWidth
                    to={PathsRoutes.Main}
                    disableElevation
                    variant="outlined">
                    На главную
                </ButtonLink>
            </>
        ),
    }
    const contentVariants = {
        start: (
            <>
                <Typography
                    sx={{ marginBottom: '20px' }}
                    variant="h6"
                    textAlign="center">
                    Добро пожаловать в игру Mage Fight!
                </Typography>
                {contentElems.gameTips}
                <Button
                    sx={{ marginBottom: '20px' }}
                    fullWidth
                    disableElevation
                    variant="contained"
                    onClick={() => modalAction('play')}>
                    Начать игру
                </Button>
            </>
        ),
        pause: (
            <>
                <Typography
                    sx={{ marginBottom: '20px' }}
                    variant="h6"
                    textAlign="center">
                    Пауза
                </Typography>
                {contentElems.gameTips}
                <Button
                    sx={{ marginBottom: '20px' }}
                    fullWidth
                    disableElevation
                    variant="contained"
                    onClick={() => modalAction('play')}>
                    Продолжить игру
                </Button>
            </>
        ),
        win: (
            <>
                <Typography
                    sx={{ marginBottom: '20px' }}
                    variant="h6"
                    textAlign="center">
                    Победа!
                </Typography>
                <Button
                    sx={{ marginBottom: '20px' }}
                    fullWidth
                    disableElevation
                    variant="contained"
                    onClick={() => modalAction('nextLevel')}>
                    Новый уровень
                </Button>
                {contentElems.navBtns}
            </>
        ),
        lose: (
            <>
                <Typography
                    sx={{ marginBottom: '20px' }}
                    variant="h6"
                    textAlign="center">
                    Вы проиграли
                </Typography>
                <Button
                    sx={{ marginBottom: '20px' }}
                    fullWidth
                    disableElevation
                    variant="contained"
                    onClick={() => modalAction('restart')}>
                    Начать заново
                </Button>
                {contentElems.navBtns}
            </>
        ),
        closed: null,
    }
    return (
        <>
            <Modal open={mode !== 'closed'} className={styles.wrapper}>
                <Box className={styles.modal}>
                    {contentVariants[mode] || null}
                </Box>
            </Modal>
        </>
    )
}
