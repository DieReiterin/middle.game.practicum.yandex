import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './ForumBlockPage.module.scss'
import { Button, SvgIcon, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import ForumMessage from './components/ForumMessage/ForumMessage'
import { usePage } from '@/hooks'
import { PageInitArgs, useAppDispatch } from '@/ducks/store'
import {
  addMessageToTopic,
  getTopic,
  getUser,
  GetTopicResponse,
  userSelector,
  AddMessageParams,
} from '@/ducks/user'
import { useSelector } from 'react-redux'
import { emojisSelector, fetchEmojis } from '@/ducks/emojis'

const ForumBlockPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const emojis = useSelector(emojisSelector)

  usePage({ initPage: initForumBlockPage })
  const navigate = useNavigate()
  const handleHomeClick = () => {
    navigate('/forum')
  }
  const { id } = useParams()
  const topicId = Number(id)
  const user = useSelector(userSelector)
  const [topicData, setTopicData] = useState<GetTopicResponse>({
    topic_id: -1,
    topic_name: '',
    topic_descr: '',
    messages_count: -1,
    messages: [],
  })
  const [message, setMessage] = useState('')

  const fetchTopic = async () => {
    try {
      const data = await getTopic(topicId)
      setTopicData(data)
    } catch (e) {
      console.error('getTopic error:', e)
    }
  }

  useEffect(() => {
    fetchTopic()
    dispatch(fetchEmojis())
  }, [])

  const sendMessage = async () => {
    try {
      const params: AddMessageParams = {
        user_name: user?.display_name || 'Anonymous',
        message_text: message,
      }

      const data = await addMessageToTopic(topicId, params)

      if (
        data &&
        'message' in data &&
        data.message !== 'Message added successfully'
      ) {
        throw new Error('server error')
      }

      await fetchTopic()
      setMessage('')
    } catch (e) {
      console.error('sendMessage error:', e)
    }
  }

  return (
    <div className={styles.pageForum}>
      <div className={styles.pageForumButtonHome} onClick={handleHomeClick}>
        <SvgIcon>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
      </div>
      <div className={styles.pageForumBlock}>
        <h2 className={styles.pageForumBlockTitle}>{topicData.topic_name}</h2>
        <p className={styles.pageForumBlockDesc}>{topicData.topic_descr}</p>
      </div>
      <div className={styles.pageForumInput}>
        <TextField
          className={styles.pageForumInputDesc}
          id="standard-basic"
          label="Добавить сообщение"
          variant="standard"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={sendMessage}
          disabled={!message.trim()}>
          Добавить
        </Button>
      </div>
      <div className={styles.pageForumMessage}>
        {topicData.messages.map(
          ({ message_id, message_text, user_name, emoji_id }) => (
            <ForumMessage
              key={message_id}
              emojis={emojis}
              message={message_text}
              emoji={emoji_id}
              userName={user_name}
              messageId={message_id}
            />
          ),
        )}
      </div>
    </div>
  )
}

export default ForumBlockPage

export const initForumBlockPage = async ({
  dispatch,
  state,
  cookies,
}: PageInitArgs) => {
  const queue: Array<Promise<unknown>> = []

  if (!userSelector(state)) {
    queue.push(dispatch(getUser(cookies)))
  }

  return Promise.all(queue)
}
