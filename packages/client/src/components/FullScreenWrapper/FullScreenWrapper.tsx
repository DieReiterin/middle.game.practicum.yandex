import { Box, Grid2, Typography } from '@mui/material'
import { FC, PropsWithChildren } from 'react'
import styles from './FullScreenWrapper.module.scss'

export type FormFullScreenProps = {
  title: string
}

export const FullScreenWrapper: FC<PropsWithChildren<FormFullScreenProps>> = ({
  title,
  children,
}) => {
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.container}>
        <Grid2
          container
          spacing={4}
          direction="column"
          className={styles.content}>
          <Grid2>
            <Typography variant="h5" textAlign="center">
              {title}
            </Typography>
          </Grid2>
          <Grid2 flex="1 1 auto">{children}</Grid2>
        </Grid2>
      </Box>
    </Box>
  )
}
