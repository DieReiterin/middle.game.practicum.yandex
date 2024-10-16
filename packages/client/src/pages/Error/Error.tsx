import { FC } from 'react'

import { Box, Grid2, Typography } from '@mui/material'
import styles from './Error.module.scss'
export type ErrorProps = {
  title: string
  descr: string
  text: string
}

export const Error: FC<ErrorProps> = ({ text, descr, title }) => {
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
            {descr}
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
      </Grid2>
    </Box>
  )
}
