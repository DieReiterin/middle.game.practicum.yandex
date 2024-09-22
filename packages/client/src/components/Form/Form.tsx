import { Box, TextFieldProps, Grid2, Button, ButtonProps } from '@mui/material'
import { FC } from 'react'
import { Input } from '..'

export interface FormProps {
  name: string
  items: TextFieldProps[]
  buttons: ButtonProps[]
}

export const Form: FC<FormProps> = ({ name, items, buttons }) => {
  return (
    <Box component="form" noValidate name={name}>
      <Grid2 container spacing={4} direction="column">
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
  )
}
