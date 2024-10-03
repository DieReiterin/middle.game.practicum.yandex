import { TextField, TextFieldProps } from '@mui/material'
import { FC } from 'react'
import styles from './Input.module.scss'

export const Input: FC<TextFieldProps> = props => {
  return <TextField className={styles.input} {...props} variant="standard" />
}
