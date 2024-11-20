import { FC, useEffect } from 'react'
import { Form, FormFieldProps, FullScreenWrapper } from '@/components'
import { useNavigate } from 'react-router-dom'
import { PathsRoutes } from '@/router/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { getValidationScheme, validationErrorMessage } from '@/constants'
import { PageInitArgs, useAppDispatch } from '@/ducks/store'
import { getUser, signin, userErrorSelector, userSelector } from '@/ducks/user'
import { useSelector } from 'react-redux'
import { YandexAuthButton } from '@/components/YandexAuthButton'
import { usePage } from '@/hooks'

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
  const user = useSelector(userSelector)
  const error = useSelector(userErrorSelector)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  usePage({ initPage: initLoginPage })

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
        getValidationScheme<FormInput, 'login'>('login', true),
      ),
    },
    {
      label: 'Пароль',
      type: 'password',
      message: validationErrorMessage.password,
      error: Boolean(errors?.password),
      ...register(
        'password',
        getValidationScheme<FormInput, 'password'>('password', true),
      ),
    },
  ]

  useEffect(() => {
    if (user) {
      navigate(PathsRoutes.Main)
    }
  }, [user])

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

export const initLoginPage = async ({
  dispatch,
  state,
  cookies,
}: PageInitArgs) => {
  const queue: Array<Promise<unknown>> = []

  if (!userSelector(state)) {
    queue.push(dispatch(getUser(cookies)))
  }

  return Promise.all(queue)
}
