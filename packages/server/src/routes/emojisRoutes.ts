import { Router } from 'express'
import { getEmojis } from '../controllers/emojisController'

const emojisRouter = Router()

emojisRouter.get('/getEmojis', getEmojis)

export default emojisRouter
