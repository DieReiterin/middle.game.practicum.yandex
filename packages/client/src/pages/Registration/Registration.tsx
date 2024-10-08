import { FC, useState } from 'react'

import { Form, FormFieldProps, FullScreenWrapper } from '../../components'
import { useNavigate } from 'react-router-dom'
import { PathsRoutes } from '../../router/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { getValidationScheme, validationErrorMessage } from '../../constants'
import { isAxiosError } from 'axios'
import { useAppDispatch } from '../../ducks/store'
import { signup, userErrorSelector } from '../../ducks/user'
import { useSelector } from 'react-redux'

enum Fields {
  Email = 'email',
  Login = 'login',
  FirstName = 'first_name',
  SecondName = 'second_name',
  Phone = 'phone',
  Password = 'password',
  PasswordOk = 'password_ok',
}

type FormInput = {
  email: Fields.Email
  login: Fields.Login
  firstName: Fields.FirstName
  secondName: Fields.SecondName
  phone: Fields.Phone
  password: Fields.Password
  passwordOk: Fields.PasswordOk
}

export const Registration: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({ mode: 'onBlur' })
  const error = useSelector(userErrorSelector)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLoginButtonClick = (): void => navigate(PathsRoutes.Login)

  const handleCreateButtonClick: SubmitHandler<FormInput> = async data => {
    dispatch(
      signup({
        email: data.email,
        first_name: data.firstName,
        login: data.login,
        password: data.password,
        phone: data.phone,
        second_name: data.secondName,
      })
    )
  }

  const formItems: FormFieldProps[] = [
    {
      label: 'Почта',
      message: validationErrorMessage.email,
      error: Boolean(errors?.email),
      ...register(
        'email',
        getValidationScheme<FormInput, 'email'>('email', true)
      ),
    },
    {
      label: 'Логин',
      message: validationErrorMessage.login,
      error: Boolean(errors?.login),
      ...register(
        'login',
        getValidationScheme<FormInput, 'login'>('login', true)
      ),
    },
    {
      label: 'Имя',
      message: validationErrorMessage.firstName,
      error: Boolean(errors?.firstName),
      ...register(
        'firstName',
        getValidationScheme<FormInput, 'firstName'>('firstName', true)
      ),
    },
    {
      label: 'Фамилия',
      message: validationErrorMessage.secondName,
      error: Boolean(errors?.secondName),
      ...register(
        'secondName',
        getValidationScheme<FormInput, 'secondName'>('secondName', true)
      ),
    },
    {
      label: 'Телефон',
      message: validationErrorMessage.phone,
      error: Boolean(errors?.phone),
      ...register(
        'phone',
        getValidationScheme<FormInput, 'phone'>('phone', true)
      ),
    },
    {
      label: 'Пароль',
      type: 'password',
      message: validationErrorMessage.password,
      error: Boolean(errors?.password),
      ...register(
        'password',
        getValidationScheme<FormInput, 'password'>('password', true)
      ),
    },
    {
      label: 'Пароль (ещё раз)',
      type: 'password',
      message: validationErrorMessage.passwordOk,
      error: Boolean(errors?.passwordOk),
      ...register('passwordOk', {
        validate: (value, form) => {
          return form.password === value.toString()
        },
      }),
    },
  ]

  return (
    <FullScreenWrapper title="Регистрация">
      <Form
        error={error}
        items={formItems}
        name="registration"
        onSubmit={handleSubmit(handleCreateButtonClick)}
        buttons={[
          {
            type: 'submit',
            title: 'Создать аккаунт',
            variant: 'contained',
          },
          {
            title: 'Вход',
            onClick: handleLoginButtonClick,
          },
        ]}
      />
    </FullScreenWrapper>
  )
}
