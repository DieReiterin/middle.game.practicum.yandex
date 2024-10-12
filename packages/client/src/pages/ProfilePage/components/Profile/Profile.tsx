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

import { useAppDispatch } from '@/ducks/store'
import {
  getUserAvatar,
  userSelector,
  userAvatarSelector,
  UserResponse as TUser,
} from '@/ducks/user'
import { useSelector } from 'react-redux'

// const profileController = new ProfileController();
// const userLoginController = new UserLoginController();
type TEditMode = 'default' | 'editAvatar' | 'editProfile' | 'editPassword'

type TLocalUser = {
  avatar: string
  email: string
  login: string
  first_name: string
  second_name: string
  display_name: string
  phone: string
  old_password: string
  new_password: string
  repeat_password: string
}

type MatchingKeys = Extract<keyof TLocalUser, keyof TUser>
type MatchingFields = Pick<TLocalUser, MatchingKeys>

export const Profile: FC = () => {
  const user = useSelector(userSelector)
  const userAvatar = useSelector(userAvatarSelector)
  // const navigate = useNavigate()
  // const dispatch = useAppDispatch()

  const [localUser, setLocalUser] = useState<TLocalUser>({
    avatar: '',
    email: 'email',
    login: 'login',
    first_name: 'first_name',
    second_name: 'second_name',
    display_name: 'display_name',
    phone: 'phone',
    old_password: 'old_password',
    new_password: 'new_password',
    repeat_password: 'repeat_password',
  })
  const [editMode, setEditMode] = useState<TEditMode>('default')
  const [alertText, setAlertText] = useState('')
  const [LocalAvatarFile, setLocalAvatarFile] = useState<File | null>(null)

  useEffect(() => {
    if (user) {
      mapUserToLocal()
      // dispatch(getUserAvatar(user.avatar))
    }
  }, [])

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
      console.log('mapped user', newLocalUser.first_name)

      return newLocalUser
    })
  }

  // const loadUserAvatar = () => {

  // }

  // useEffect(() => {///
  //     const fetchlocalUser = async () => {
  //         try {
  //             const info = await userLoginController.getInfo();
  //             setLocalUser(info);
  //             loadUserAvatar(info.avatar);
  //         } catch (error) {
  //             console.error('getlocalUser failed:', error);
  //         }
  //     };
  //     fetchlocalUser();
  // }, []);
  // const loadUserAvatar = async (path: string | null) => {
  //     if (path === null) {
  //         return;
  //     }
  //     try {
  //         const result = await userLoginController.getStatic(path);
  //         setLocalUser(prev => ({ ...prev, avatar: result }));
  //     } catch (error) {
  //         showAlert('Не получилось загрузить ваш аватар');
  //     }
  // };

  // const requestChangeAvatar = async () => {
  //     if (!avatarFile) return;
  //     const formData = new FormData();
  //     formData.append('avatar', avatarFile);
  //     try {
  //         await profileController.editAvatar(formData);
  //         showAlert('Новый аватар сохранен');
  //         // Обновляем информацию пользователя
  //         const updatedInfo = await userLoginController.getInfo();
  //         setLocalUser(updatedInfo);
  //     } catch (error) {
  //         showAlert('Не получилось сменить аватар');
  //     }
  // };
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
  const clickSaveBtn = () => {
    setEditMode('default')
  }
  const clickSaveAvatar = () => {
    setEditMode('default')
  }

  const setLocalUserField = (field: string) => (value: string) => {
    setLocalUser(prev => ({ ...prev, [field]: value }))
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
        {/* <Link onClick={() => requestChangeAvatar()} className={styles.linkRed} text="Поменять" /> */}
        {/* <InputFile name="avatar" id="avatar" accept="image/*" /> */}
        <Link
          text="Поменять"
          onClick={() => clickSaveAvatar()}
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
            value={localUser.old_password}
            onInput={setLocalUserField('old_password')}
            typeProfile={true}
          />
        </div>
        <div className={styles.profileRow}>
          <Subtitle text="Новый пароль" className={styles.subtitleBold} />
          <InputField
            value={localUser.new_password}
            onInput={setLocalUserField('new_password')}
            typeProfile={true}
          />
        </div>
        <div className={styles.profileRow}>
          <Subtitle text="Повторите пароль" className={styles.subtitleBold} />
          <InputField
            value={localUser.repeat_password}
            onInput={setLocalUserField('repeat_password')}
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
          src={userAvatar}
          onClick={() => setEditMode('editAvatar')}
        />
        {/* <Subtitle className={styles.headerTitle} text={localUser.first_name} /> */}
        <Subtitle className={styles.headerTitle} text={localUser.first_name} />
      </div>
      {renderAvatarControls(editMode === 'editAvatar')}
      {renderUserFields(editMode === 'editProfile')}
      {renderPasswordFields(editMode === 'editPassword')}
      {renderAlertBlock(alertText)}
      {renderProfileControls(editMode === 'default')}
      {renderFooter(editMode === 'editPassword' || editMode === 'editProfile')}
    </div>
  )
}
