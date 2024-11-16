import { Request, Response } from 'express'
import Topic from '../models/topic'
import Message from '../models/message'
import { handleError } from '../utils/errorHandler'
import sanitizeHtml from 'sanitize-html'

export const getAllTopics = async (
  _: Request,
  res: Response,
): Promise<void> => {
  try {
    // const topics = await Topic.findAll()
    const topics = await Topic.findAll({
      attributes: ['topic_id', 'topic_name', 'topic_descr', 'messages_count'],
    })
    res.status(200).json(topics)
  } catch (error) {
    handleError(res, error)
  }
}

export const addTopic = async (req: Request, res: Response): Promise<void> => {
  const { topic_name, topic_descr } = req.body

  try {
    const newTopic = await Topic.create({
      topic_name,
      topic_descr,
    })

    res.status(201).json({ message: 'Topic created', data: newTopic })
  } catch (error) {
    handleError(res, error)
  }
}

export const getTopic = async (req: Request, res: Response): Promise<void> => {
  const { topic_id } = req.params

  try {
    const topic = await Topic.findOne({
      where: { topic_id },
      include: [
        {
          model: Message,
          attributes: ['user_name', 'message_text'],
        },
      ],
    })

    if (!topic) {
      res.status(404).json({ message: 'Topic not found' })
    } else {
      const messages = topic.messages.map(message => ({
        user_name: message.user_name,
        message_text: message.message_text,
      }))

      const response = {
        topic_id: topic.topic_id,
        topic_name: topic.topic_name,
        messages_count: topic.messages_count,
        messages: messages,
      }
      res.status(200).json(response)
    }
  } catch (error) {
    handleError(res, error)
  }
}

export const addMessageToTopic = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { topic_id } = req.params
  const { user_name } = req.body
  const sanitizedMessageText = sanitizeHtml(req.body.message_text, {
    allowedTags: [],
    allowedAttributes: {},
  })

  try {
    const topic = await Topic.findByPk(topic_id)

    if (!topic) {
      res.status(404).json({ message: 'Topic not found' })
    } else {
      const newMessage = await Message.create({
        topic_id,
        user_name,
        message_text: sanitizedMessageText,
      })

      topic.messages_count += 1
      await topic.save()

      const response = {
        message: 'Message added successfully',
        data: {
          message_id: newMessage.message_id,
          topic_id: newMessage.topic_id,
          user_name: newMessage.user_name,
          message_text: newMessage.message_text,
        },
      }
      res.status(201).json(response)
    }
  } catch (error) {
    handleError(res, error)
  }
}
