import { Router } from 'express'
import { getEmojis } from '../controllers/emojisController'

const router = Router()

router.get('/emojis', getEmojis)

export default router
