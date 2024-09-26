import { Button, ButtonProps } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { PathsRoutes } from '../../router/types'

export interface ButtonLinkProps extends ButtonProps {
  to: PathsRoutes
}

export const ButtonLink: FC<ButtonLinkProps> = ({ children, to, ...rest }) => {
  return (
    <Button component={Link} to={to} {...rest}>
      {children}
    </Button>
  )
}
