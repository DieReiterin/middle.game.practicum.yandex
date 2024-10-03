import { FC } from 'react'

import { Box, Button, Grid2, Typography } from '@mui/material'
import styles from './Error.module.scss'
import { useNavigate } from 'react-router-dom'
import { PathsRoutes } from '../../router/types'

export type ErrorProps = {
  title?: string
  text?: string
}

export const Error: FC<ErrorProps> = ({ text, title }) => {
  const navigate = useNavigate()

  const handleButtonClick = (): void => {
    navigate(PathsRoutes.Main)
  }

  return (
    <Box className={styles.wrapper}>
      <Grid2
        container
        spacing={3}
        direction="column"
        className={styles.container}>
        <Grid2>
          <Typography variant="h1" className={styles.title} fontWeight={500}>
            {title}
          </Typography>
        </Grid2>
        <Grid2>
          <Typography
            variant="subtitle1"
            className={styles.subtitle}
            fontWeight={500}>
            {text}
          </Typography>
        </Grid2>
        <Grid2 textAlign="center">
          <Button variant="text" onClick={handleButtonClick}>
            На главную
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  )
}

Error.defaultProps = {
  title: '404',
  text: 'Не туда попали',
}
