import { Stack } from '@mui/material'
import { FC } from 'react'
import {
  colorBtn,
  colorBtnHover,
  alabaster,
} from '../../../../assets/styles/vars'
import { ButtonLink, ButtonLinkProps } from '../../../../components/ButtonLink'
import styles from './Navigation.module.scss'

export type NavigationProps = {
  buttons: ButtonLinkProps[]
}

export const Navigation: FC<NavigationProps> = ({ buttons }) => {
  return (
    <Stack spacing={4.5} className={styles.navigation}>
      {buttons.map(({ title, to, ...rest }) => (
        <ButtonLink
          key={title}
          to={to}
          sx={{
            backgroundColor: theme => theme.palette.button.active,
            color: theme => theme.palette.text.primary,
            '&:hover': {
              backgroundColor: theme => theme.palette.button.hover,
            },
          }}
          className={styles.button}
          {...rest}>
          {title}
        </ButtonLink>
      ))}
    </Stack>
  )
}
