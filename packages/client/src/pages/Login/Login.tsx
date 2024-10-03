import { FC, useContext, useState } from 'react'

import { Form, FormFieldProps, FullScreenWrapper } from '../../components'
import { useNavigate } from 'react-router-dom'
import { PathsRoutes } from '../../router/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { getValidationScheme, validationErrorMessage } from '../../constants'
import { AuthContext } from '../../context'
import { signin } from '../../api/auth/signin'
import { isAxiosError } from 'axios'

enum Fields {
  Login = 'login',
  Password = 'password',
}

type FormInput = {
  login: Fields.Login
  password: Fields.Password
}

export const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({ mode: 'onBlur' })
  const [error, setError] = useState<string>()

  const navigate = useNavigate()
  const context = useContext(AuthContext)

  const handleRegistrationButtonClick = (): void =>
    navigate(PathsRoutes.Registration)

  const handleLoginButtonClick: SubmitHandler<FormInput> = async data => {
    setError(undefined)

    const result = await signin({
      login: data.login,
      password: data.password,
    })

    if (isAxiosError(result)) {
      setError(
        result.response?.data?.reason || 'Произошла ошибка при регистрации'
      )
    } else {
      navigate(PathsRoutes.Main)
      context?.fetchUserData()
    }
  }

  const formItems: FormFieldProps[] = [
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
      label: 'Пароль',
      type: 'password',
      message: validationErrorMessage.password,
      error: Boolean(errors?.password),
      ...register(
        'password',
        getValidationScheme<FormInput, 'password'>('password', true)
      ),
    },
  ]

  return (
    <FullScreenWrapper title="Вход">
      <Form
        error={error}
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
    </FullScreenWrapper>
  )
}
