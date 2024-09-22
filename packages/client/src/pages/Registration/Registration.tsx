import { FC } from 'react'

import { FormFullScreen } from '../../components'

export const Registration: FC = () => {
  return (
    <FormFullScreen
      title="Регистрация"
      name="registration"
      items={[
        { label: 'Почта', name: 'email' },
        { label: 'Логин', name: 'login' },
        { label: 'Имя', name: 'first_name' },
        { label: 'Фамилия', name: 'second_name' },
        { label: 'Телефон', name: 'phone' },
        { label: 'Пароль', name: 'password' },
        { label: 'Пароль (ещё раз)', name: 'password_ok' },
      ]}
      buttons={[
        {
          title: 'Создать аккаунт',
          variant: 'contained',
        },
        {
          title: 'Вход',
        },
      ]}
    />
  )
}
