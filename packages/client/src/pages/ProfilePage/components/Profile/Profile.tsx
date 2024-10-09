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
  // const [userInfo, setUserInfo] = useState({
  //     avatar: '',
  //     email: '',
  //     login: '',
  //     first_name: '',
  //     second_name: '',
  //     display_name: '',
  //     phone: '',
  //     old_password: '',
  //     new_password: '',
  //     repeat_password: ''
  // });
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
  return (
    <div className={styles.profile}>
      <div className={styles.profileHeader}>
        profileHeader
        {/* <Image
                        className="profile-header__image"
                        src={userInfo.avatar}
                        onClick={() => setEditMode('avatar')}
                    />
                        <Subtitle text={userInfo.first_name} className="profile__row-text subtitle_grey" /> */}
      </div>
      <div className={styles.profileMain}>
        profileMain
        {/* <form class="profile__row profile__row_spaced profile__row_bordered">
                            {{{avatarInput}}}
                            {{{avatarLink}}}
                        </form>
                        <div class="profile__row profile__row_spaced profile__row_bordered">
                            {{{firstNameTitle}}}
                            {{{firstName}}}
                        </div>
                        <div class="profile__row profile__row_spaced profile__row_bordered">
                            {{{secondNameTitle}}}
                            {{{secondName}}}
                        </div>
                        <div class="profile__row profile__row_spaced profile__row_bordered">
                            {{{displayNameTitle}}}
                            {{{displayName}}}
                        </div>
                        <div class="profile__row profile__row_spaced profile__row_bordered">
                            {{{phoneTitle}}}
                            {{{phone}}}
                        </div>              
                        <div class="profile__row profile__row_spaced">
                            {{{oldPasswordTitle}}}
                            {{{oldPassword}}}
                        </div>
                        <div class="profile__row profile__row_spaced">
                            {{{newPasswordTitle}}}
                            {{{newPassword}}}
                        </div>
                        <div class="profile__row profile__row_spaced">
                            {{{repeatPasswordTitle}}}
                            {{{repeatPassword}}}
                        </div>
                        {alertText && <PageTitle text={alertText} className="profile__alert" />} */}
      </div>
      <div className={styles.profileFooter}>
        profileFooter1
        {/* {editMode === 'default' && (
                        <>
                            <Link text="Изменить данные" onClick={() => setEditMode('profile')} />
                            <Link text="Изменить пароль" onClick={() => setEditMode('password')} />
                            <Link text="Выйти" onClick={requestLogout} />
                        </>
            )} */}
      </div>
      <div className={styles.profileFooter}>
        profileFooter2
        {/* <div className="profile__row profile__row_align-center">
                            <Button text="Сохранить" onClick={requestChangeProfile} />
                        </div> */}
      </div>
    </div>
  )
}
