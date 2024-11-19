import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './ForumBlockPage.module.scss'
import { Button, SvgIcon, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import ForumMessage from './components/ForumMessage/ForumMessage'
import useTopicData from '../../hooks/useTopicData'
import { usePage } from '@/hooks'
import { PageInitArgs, useAppDispatch } from '@/ducks/store'
import { getUser, userSelector } from '@/ducks/user'
import { fetchEmojis } from '@/ducks/emojis'

type HomeIconProps = {
  [key: string]: string | number | bigint | boolean
}

const ForumBlockPage: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const topicData = useTopicData()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchEmojis())
  }, [])

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

  const handleAddMessage = () => {
    if (inputValue.trim()) {
      const updatedComments = [...comments, inputValue]
      setComments(updatedComments)

      localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments))

      setInputValue('')
    }
  }

  return (
    <div className={styles.pageForum}>
      <div className={styles.pageForumButtonHome} onClick={handleHomeClick}>
        <HomeIcon />
      </div>
      <div className={styles.pageForumBlock}>
        <h2 className={styles.pageForumBlockTitle}>{topicData.name}</h2>
        <p className={styles.pageForumBlockDesc}>{topicData.description}</p>
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
