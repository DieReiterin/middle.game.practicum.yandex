import { FC } from 'react'

import { FormFullScreen } from '../../components'
import { useNavigate } from 'react-router-dom'
import { PathsRoutes } from '../../router/types'
import { TextFieldProps } from '@mui/material'

const formItems: TextFieldProps[] = [
  { label: 'Логин', name: 'login' },
  { label: 'Пароль', name: 'password', type: 'password' },
]

export const Login: FC = () => {
  const navigate = useNavigate()

  const handleRegistrationButtonClick = (): void =>
    navigate(PathsRoutes.Registration)

  return (
    <FormFullScreen
      title="Вход"
      name="login"
      items={formItems}
      buttons={[
        {
          title: 'Войти',
          variant: 'contained',
        },
        {
          title: 'Регистрация',
          onClick: handleRegistrationButtonClick,
        },
      ]}
    />
  )
}
