import { FC } from 'react'

import { FormFullScreen } from '../../components'
import { useNavigate } from 'react-router-dom'
import { PathsRoutes } from '../../router/types'
import { TextFieldProps } from '@mui/material'

const formItems: TextFieldProps[] = [
  { label: 'Почта', name: 'email' },
  { label: 'Логин', name: 'login' },
  { label: 'Имя', name: 'first_name' },
  { label: 'Фамилия', name: 'second_name' },
  { label: 'Телефон', name: 'phone' },
  { label: 'Пароль', name: 'password', type: 'password' },
  { label: 'Пароль (ещё раз)', name: 'password_ok', type: 'password' },
]

export const Registration: FC = () => {
  const navigate = useNavigate()

  const handleLoginButtonClick = (): void => navigate(PathsRoutes.Login)

  return (
    <FormFullScreen
      title="Регистрация"
      name="registration"
      items={formItems}
      buttons={[
        {
          title: 'Создать аккаунт',
          variant: 'contained',
        },
        {
          title: 'Вход',
          onClick: handleLoginButtonClick,
        },
      ]}
    />
  )
}
