import { FC } from 'react'
import { Form, FormFieldProps, FullScreenWrapper } from '@/components'
import { useNavigate } from 'react-router-dom'
import { PathsRoutes } from '@/router/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { getValidationScheme, validationErrorMessage } from '@/constants'
import { useAppDispatch } from '@/ducks/store'
import { signin, userErrorSelector } from '@/ducks/user'
import { useSelector } from 'react-redux'
import { YandexAuthButton } from '@/components/YandexAuthButton'

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
  const error = useSelector(userErrorSelector)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleRegistrationButtonClick = (): void =>
    navigate(PathsRoutes.Registration)

  const handleLoginButtonClick: SubmitHandler<FormInput> = async data => {
    dispatch(signin(data))
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
      <YandexAuthButton />
    </FullScreenWrapper>
  )
}
