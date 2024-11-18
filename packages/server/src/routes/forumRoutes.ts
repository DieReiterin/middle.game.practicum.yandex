import { Router } from 'express'
import {
  getAllTopics,
  addTopic,
  getTopic,
  addMessageToTopic,
} from '../controllers/forumController'

const forumRouter = Router()

forumRouter.get('/topics', getAllTopics)
forumRouter.post('/topics', addTopic)
forumRouter.get('/topic/:topic_id', getTopic)
forumRouter.post('/topic/:topic_id', addMessageToTopic)

export default forumRouter
