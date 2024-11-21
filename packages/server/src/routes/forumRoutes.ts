import { Router } from 'express'
import {
  getAllTopics,
  addTopic,
  getTopic,
  addMessageToTopic,
  addEmojiToMessage,
} from '../controllers/forumController'

const forumRouter = Router()

forumRouter.get('/topics', getAllTopics)
forumRouter.post('/topics', addTopic)
forumRouter.get('/topic/:topic_id', getTopic)
forumRouter.post('/topic/:topic_id', addMessageToTopic)
forumRouter.post('/add-emoji-to-message', addEmojiToMessage)

export default forumRouter
