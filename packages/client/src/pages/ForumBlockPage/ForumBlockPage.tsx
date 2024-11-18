import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './ForumBlockPage.module.scss'
import { Button, SvgIcon, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import ForumMessage from './components/ForumMessage/ForumMessage'
import useTopicData from '../../hooks/useTopicData'
import { usePage } from '@/hooks'
import { PageInitArgs } from '@/ducks/store'
import {
  addMessageToTopic,
  getTopic,
  getUser,
  TopicResponse,
  userSelector,
} from '@/ducks/user'
import { useDispatch } from 'react-redux'

type HomeIconProps = {
  [key: string]: string | number | bigint | boolean
}

interface Topic {
  topic_id: number
  topic_name: string
  messages_count: number
}

const ForumBlockPage: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const TopicData = useTopicData()
  const dispatch = useDispatch()
  const [topicData, setTopicData] = useState<TopicResponse[]>([])
  const topicId = Number(id)

  usePage({ initPage: initForumBlockPage })

  function HomeIcon(props: HomeIconProps) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    )
  }

  const handleHomeClick = () => {
    navigate('/forum')
  }

  const [comments, setComments] = useState<string[]>(() => {
    const savedComments = localStorage.getItem(`comments_${id}`)
    return savedComments ? JSON.parse(savedComments) : []
  })

  const [inputValue, setInputValue] = useState('')
  const [message, setMessage] = useState({})

  const handleAddMessage = async () => {
    const params = {
      user_name: 'Name',
      message_text: inputValue,
    }

    addMessageToTopic({ topicId, params })
  }

  const getTopics = async () => {
    const data = await getTopic(topicId)
    setTopicData(data)
  }

  useEffect(() => {
    getTopics()
  }, [])

  console.log(topicData, 'topicData')

  return (
    <div className={styles.pageForum}>
      <div className={styles.pageForumButtonHome} onClick={handleHomeClick}>
        <HomeIcon />
      </div>
      <div className={styles.pageForumBlock}>
        <h2 className={styles.pageForumBlockTitle}>{TopicData.name}</h2>
        <p className={styles.pageForumBlockDesc}>{TopicData.description}</p>
      </div>
      <div className={styles.pageForumInput}>
        <TextField
          className={styles.pageForumInputDesc}
          id="standard-basic"
          label="Добавить сообщение"
          variant="standard"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleAddMessage}
          disabled={!inputValue.trim()}>
          Добавить
        </Button>
      </div>
      <div className={styles.pageForumMessage}>
        {comments.map((msg, index) => (
          <ForumMessage key={index} message={msg} />
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
