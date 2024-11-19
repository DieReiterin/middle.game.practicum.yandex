import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './ForumBlockPage.module.scss'
import { Button, SvgIcon, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import ForumMessage from './components/ForumMessage/ForumMessage'
import { usePage } from '@/hooks'
import { PageInitArgs } from '@/ducks/store'
import {
  addMessageToTopic,
  getTopic,
  getUser,
  GetTopicResponse,
  userSelector,
} from '@/ducks/user'
// import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const ForumBlockPage: React.FC = () => {
  usePage({ initPage: initForumBlockPage })
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleHomeClick = () => {
    navigate('/forum')
  }
  const { id } = useParams()
  const topicId = Number(id)
  const user = useSelector(userSelector) || { display_name: 'Anonymous' }
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

      console.log('getTopic ForumBlockPage DATA')
      console.log(data)

      // dispatch(getTopic(topicId))
      setTopicData(data)
    } catch (e) {
      console.error('getTopic error:', e)
    }
  }

  useEffect(() => {
    fetchTopic()
  }, [])

  const handleAddMessage = async () => {
    const params = {
      user_name: user.display_name,
      message_text: message,
    }

    addMessageToTopic({ topicId: topicId, params })
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
          onClick={handleAddMessage}
          disabled={!message.trim()}>
          Добавить
        </Button>
      </div>
      <div className={styles.pageForumMessage}>
        {topicData.messages.map((msg, index) => (
          <ForumMessage key={index} message={msg.message_text} />
        ))}
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
