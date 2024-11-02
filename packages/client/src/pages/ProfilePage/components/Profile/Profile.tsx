import { FC, useEffect, useState } from 'react'
import {
  Button,
  Image,
  InputField,
  InputFile,
  Link,
  PageTitle,
  Subtitle,
} from '../UI/index'
import { UserFields } from '../UserFields'
import styles from './Profile.module.scss'
import { useNavigate } from 'react-router-dom'
import { PathsRoutes } from '@/router/types'
import api, { Methods } from '@/api'
import { avatarURL, passwordURL, profileURL } from '@/api/constants'
import { AxiosResponse, isAxiosError } from 'axios'
import { useAppDispatch } from '@/ducks/store'
import {
  getUser,
  logout,
  userAvatarSelector,
  userErrorSelector,
  UserResponse as TUser,
  userSelector,
} from '@/ducks/user'
import { useSelector } from 'react-redux'

import { TLocalUser } from '../types'

type TEditMode = 'default' | 'editAvatar' | 'editProfile' | 'editPassword'
type MatchingKeys = Extract<keyof TLocalUser, keyof TUser>
type MatchingFields = Pick<TLocalUser, MatchingKeys>

export const Profile: FC = () => {
  const user = useSelector(userSelector)
  const userAvatar = useSelector(userAvatarSelector)
  const serverError = useSelector(userErrorSelector)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [localUser, setLocalUser] = useState<TLocalUser>({
    email: '',
    login: '',
    first_name: '',
    second_name: '',
    display_name: '',
    phone: '',
  })
  const [passwordFields, setPasswordFields] = useState({
    old_password: '',
    new_password: '',
    repeat_password: '',
  })
  const [editMode, setEditMode] = useState<TEditMode>('default')
  const [alertText, setAlertText] = useState('')
  const [localAvatarFile, setLocalAvatarFile] = useState<File | null>(null)

  useEffect(() => {
    if (user) {
      updateLocalUser()
    }
  }, [user])

  const updateLocalUser = () => {
    if (!user) {
      return
    }
    setLocalUser(prevLocalUser => {
      const updatedFields = Object.keys(prevLocalUser).reduce((acc, key) => {
        if (key in user) {
          acc[key as MatchingKeys] = user[key as MatchingKeys]
        }
        return acc
      }, {} as MatchingFields)

      return { ...prevLocalUser, ...updatedFields }
    })
  }

  const handleChange = () => {
    if (editMode === 'editProfile') {
      requestChangeUserFields()
    } else if (editMode === 'editPassword') {
      requestChangePassword()
    }
  }

  const requestChangeUserFields = async () => {
    const dataToSend = Object.keys(localUser).reduce((acc, key) => {
      acc[key as keyof TLocalUser] = localUser[key as keyof TLocalUser]
      return acc
    }, {} as TLocalUser)

    try {
      await api<undefined, AxiosResponse<string>>({
        url: profileURL,
        method: Methods.PUT,
        data: dataToSend,
      })
      dispatch(getUser())
    } catch (error) {
      if (isAxiosError(error)) {
        const serverError = error.response?.data?.reason || 'Ошибка сервера'
        setAlertText(serverError)
      } else {
        setAlertText('Неизвестная ошибка')
      }
    }
  }

  const isPasswordValid = () => {
    if (
      !passwordFields.old_password ||
      !passwordFields.new_password ||
      !passwordFields.repeat_password
    ) {
      setAlertText('Заполните все поля')
      return false
    }

    if (passwordFields.new_password !== passwordFields.repeat_password) {
      setAlertText('Пароли не совпадают')
      return false
    }

    return true
  }

  const requestChangePassword = async () => {
    if (!isPasswordValid()) return

    const dataToSend = {
      oldPassword: passwordFields.old_password,
      newPassword: passwordFields.new_password,
    }

    try {
      await api<undefined, AxiosResponse<string>>({
        url: passwordURL,
        method: Methods.PUT,
        data: dataToSend,
      })
      setAlertText('Пароль успешно изменен')
    } catch (error) {
      if (isAxiosError(error)) {
        const serverError = error.response?.data?.reason || 'Ошибка сервера'
        setAlertText(serverError)
      } else {
        setAlertText('Неизвестная ошибка')
      }
    } finally {
      setEditMode('default')
    }
  }
  const requestChangeAvatar = async () => {
    if (!localAvatarFile) return

    const formData = new FormData()
    formData.append('avatar', localAvatarFile)

    try {
      await api<undefined, AxiosResponse<string>>({
        url: avatarURL,
        method: Methods.PUT,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
      })
      dispatch(getUser())
    } catch (error) {
      if (isAxiosError(error)) {
        const serverError = error.response?.data?.reason || 'Ошибка сервера'
        setAlertText(serverError)
      } else {
        setAlertText('Неизвестная ошибка')
      }
    }
  }
  const requestLogout = async () => {
    try {
      await dispatch(logout()).unwrap()
      navigate(PathsRoutes.Login)
    } catch (error) {
      setAlertText('Ошибка при выходе')
    }
  }

  const setLocalUserField = (field: keyof TLocalUser) => (value: string) => {
    setLocalUser(prev => ({ ...prev, [field]: value }))
  }
  const setPasswordField = (field: string) => (value: string) => {
    setPasswordFields(prev => ({ ...prev, [field]: value }))
  }

  const renderAvatarControls = (show: boolean) => {
    return show ? (
      <form className={styles.avatarControls}>
        <InputFile
          onChange={(newAvatar: File) => {
            setLocalAvatarFile(newAvatar)
          }}
          name="avatar"
          id="avatar"
          accept="image/*"
        />
        <Link
          text="Поменять"
          onClick={() => requestChangeAvatar()}
          className={styles.linkRed}
        />
      </form>
    ) : (
      <div className={styles.avatarControls}></div>
    )
  }
  const renderPasswordFields = (show: boolean) => {
    return show ? (
      <div className={styles.passwordFields}>
        <div className={styles.profileRow}>
          <Subtitle text="Старый пароль" className={styles.subtitleBold} />
          <InputField
            value={passwordFields.old_password}
            onInput={setPasswordField('old_password')}
            typeProfile={true}
          />
        </div>
        <div className={styles.profileRow}>
          <Subtitle text="Новый пароль" className={styles.subtitleBold} />
          <InputField
            value={passwordFields.new_password}
            onInput={setPasswordField('new_password')}
            typeProfile={true}
          />
        </div>
        <div className={styles.profileRow}>
          <Subtitle text="Повторите пароль" className={styles.subtitleBold} />
          <InputField
            value={passwordFields.repeat_password}
            onInput={setPasswordField('repeat_password')}
            typeProfile={true}
          />
        </div>
      </div>
    ) : (
      <div className={styles.passwordFields}></div>
    )
  }
  const renderAlertBlock = (text: string) => {
    return text ? (
      <div className={styles.alertBlock}>
        <PageTitle text={text} className={styles.alertBlockText} />
      </div>
    ) : (
      <div className={styles.alertBlock}></div>
    )
  }
  const renderProfileControls = (showLinks: boolean) => {
    return showLinks ? (
      <div className={styles.profileControls}>
        <div className={styles.profileRowBordered}>
          <Link
            text="Изменить данные"
            onClick={() => setEditMode('editProfile')}
          />
        </div>
        <div className={styles.profileRowBordered}>
          <Link
            text="Изменить пароль"
            onClick={() => setEditMode('editPassword')}
          />
        </div>
        <div className={styles.profileRow}>
          <Link
            text="Выйти"
            onClick={() => requestLogout()}
            className={styles.linkRed}
          />
        </div>
      </div>
    ) : (
      <div className={styles.profileControls}>
        <div className={styles.profileRowBordered}>
          <Link text="Изменить данные" disabled />
        </div>
        <div className={styles.profileRowBordered}>
          <Link text="Изменить пароль" disabled />
        </div>
        <div className={styles.profileRow}>
          <Link text="Выйти" disabled />
        </div>
      </div>
    )
  }
  const renderFooter = (show: boolean) => {
    return show ? (
      <div className={styles.footer}>
        <div className={styles.profileRow}>
          <Button
            text="Сохранить"
            onClick={() => handleChange()}
            className={styles.footerBtn}
          />
        </div>
      </div>
    ) : (
      <div className={styles.footer}></div>
    )
  }
  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <Image
          className={styles.headerImage}
          src={userAvatar}
          onClick={() => {
            if (editMode === 'default') {
              setEditMode('editAvatar')
            }
          }}
        />
        <Subtitle className={styles.headerTitle} text={user?.first_name} />
      </div>
      {renderAvatarControls(editMode === 'editAvatar')}
      <UserFields
        user={localUser}
        onChange={(field, value) => setLocalUserField(field)(value)}
        editable={editMode === 'editProfile'}
      />
      {renderPasswordFields(editMode === 'editPassword')}
      {renderAlertBlock((serverError as string) || alertText)}
      {renderProfileControls(editMode === 'default')}
      {renderFooter(editMode === 'editPassword' || editMode === 'editProfile')}
    </div>
  )
}
