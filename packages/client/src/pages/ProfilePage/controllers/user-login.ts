// import LoginApi from '@/api/login-api';
import LogoutApi from '../api/logout-api'
import GetUserInfoApi from '../api/get-user-info-api'
import GetStaticApi from '../api/get-static-api'
// import validate from '../tools/validate';
// import store from '@/tools/Store';

interface ILoginFormModel {
  login: string
  password: string
}

// const loginApi = new LoginApi();
const logoutApi = new LogoutApi()
const getUserInfoApi = new GetUserInfoApi()
const getStaticApi = new GetStaticApi()

export default class UserLoginController {
  // public async login(data: ILoginFormModel) {
  //     try {
  //         const validateLogin = validate('login', data.login);
  //         const validatePassword = validate('password', data.password);

  //         if (validateLogin !== 'ok' || validatePassword !== 'ok') {
  //             return 'Поля не прошли валидацию';
  //         }

  //         const response = await loginApi.request(data);

  //         const userIsAlreadyInSystem =
  //             typeof response !== 'string' &&
  //             'reason' in response &&
  //             response.reason === 'User already in system';

  //         if (response === 'OK' || userIsAlreadyInSystem) {
  //             localStorage.setItem('isAuth', 'true');
  //         } else {
  //             localStorage.removeItem('isAuth');
  //         }

  //         return response;
  //     } catch (error) {
  //         throw error;
  //     }
  // }

  public async logout() {
    try {
      const rawResponse = await logoutApi.request()

      if (rawResponse === 'OK') {
        // localStorage.removeItem('isAuth');
        return
      }

      const parsedResponse = JSON.parse(rawResponse)

      const invalidCookie =
        'reason' in parsedResponse &&
        (parsedResponse as Record<string, any>).reason === 'Cookie is not valid'

      if (invalidCookie) {
        // localStorage.removeItem('isAuth');
      } else {
        console.log('Error')
        throw new Error(rawResponse)
      }
    } catch (error) {
      throw error
    }
  }

  public async getInfo() {
    try {
      const response = await getUserInfoApi.request()
      if (typeof response !== 'string' && 'id' in response) {
        // store.dispatch({
        //     type: 'SET_USER_DATA',
        //     data: response,
        // });
      } else {
        throw new Error('server getInfo failed')
      }
    } catch (error) {
      throw error
    }
  }

  public async getStatic(path: string) {
    try {
      const response = await getStaticApi.request(path)

      if (typeof response !== 'object' || !(response instanceof Blob)) {
        throw new Error('server getStatic failed')
      }

      const fileURL = URL.createObjectURL(response)
      return fileURL
    } catch (error) {
      throw error
    }
  }
}
