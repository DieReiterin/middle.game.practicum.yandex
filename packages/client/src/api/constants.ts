export const apiHost = `${import.meta.env.VITE_EXTERNAL_SERVER_URL || 'https://magefight.04.pe'}`
export const apiPrefix = '/api/v2'
export const baseURL = apiHost + apiPrefix

export const oauth = '/oauth'
export const serviceIdURL = oauth + '/yandex/service-id'
export const oauthURL = oauth + '/yandex'

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

export const addUserToLeaderbordURL = baseURL + '/leaderboard'
export const getAllLeaderboardURL = baseURL + '/leaderboard/all'

// forum api
export const apiForum = '/api/forum'
export const allTopicsURL = apiForum + '/topics'
export const getOneTopicURL = (topicId: number) =>
  `${apiForum}/topic/${topicId}`
export const allEmojiToMessageUrl = `${apiForum}/add-emoji-to-message`

// theme api
const themePrefix = '/api/themes'
export const getThemesUrl = themePrefix
export const getUserThemeUrl = (userId: number) =>
  `${themePrefix}/theme/${userId.toString()}`
export const setUserThemeUrl = `${themePrefix}/theme`

// emojis
export const getEmojisUrl = `/api/emojis/getEmojis`

//заменить после деплоя
export const redirectURL = apiHost
export const authYandexURL = 'https://oauth.yandex.ru/authorize'
