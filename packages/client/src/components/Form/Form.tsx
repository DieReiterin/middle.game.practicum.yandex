import {
  Box,
  TextFieldProps,
  Grid2,
  Button,
  ButtonProps,
  Typography,
} from '@mui/material'
import { FC } from 'react'
import { Input } from '..'
import styles from './Form.module.scss'

export interface FormProps {
  name: string
  title: string
  items: TextFieldProps[]
  buttons: ButtonProps[]
}

export const Form: FC<FormProps> = ({ title, name, items, buttons }) => {
  return (
    <Box className={styles.wrapper}>
      <Box component="form" noValidate name={name} className={styles.form}>
        <Grid2 container spacing={4} direction="column">
          <Grid2>
            <Typography variant="h5" textAlign="center">
              {title}
            </Typography>
          </Grid2>
          <Grid2>
            <Grid2 container spacing={1} direction="column">
              {items.map(props => (
                <Input key={props.name} {...props} />
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
    </Box>
  )
}
