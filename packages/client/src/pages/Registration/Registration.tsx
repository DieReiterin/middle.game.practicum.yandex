import { FC } from 'react'

import { Form } from '../../components'

export const Registration: FC = () => {
  return (
    <Form
      title="Регистрация"
      name="registration"
      items={[
        { label: 'Почта', name: 'email', required: true },
        { label: 'Логин', name: 'login', required: true },
        { label: 'Имя', name: 'first_name', required: true },
        { label: 'Фамилия', name: 'second_name', required: true },
        { label: 'Телефон', name: 'phone', required: true },
        { label: 'Пароль', name: 'password', required: true },
        { label: 'Пароль (ещё раз)', name: 'password_ok', required: true },
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
