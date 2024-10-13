import { FC } from 'react'
import { Subtitle, InputField } from '../UI'
import styles from '../Profile/Profile.module.scss'
import { TLocalUser } from '../types'

type TUserFieldsProps = {
  user: Record<keyof TLocalUser, string>
  onChange: (key: keyof TLocalUser, newValue: string) => void
  editable: boolean
}

const fieldNames: Record<keyof TLocalUser, string> = {
  email: 'Почта',
  login: 'Логин',
  first_name: 'Имя',
  second_name: 'Фамилия',
  display_name: 'Имя в чате',
  phone: 'Телефон',
} as const

export const UserFields: FC<TUserFieldsProps> = ({
  user,
  onChange,
  editable,
}) => {
  return (
    <div className={styles.userFields}>
      {Object.entries(user).map(([key, value]) => {
        const typedKey = key as keyof TLocalUser
        return (
          <div className={styles.profileRowBordered} key={typedKey}>
            <Subtitle
              text={fieldNames[typedKey]}
              className={styles.subtitleBold}
            />
            {editable ? (
              <InputField
                value={value}
                onInput={newValue => onChange(typedKey, newValue)}
                typeProfile={true}
              />
            ) : (
              <Subtitle text={value} className={styles.subtitleGrey} />
            )}
          </div>
        )
      })}
    </div>
  )
}
