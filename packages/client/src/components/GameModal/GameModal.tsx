import { Dispatch, FC, SetStateAction, useState } from 'react'
import { Box, Button, Grid2, Modal, Typography } from '@mui/material'
import styles from './GameModal.module.scss'
import { ButtonLink } from '../ButtonLink'
import { PathsRoutes } from '../../router/types'
import { actions } from './const'
import { TGameModalMode } from './types'

interface IGameModalProps {
    openMode: TGameModalMode
    setOpenMode: Dispatch<SetStateAction<TGameModalMode>>
}

export const GameModal: FC<IGameModalProps> = ({ openMode, setOpenMode }) => {
    const [isStart, setStart] = useState(false)

    const handleClose = () => {
        if (openMode === 'start') setStart(true)
        setOpenMode('closed')
    }

    return (
        <>
            <Modal open={openMode !== 'closed'} className={styles.wrapper}>
                <Box className={styles.modal}>
                    <Typography variant="h6" textAlign="center">
                        Пауза
                    </Typography>
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
                    <Button
                        fullWidth
                        disableElevation
                        variant="contained"
                        onClick={handleClose}>
                        Продолжить игру
                    </Button>
                    <ButtonLink
                        fullWidth
                        disableElevation
                        variant="contained"
                        to={PathsRoutes.Leaderboard}>
                        Лидерборд
                    </ButtonLink>
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
