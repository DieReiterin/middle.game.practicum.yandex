import { Box, TextFieldProps } from '@mui/material'
import { forwardRef, PropsWithChildren } from 'react'
import { Input } from '../Input'
import styles from './FormField.module.scss'

export type FormFieldProps = TextFieldProps & {
  message?: string
  error?: boolean
}

export const FormField = forwardRef<
  HTMLDivElement,
  PropsWithChildren<FormFieldProps>
>((props, ref) => {
  return (
    <Box className={styles.field}>
      <Input {...props} inputRef={ref} ref={null} size="small" />
      {props.error && <p className={styles.error}>{props.message}</p>}
    </Box>
  )
})
