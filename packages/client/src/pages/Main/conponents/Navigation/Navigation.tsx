import { Stack, Button, ButtonProps } from '@mui/material'
import { FC } from 'react'
import styles from './Navigation.module.scss'
import {
  colorBtn,
  colorBtnHover,
  colorText3,
} from '../../../../assets/styles/vars'
import { Link } from 'react-router-dom'

interface NavigationButtonProps extends ButtonProps {
  link: string
}

interface NavigationProps {
  buttons: NavigationButtonProps[]
}

export const Navigation: FC<NavigationProps> = ({ buttons }) => {
  return (
    <Stack spacing={4.5} className={styles.navigation}>
      {buttons.map(({ title, link, ...rest }) => (
        <Button
          key={title}
          component={Link}
          to={link}
          sx={{
            backgroundColor: colorBtn,
            color: colorText3,
            '&:hover': {
              backgroundColor: colorBtnHover,
            },
          }}
          className={styles.button}
          {...rest}>
          {title}
        </Button>
      ))}
    </Stack>
  )
}
