import { FieldValues, Path, RegisterOptions } from 'react-hook-form'

export type FieldName =
  | 'email'
  | 'login'
  | 'firstName'
  | 'secondName'
  | 'phone'
  | 'password'
  | 'passwordOk'

export const validationErrorMessage: Record<FieldName, string> = {
  email: 'Не соответствует email',
  login:
    'От 3 до 20 символов, латиница (минимум 1), цифры, без пробелов, без спецсимволов (допустимы _ и -)',
  firstName:
    'С заглавной латиница или кириллица, без пробелов и без цифр, без спецсимволов (допустимы _ и -)',
  secondName:
    'С заглавной латиница или кириллица, без пробелов и без цифр, без спецсимволов (допустимы _ и -)',
  phone: 'Не соответствует номеру телефона',
  password: 'От 8 до 40 символов, хотя бы одна заглавная буква и цифра. ',
  passwordOk: 'Пароли должны совпадать',
}

const validationScheme: Record<FieldName, RegisterOptions> = {
  email: {
    pattern:
      /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  },
  login: {
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*$/,
  },
  firstName: {
    pattern: /^[A-ZА-Я][a-zA-ZА-Яа-я-]*$/,
  },
  secondName: {
    pattern: /^[A-ZА-Я][a-zA-ZА-Яа-я-]*$/,
  },
  phone: {
    minLength: 10,
    maxLength: 15,
    pattern: /^\+?\d{10,15}$/,
  },
  password: {
    pattern: /^(?=.*[A-Z])(?=.*\d).*$/,
  },
  passwordOk: {
    pattern: /^(?=.*[A-Z])(?=.*\d).*$/,
  },
}
//isRequired
export const getValidationScheme = <
  TFieldValues extends FieldValues,
  Name extends Path<TFieldValues>
>(
  name: FieldName,
  isRequired?: boolean
): RegisterOptions<TFieldValues, Name> =>
  ({ ...validationScheme[name], required: isRequired } as RegisterOptions<
    TFieldValues,
    Name
  >)
