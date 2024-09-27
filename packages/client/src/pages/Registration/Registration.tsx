import { FC } from 'react'

import { Form, FormFieldProps, FormFullScreen } from '../../components'
import { useNavigate } from 'react-router-dom'
import { PathsRoutes } from '../../router/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { getValidationScheme, validationMessage } from '../../constants'

enum Fields {
  Email = 'email',
  Login = 'login',
  FirstName = 'first_name',
  SecondName = 'second_name',
  Phone = 'phone',
  Password = 'password',
  PasswordOk = 'password_ok',
}

interface FormInput {
  email: Fields.Email
  login: Fields.Login
  firstName: Fields.FirstName
  secondName: Fields.SecondName
  phone: Fields.Phone
  password: Fields.Password
  passwordOk: Fields.PasswordOk
}

export const Registration: FC = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({ mode: 'onBlur' })

  const handleLoginButtonClick = (): void => navigate(PathsRoutes.Login)

  const handleCreateButtonClick: SubmitHandler<FormInput> = data => {
    console.log(data)
  }

  const formItems: FormFieldProps[] = [
    {
      label: 'Почта',
      message: validationMessage.email,
      error: Boolean(errors?.email),
      ...register('email', getValidationScheme<FormInput, 'email'>('email')),
    },
    {
      label: 'Логин',
      message: validationMessage.login,
      error: Boolean(errors?.login),
      ...register('login', getValidationScheme<FormInput, 'login'>('login')),
    },
    {
      label: 'Имя',
      message: validationMessage.firstName,
      error: Boolean(errors?.firstName),
      ...register(
        'firstName',
        getValidationScheme<FormInput, 'firstName'>('firstName')
      ),
    },
    {
      label: 'Фамилия',
      message: validationMessage.secondName,
      error: Boolean(errors?.secondName),
      ...register(
        'secondName',
        getValidationScheme<FormInput, 'secondName'>('secondName')
      ),
    },
    {
      label: 'Телефон',
      message: validationMessage.phone,
      error: Boolean(errors?.phone),
      ...register('phone', getValidationScheme<FormInput, 'phone'>('phone')),
    },
    {
      label: 'Пароль',
      type: 'password',
      message: validationMessage.password,
      error: Boolean(errors?.password),
      ...register(
        'password',
        getValidationScheme<FormInput, 'password'>('password')
      ),
    },
    {
      label: 'Пароль (ещё раз)',
      type: 'password',
      message: validationMessage.passwordOk,
      error: Boolean(errors?.passwordOk),
      ...register('passwordOk', {
        validate: (value, form) => {
          return form.password === value.toString()
        },
      }),
    },
  ]

  return (
    <FormFullScreen title="Регистрация">
      <Form
        name="registration"
        items={formItems}
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
    </FormFullScreen>
  )
}
