import { Router } from 'express'
import {
  setUserTheme,
  getUserTheme,
  getThemes,
} from '../controllers/themeController'

const themeRouter = Router()

router.post('/theme', setUserTheme)
router.get('/theme/:user_id', getUserTheme)
router.get('/', getThemes)

export default themeRouter
