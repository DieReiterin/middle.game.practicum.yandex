import { FieldValues, Path, RegisterOptions } from 'react-hook-form'

export type FieldName =
  | 'email'
  | 'login'
  | 'firstName'
  | 'secondName'
  | 'phone'
  | 'password'
  | 'passwordOk'

export const validationMessage: Record<FieldName, string> = {
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
    required: true,
    pattern:
      /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  },
  login: {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*$/,
  },
  firstName: {
    required: true,
    pattern: /^[A-ZА-Я][a-zA-ZА-Яа-я-]*$/,
  },
  secondName: {
    required: true,
    pattern: /^[A-ZА-Я][a-zA-ZА-Яа-я-]*$/,
  },
  phone: {
    required: true,
    minLength: 10,
    maxLength: 15,
    pattern: /^\+?\d{10,15}$/,
  },
  password: {
    required: true,
    pattern: /^(?=.*[A-Z])(?=.*\d).*$/,
  },
  passwordOk: {
    required: true,
    pattern: /^(?=.*[A-Z])(?=.*\d).*$/,
  },
}

export const getValidationScheme = <
  TFieldValues extends FieldValues,
  Name extends Path<TFieldValues>
>(
  name: FieldName
): RegisterOptions<TFieldValues, Name> =>
  validationScheme[name] as RegisterOptions<TFieldValues, Name>
