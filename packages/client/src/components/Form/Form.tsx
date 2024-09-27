import { Box, Grid2, Button, ButtonProps } from '@mui/material'
import { FC, FormEventHandler } from 'react'
import { FormField, FormFieldProps } from '..'
import styles from './Form.module.scss'

export interface FormProps {
  name: string
  items: FormFieldProps[]
  buttons: ButtonProps[]
  onSubmit?: FormEventHandler<HTMLFormElement>
}

export const Form: FC<FormProps> = ({ name, items, buttons, onSubmit }) => {
  return (
    <Box component="form" noValidate name={name} onSubmit={onSubmit}>
      <Grid2 container spacing={10} direction="column" className={styles.form}>
        <Grid2 flex="1 1 auto">
          <Grid2 container spacing={2} direction="column">
            {items.map(props => (
              <FormField {...props} ref={props.ref} key={props.name} />
            ))}
          </Grid2>
        </Grid2>
        <Grid2 container spacing={1} direction="column">
          {buttons.map(props => (
            <Button key={props.title} {...props}>
              {props.title}
            </Button>
          ))}
        </Grid2>
      </Grid2>
    </Box>
  )
}
