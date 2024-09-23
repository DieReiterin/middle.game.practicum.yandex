import { Box, Grid2, Typography } from '@mui/material'
import { FC } from 'react'
import styles from './FormFullScreen.module.scss'
import { Form, FormProps } from '..'

export interface FormFullScreenProps extends FormProps {
  title: string
}

export const FormFullScreen: FC<FormFullScreenProps> = ({
  title,
  ...otherProps
}) => {
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.form}>
        <Grid2 container spacing={4} direction="column">
          <Grid2>
            <Typography variant="h5" textAlign="center">
              {title}
            </Typography>
          </Grid2>
          <Grid2>
            <Form {...otherProps} />
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  )
}
