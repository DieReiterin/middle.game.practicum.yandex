import { FC, useEffect, useState } from 'react'
import {
  Subtitle,
  InputField,
  InputFile,
  Link,
  Button,
  Image,
  PageTitle,
} from '../UI/index'
import styles from './Profile.module.scss'
// import { useNavigate } from 'react-router-dom'
// import { PathsRoutes } from '../../../../router/types'
import api, { Methods } from '@/api'
import {
  userURL,
  signinURL,
  signupURL,
  avatarURL,
  profileURL,
} from '@/api/constants'
import { AxiosResponse, isAxiosError } from 'axios'

import { useAppDispatch } from '@/ducks/store'
import {
  userSelector,
  userAvatarSelector,
  userErrorSelector,
  UserResponse as TUser,
  getUserAvatar,
  getUser,
} from '@/ducks/user'
import { useSelector } from 'react-redux'

type TEditMode = 'default' | 'editAvatar' | 'editProfile' | 'editPassword'
type TLocalUser = {
  avatar: string
  email: string
  login: string
  first_name: string
  second_name: string
  display_name: string
  phone: string
}
type MatchingKeys = Extract<keyof TLocalUser, keyof TUser>
type MatchingFields = Pick<TLocalUser, MatchingKeys>

export const Profile: FC = () => {
  const user = useSelector(userSelector)
  const userAvatar = useSelector(userAvatarSelector)
  const serverError = useSelector(userErrorSelector)
  // const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [localUser, setLocalUser] = useState<TLocalUser>({
    avatar: '',
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
      // console.log(
      // user.avatar.substring(user.avatar.length - 10, user.avatar.length)
      // )
      mapUserToLocal()
      // dispatch(getUserAvatar(userAvatar))
    }
  }, [user])

  const mapUserToLocal = () => {
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

      const newLocalUser = { ...prevLocalUser, ...updatedFields }
      // console.log('mapped user', newLocalUser.first_name)

      return newLocalUser
    })
  }

  const requestChangeAvatar = async () => {
    if (!localAvatarFile) return

    const formData = new FormData()
    formData.append('avatar', localAvatarFile)

    try {
      const response = await api<undefined, AxiosResponse<string>>({
        url: avatarURL,
        method: Methods.PUT,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
      })
      const error = (response.data as { reason?: string })?.reason
      if (!error) {
        dispatch(getUser())
      } else {
        setAlertText(error)
      }
      // const newAvatarPath = (response.data as { avatar?: string })?.avatar
      // if (newAvatarPath) {
      //   dispatch(getUserAvatar(newAvatarPath))
      // }
    } catch (error) {
      setAlertText(error as string)
    }
  }

  const clickSaveBtn = () => {
    if (editMode === 'editProfile') {
      requestChangeUserFields()
    }
    // else if (editMode === 'editPassword') {
    // }
    setEditMode('default')
  }

  const requestChangeUserFields = async () => {
    const dataToSend = Object.keys(localUser).reduce((acc, key) => {
      if (key !== 'avatar') {
        acc[key as keyof TLocalUser] = localUser[key as keyof TLocalUser]
      }
      return acc
    }, {} as TLocalUser)

    try {
      const response = await api<undefined, AxiosResponse<string>>({
        url: profileURL,
        method: Methods.PUT,
        data: dataToSend,
      })
      const error = (response.data as { reason?: string })?.reason
      if (!error) {
        dispatch(getUser())
      } else {
        setAlertText(error)
      }
    } catch (error) {
      setAlertText(error as string)
    }
  }

  // }
  // const requestChangeProfile = async () => {
  //     try {
  //         const response = await profileController.editProfile(localUser);
  //         if (typeof response === 'string') {
  //             showAlert(response);
  //         } else {
  //             showAlert('Данные сохранены');
  //             // Обновляем информацию пользователя
  //             const updatedInfo = await userLoginController.getInfo();
  //             setLocalUser(updatedInfo);
  //         }
  //     } catch (error) {
  //         console.error(error);
  //     }
  // };
  // const requestLogout = async () => {
  //     try {
  //         await userLoginController.logout();
  //         navigate(PathsRoutes.Login)
  //     } catch (error) {
  //         showAlert('Ошибка при выходе: ' + error.message);
  //     }
  // };

  const setLocalUserField = (field: string) => (value: string) => {
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
  const renderUserFields = (showInputs: boolean) => {
    return showInputs ? (
      <div className={styles.userFields}>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Почта" className={styles.subtitleBold} />
          <InputField
            value={localUser.email}
            onInput={setLocalUserField('email')}
            typeProfile={true}
          />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Логин" className={styles.subtitleBold} />
          <InputField
            value={localUser.login}
            onInput={setLocalUserField('login')}
            typeProfile={true}
          />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Имя" className={styles.subtitleBold} />
          <InputField
            value={localUser.first_name}
            onInput={setLocalUserField('first_name')}
            typeProfile={true}
          />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Фамилия" className={styles.subtitleBold} />
          <InputField
            value={localUser.second_name}
            onInput={setLocalUserField('second_name')}
            typeProfile={true}
          />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Имя в чате" className={styles.subtitleBold} />
          <InputField
            value={localUser.display_name}
            onInput={setLocalUserField('display_name')}
            typeProfile={true}
          />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Телефон" className={styles.subtitleBold} />
          <InputField
            value={localUser.phone}
            onInput={setLocalUserField('phone')}
            typeProfile={true}
          />
        </div>
      </div>
    ) : (
      <div className={styles.userFields}>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Почта" className={styles.subtitleBold} />
          <Subtitle text={localUser.email} className={styles.subtitleGrey} />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Логин" className={styles.subtitleBold} />
          <Subtitle text={localUser.login} className={styles.subtitleGrey} />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Имя" className={styles.subtitleBold} />
          <Subtitle
            text={localUser.first_name}
            className={styles.subtitleGrey}
          />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Фамилия" className={styles.subtitleBold} />
          <Subtitle
            text={localUser.second_name}
            className={styles.subtitleGrey}
          />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Имя в чате" className={styles.subtitleBold} />
          <Subtitle
            text={localUser.display_name}
            className={styles.subtitleGrey}
          />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Телефон" className={styles.subtitleBold} />
          <Subtitle text={localUser.phone} className={styles.subtitleGrey} />
        </div>
      </div>
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
          <Link text="Выйти" className={styles.linkRed} />
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
            onClick={() => clickSaveBtn()}
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
          // src={userAvatar}
          src={userAvatar}
          onClick={() => setEditMode('editAvatar')}
        />
        {/* <Subtitle className={styles.headerTitle} text={user?.avatar} /> */}
        <Subtitle className={styles.headerTitle} text={user?.first_name} />
      </div>
      {renderAvatarControls(editMode === 'editAvatar')}
      {renderUserFields(editMode === 'editProfile')}
      {renderPasswordFields(editMode === 'editPassword')}
      {renderAlertBlock((serverError as string) || alertText)}
      {renderProfileControls(editMode === 'default')}
      {renderFooter(editMode === 'editPassword' || editMode === 'editProfile')}
    </div>
  )
}
