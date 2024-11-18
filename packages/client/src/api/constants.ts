export const apiHost = `${import.meta.env.VITE_EXTERNAL_SERVER_URL}`
export const apiPrefix = '/api/v2'
export const baseURL = `${apiHost}${apiPrefix}`
export const addUserToLeaderbordURL = baseURL + '/leaderboard'
export const getAllLeaderboardURL = baseURL + '/leaderboard/all'

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

// theme api
export const getThemesUrl = `${apiHost}/theme-api/themes`
export const getUserThemeUrl = (userId: string) =>
  `${apiHost}/theme-api/theme/${userId}`
export const setUserThemeUrl = `${apiHost}/theme-api/theme`

//заменить после деплоя
export const redirectURL = apiHost
export const authYandexURL = 'https://oauth.yandex.ru/authorize'
