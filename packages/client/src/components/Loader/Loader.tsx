import { Box, CircularProgress } from '@mui/material'
import { FC } from 'react'
import styles from './Loader.module.scss'

export const Loader: FC = () => {
  return (
    <Box className={styles?.loader}>
      <CircularProgress size={100} />
    </Box>
  )
}
