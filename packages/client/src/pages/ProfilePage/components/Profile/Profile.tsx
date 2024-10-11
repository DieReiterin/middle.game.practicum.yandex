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

// import ProfileController from '../../controllers/profile';
// import UserLoginController from '../../controllers/user-login';

// const profileController = new ProfileController();
// const userLoginController = new UserLoginController();
type TEditMode = 'default' | 'editAvatar' | 'editProfile' | 'editPassword'

export const Profile: FC = () => {
  // const navigate = useNavigate()
  const [userData, setUserData] = useState({
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
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  const clickSaveBtn = () => {
    setEditMode('default')
  }
  const clickSaveAvatar = () => {
    setEditMode('default')
  }
  // useEffect(() => {///
  //     const fetchuserData = async () => {
  //         try {
  //             const info = await userLoginController.getInfo();
  //             setUserData(info);
  //             loadUserAvatar(info.avatar);
  //         } catch (error) {
  //             console.error('getuserData failed:', error);
  //         }
  //     };
  //     fetchuserData();
  // }, []);
  // const loadUserAvatar = async (path: string | null) => {
  //     if (path === null) {
  //         return;
  //     }
  //     try {
  //         const result = await userLoginController.getStatic(path);
  //         setUserData(prev => ({ ...prev, avatar: result }));
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
  //         setUserData(updatedInfo);
  //     } catch (error) {
  //         showAlert('Не получилось сменить аватар');
  //     }
  // };
  // const requestChangeProfile = async () => {
  //     try {
  //         const response = await profileController.editProfile(userData);
  //         if (typeof response === 'string') {
  //             showAlert(response);
  //         } else {
  //             showAlert('Данные сохранены');
  //             // Обновляем информацию пользователя
  //             const updatedInfo = await userLoginController.getInfo();
  //             setUserData(updatedInfo);
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
  const setUserDataField = (field: string) => (value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }))
  }
  const renderAvatarControls = (show: boolean) => {
    return show ? (
      <form className={styles.avatarControls}>
        <InputFile
          onChange={(newAvatar: File) => {
            setAvatarFile(newAvatar)
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
            value={userData.email}
            onInput={setUserDataField('email')}
            typeProfile={true}
          />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Логин" className={styles.subtitleBold} />
          <InputField
            value={userData.login}
            onInput={setUserDataField('login')}
            typeProfile={true}
          />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Имя" className={styles.subtitleBold} />
          <InputField
            value={userData.first_name}
            onInput={setUserDataField('first_name')}
            typeProfile={true}
          />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Фамилия" className={styles.subtitleBold} />
          <InputField
            value={userData.second_name}
            onInput={setUserDataField('second_name')}
            typeProfile={true}
          />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Имя в чате" className={styles.subtitleBold} />
          <InputField
            value={userData.display_name}
            onInput={setUserDataField('display_name')}
            typeProfile={true}
          />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Телефон" className={styles.subtitleBold} />
          <InputField
            value={userData.phone}
            onInput={setUserDataField('phone')}
            typeProfile={true}
          />
        </div>
      </div>
    ) : (
      <div className={styles.userFields}>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Почта" className={styles.subtitleBold} />
          <Subtitle text={userData.email} className={styles.subtitleGrey} />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Логин" className={styles.subtitleBold} />
          <Subtitle text={userData.login} className={styles.subtitleGrey} />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Имя" className={styles.subtitleBold} />
          <Subtitle
            text={userData.first_name}
            className={styles.subtitleGrey}
          />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Фамилия" className={styles.subtitleBold} />
          <Subtitle
            text={userData.second_name}
            className={styles.subtitleGrey}
          />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Имя в чате" className={styles.subtitleBold} />
          <Subtitle
            text={userData.display_name}
            className={styles.subtitleGrey}
          />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Телефон" className={styles.subtitleBold} />
          <Subtitle text={userData.phone} className={styles.subtitleGrey} />
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
            value={userData.old_password}
            onInput={setUserDataField('old_password')}
            typeProfile={true}
          />
        </div>
        <div className={styles.profileRow}>
          <Subtitle text="Новый пароль" className={styles.subtitleBold} />
          <InputField
            value={userData.new_password}
            onInput={setUserDataField('new_password')}
            typeProfile={true}
          />
        </div>
        <div className={styles.profileRow}>
          <Subtitle text="Повторите пароль" className={styles.subtitleBold} />
          <InputField
            value={userData.repeat_password}
            onInput={setUserDataField('repeat_password')}
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
          src={userData.avatar}
          onClick={() => setEditMode('editAvatar')}
          // onClick={() => setShowSaveBtn(val => !val)}
          //   onClick={() => setAlertText(val => (val ? '' : 'alertTextalertText'))}
        />
        {/* <Subtitle className={styles.headerTitle} text={userData.first_name} /> */}
        <Subtitle className={styles.headerTitle} text={editMode} />
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
