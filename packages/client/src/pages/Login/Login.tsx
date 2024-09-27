import { FC } from 'react'

import { Form, FormFieldProps, FormFullScreen } from '../../components'
import { useNavigate } from 'react-router-dom'
import { PathsRoutes } from '../../router/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { getValidationScheme, validationMessage } from '../../constants'

enum Fields {
  Login = 'login',
  Password = 'password',
}

interface FormInput {
  login: Fields.Login
  password: Fields.Password
}

export const Login: FC = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({ mode: 'onBlur' })

  const handleRegistrationButtonClick = (): void =>
    navigate(PathsRoutes.Registration)

  const handleLoginButtonClick: SubmitHandler<FormInput> = data => {
    console.log(data)
  }

  const formItems: FormFieldProps[] = [
    {
      label: 'Логин',
      message: validationMessage.login,
      error: Boolean(errors?.login),
      ...register('login', getValidationScheme<FormInput, 'login'>('login')),
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
  ]

  return (
    <FormFullScreen title="Вход">
      <Form
        name="login"
        items={formItems}
        onSubmit={handleSubmit(handleLoginButtonClick)}
        buttons={[
          {
            type: 'submit',
            title: 'Войти',
            variant: 'contained',
          },
          {
            title: 'Регистрация',
            onClick: handleRegistrationButtonClick,
          },
        ]}
      />
    </FormFullScreen>
  )
}
