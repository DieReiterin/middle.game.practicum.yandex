export const apiHost = 'http://localhost:3001'
export const apiPrefix = '/api/v2'
export const baseURL = `${apiHost}${apiPrefix}`

export const oauth = '/oauth'
export const authURL = '/auth'
export const signinURL = authURL + '/signin'
export const signupURL = authURL + '/signup'
export const getUserURL = authURL + '/user'
export const logoutURL = authURL + '/logout'
export const staticURL = '/resources'
export const userURL = '/user'
export const passwordURL = userURL + '/password'
export const profileURL = userURL + '/profile'
export const avatarURL = profileURL + '/avatar'
export const serviceIdURL = oauth + '/yandex/service-id'
export const oauthURL = oauth + '/yandex'

//заменить после деплоя
export const redirectURL = 'http://localhost:3000'
export const authYandexURL = 'https://oauth.yandex.ru/authorize'
