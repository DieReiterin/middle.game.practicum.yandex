import { Router } from 'express'
import {
  setUserTheme,
  getUserTheme,
  getThemes,
} from '../controllers/themeController'

const router = Router()

router.post('/theme', setUserTheme)
router.get('/theme/:user_id', getUserTheme)
router.get('/themes', getThemes)

export default router
