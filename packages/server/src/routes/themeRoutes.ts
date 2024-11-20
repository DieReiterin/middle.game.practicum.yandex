import { Router } from 'express'
import {
  setUserTheme,
  getUserTheme,
  getThemes,
} from '../controllers/themeController'

const themeRouter = Router()

themeRouter.post('/theme', setUserTheme)
themeRouter.get('/theme/:user_id', getUserTheme)
themeRouter.get('/', getThemes)

export default themeRouter
