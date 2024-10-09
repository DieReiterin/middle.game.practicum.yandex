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
export const Profile: FC = () => {
  // const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
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
  // const [alertText, setAlertText] = useState('');
  // const [avatarFile, setAvatarFile] = useState<File | null>(null);
  // const [editMode, setEditMode] = useState<'default' | 'profile' | 'password' | 'avatar'>('default');
  // useEffect(() => {///
  //     const fetchUserInfo = async () => {
  //         try {
  //             const info = await userLoginController.getInfo();
  //             setUserInfo(info);
  //             loadUserAvatar(info.avatar);
  //         } catch (error) {
  //             console.error('getUserInfo failed:', error);
  //         }
  //     };
  //     fetchUserInfo();
  // }, []);
  // const loadUserAvatar = async (path: string | null) => {
  //     if (path === null) {
  //         return;
  //     }
  //     try {
  //         const result = await userLoginController.getStatic(path);
  //         setUserInfo(prev => ({ ...prev, avatar: result }));
  //     } catch (error) {
  //         showAlert('Не получилось загрузить ваш аватар');
  //     }
  // };
  // const showAlert = (text: string) => {
  //     setAlertText(text);
  // };
  // const hideAlert = () => {
  //     setAlertText('');
  // };
  // const handleInputChange = (field: string) => (value: string) => {
  //     setUserInfo(prev => ({ ...prev, [field]: value }));
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
  //         setUserInfo(updatedInfo);
  //     } catch (error) {
  //         showAlert('Не получилось сменить аватар');
  //     }
  // };
  // const requestChangeProfile = async () => {
  //     try {
  //         const response = await profileController.editProfile(userInfo);
  //         if (typeof response === 'string') {
  //             showAlert(response);
  //         } else {
  //             showAlert('Данные сохранены');
  //             // Обновляем информацию пользователя
  //             const updatedInfo = await userLoginController.getInfo();
  //             setUserInfo(updatedInfo);
  //         }
  //     } catch (error) {
  //         console.error(error);
  //     }
  // };
  // const renderAvatarControls = () => {
  //     if (editMode !== 'avatar') return null
  //     return (
  //         <div>
  //             <InputFile onChange={(file: File) => {
  //                     setAvatarFile(file);
  //                 }} name="avatar" id="avatar" accept="image/*" />
  //             <Link text="Поменять" onClick={() => requestChangeAvatar()}/>
  //         </div>
  //     );
  // };
  // const renderUserInfo = () => {
  //     return (
  //         <div>
  //             <Subtitle text="Почта" />
  //             <InputField value={userInfo.email} onInput={handleInputChange('email')} />
  //             <Subtitle text="Логин" />
  //             <InputField value={userInfo.login} onInput={handleInputChange('login')} />
  //             <Subtitle text="Имя" />
  //             <InputField value={userInfo.first_name} onInput={handleInputChange('first_name')} />
  //             <Subtitle text="Фамилия" />
  //             <InputField value={userInfo.second_name} onInput={handleInputChange('second_name')} />
  //             <Subtitle text="Имя в чате" />
  //             <InputField value={userInfo.display_name} onInput={handleInputChange('display_name')} />
  //             <Subtitle text="Телефон" />
  //             <InputField value={userInfo.phone} onInput={handleInputChange('phone')} />
  //         </div>
  //     );
  // };
  // const renderPasswordControls = () => {
  //     if (editMode !== 'password') return null
  //     return (
  //         <div>
  //             <InputFile onChange={(file: File) => {
  //                     setAvatarFile(file);
  //                 }} name="avatar" id="avatar" accept="image/*" />
  //             <Link text="Поменять" onClick={() => requestChangeAvatar()}/>
  //         </div>
  //     );
  // };
  // const renderAlert = () => {
  //     if (!alertText) return null;
  //     return <PageTitle className="profile__alert" text={alertText} />;
  // };
  // const requestLogout = async () => {
  //     try {
  //         await userLoginController.logout();
  //         navigate(PathsRoutes.Login)
  //     } catch (error) {
  //         showAlert('Ошибка при выходе: ' + error.message);
  //     }
  // };
  const [showAvatarControls, setShowAvatarControls] = useState<boolean>(true)
  const renderAvatarControls = (show: boolean) => {
    return show ? (
      <form className={styles.avatarControls}>
        <InputFile name="avatar" id="avatar" accept="image/*" />
        <Link className={styles.linkRed} text="Поменять" />
      </form>
    ) : (
      <div className={styles.avatarControls}></div>
    )
  }
  const [showUserInputs, setShowUserInputs] = useState<boolean>(true)
  const renderUserFields = (showInputs: boolean) => {
    return showInputs ? (
      <div className={styles.userFields}>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Почта" className={styles.subtitleBold} />
          <InputField value={userInfo.email} typeProfile={true} />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Логин" className={styles.subtitleBold} />
          <InputField value={userInfo.login} typeProfile={true} />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Имя" className={styles.subtitleBold} />
          <InputField value={userInfo.first_name} typeProfile={true} />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Фамилия" className={styles.subtitleBold} />
          <InputField value={userInfo.second_name} typeProfile={true} />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Имя в чате" className={styles.subtitleBold} />
          <InputField value={userInfo.display_name} typeProfile={true} />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Телефон" className={styles.subtitleBold} />
          <InputField value={userInfo.phone} typeProfile={true} />
        </div>
      </div>
    ) : (
      <div className={styles.userFields}>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Почта" className={styles.subtitleBold} />
          <Subtitle text={userInfo.email} className={styles.subtitleGrey} />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Логин" className={styles.subtitleBold} />
          <Subtitle text={userInfo.login} className={styles.subtitleGrey} />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Имя" className={styles.subtitleBold} />
          <Subtitle
            text={userInfo.first_name}
            className={styles.subtitleGrey}
          />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Фамилия" className={styles.subtitleBold} />
          <Subtitle
            text={userInfo.second_name}
            className={styles.subtitleGrey}
          />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Имя в чате" className={styles.subtitleBold} />
          <Subtitle
            text={userInfo.display_name}
            className={styles.subtitleGrey}
          />
        </div>
        <div className={styles.profileRowBordered}>
          <Subtitle text="Телефон" className={styles.subtitleBold} />
          <Subtitle text={userInfo.phone} className={styles.subtitleGrey} />
        </div>
      </div>
    )
  }
  const [showPasswordFields, setShowPasswordFields] = useState<boolean>(true)
  const renderPasswordFields = (show: boolean) => {
    return show ? (
      <div className={styles.passwordFields}>
        <div className={styles.profileRow}>
          <Subtitle text="Старый пароль" className={styles.subtitleBold} />
          <InputField value={userInfo.old_password} typeProfile={true} />
        </div>
        <div className={styles.profileRow}>
          <Subtitle text="Новый пароль" className={styles.subtitleBold} />
          <InputField value={userInfo.new_password} typeProfile={true} />
        </div>
        <div className={styles.profileRow}>
          <Subtitle text="Повторите пароль" className={styles.subtitleBold} />
          <InputField value={userInfo.repeat_password} typeProfile={true} />
        </div>
      </div>
    ) : (
      <div className={styles.passwordFields}></div>
    )
  }
  const [alertText, setAlertText] = useState('alertTextalertText')
  const renderAlertBlock = (show: string) => {
    return show ? (
      <div className={styles.alertBlock}>
        <PageTitle text={alertText} className={styles.alertBlockText} />
      </div>
    ) : (
      <div className={styles.alertBlock}></div>
    )
  }
  const [showProfileLinks, setShowProfileLinks] = useState<boolean>(true)
  const renderProfileControls = (showLinks: boolean) => {
    return showLinks ? (
      <div className={styles.profileControls}>
        <div className={styles.profileRowBordered}>
          <Link text="Изменить данные" />
        </div>
        <div className={styles.profileRowBordered}>
          <Link text="Изменить пароль" />
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

  const [showSaveBtn, setShowSaveBtn] = useState<boolean>(true)
  const renderFooter = (show: boolean) => {
    return show ? (
      <div className={styles.footer}>
        <div className={styles.profileRow}>
          <Button text="Сохранить" className={styles.footerBtn} />
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
          src={userInfo.avatar}
          onClick={() => setShowSaveBtn(val => !val)}
          //   onClick={() => setAlertText(val => (val ? '' : 'alertTextalertText'))}
        />
        <Subtitle className={styles.headerTitle} text={userInfo.first_name} />
      </div>
      {renderAvatarControls(showAvatarControls)}
      {renderUserFields(showUserInputs)}
      {renderPasswordFields(showPasswordFields)}
      {renderAlertBlock(alertText)}
      {renderProfileControls(showProfileLinks)}
      {renderFooter(showSaveBtn)}
    </div>
  )
}
