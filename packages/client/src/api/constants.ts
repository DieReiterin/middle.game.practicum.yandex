export const apiHost = `${import.meta.env.VITE_EXTERNAL_SERVER_URL}`
export const apiPrefix = '/api/v2'
export const apiForum = '/api/forum'
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

export const addUserToLeaderbordURL = baseURL + '/leaderboard'
export const getAllLeaderboardURL = baseURL + '/leaderboard/all'

// forum api
export const allTopicsURL = apiHost + apiForum + '/topics'
export const getOneTopicURL = (topicId: number) =>
  `${apiHost}${apiForum}/topic/${topicId}`

// theme api
const themePrefix = '/api/themes'
export const getThemesUrl = themePrefix
export const getUserThemeUrl = (userId: number) =>
  `${themePrefix}/theme/${userId.toString()}`
export const setUserThemeUrl = `${themePrefix}/theme`

// emojis
export const getEmojisUrl = `${apiHost}/api/emojis/getEmojis`

//заменить после деплоя
export const redirectURL = apiHost
export const authYandexURL = 'https://oauth.yandex.ru/authorize'
