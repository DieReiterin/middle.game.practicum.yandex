import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Forum.module.scss'
import { ButtonLink } from '../../components/ButtonLink'
import { PathsRoutes } from '../../router/types'
import { Button, IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ForumBlock from './components/ForumBlock/ForumBlock'
import ForumModal from './components/ForumModal/ForumModal'
import { usePage } from '@/hooks'
import { PageInitArgs } from '@/ducks/store'
import { fetchTopics, getUser, userSelector } from '@/ducks/user'

interface Topic {
  topic_id: number
  topic_name: string
  messages_count: number
}

const Forum = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  usePage({ initPage: initForumPage })

  const [topics, setTopics] = useState<string[]>(() => {
    const savedTopics = localStorage.getItem('topics')
    return savedTopics ? JSON.parse(savedTopics) : []
  })

  const [newTopic, setNewTopic] = useState('')
  const [newDescription, setNewDescription] = useState('')

  const addTopic = () => {
    if (newTopic.trim() && newDescription.trim()) {
      const topicData = {
        id: Date.now(),
        name: newTopic,
        description: newDescription,
      }
      const updatedTopics = [...topics, JSON.stringify(topicData)]
      setTopics(updatedTopics)
      setNewTopic('')
      setNewDescription('')
      handleClose()
      localStorage.setItem('topics', JSON.stringify(updatedTopics))
    }
  }

  const handleBlockClick = (id: number) => {
    const topicData = topics
      .map(t => JSON.parse(t))
      .find(topic => topic.id === id)
    navigate(`${PathsRoutes.Forum}/${id}`, { state: topicData })
  }

  const deleteTopic = (id: number) => {
    const updatedTopics = topics.filter(t => JSON.parse(t).id !== id)
    setTopics(updatedTopics)
    localStorage.setItem('topics', JSON.stringify(updatedTopics))
    localStorage.removeItem(`comments_${id}`)
  }

  const clearTopics = () => {
    setTopics([])
    localStorage.removeItem('topics')
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('comments_')) {
        localStorage.removeItem(key)
      }
    })
  }

  const parsedTopics = topics.map(t => JSON.parse(t))

  const [topicsData, setTopicsData] = useState<Topic[]>([])
  const getTopics = async () => {
    const data = await fetchTopics()
    setTopicsData(data)
  }

  useEffect(() => {
    getTopics()
  }, [])

  return (
    <div className={styles.forum}>
      <div className={styles.forumBlock}>
        <h3 className={styles.forumBlockTitle}>Форум</h3>
        <div className={styles.forumBlockHeader}>
          <div className={styles.forumBlockHeaderBlock}>
            <div>
              <p className={styles.forumBlockHeaderBlockText}>Название темы</p>
            </div>
            <div className={styles.forumBlockHeaderBlockDesc}>
              <p className={styles.forumBlockHeaderBlockText}>Сообщения</p>
            </div>
          </div>
          <Tooltip onClick={clearTopics} title="Удалить все записи">
            <IconButton>
              <DeleteIcon style={{ color: '#b0abfe' }} />
            </IconButton>
          </Tooltip>
        </div>
        <div className={styles.forumBlockContent}>
          {topicsData.map(topic => (
            <div key={topic.topic_id} className={styles.forumBlockContentBlock}>
              <ForumBlock
                name={topic.topic_name}
                messages={topic.messages_count}
                onClick={() => handleBlockClick(topic.topic_id)}
              />
              <IconButton
                aria-label="delete"
                onClick={() => deleteTopic(topic.topic_id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
        <div className={styles.forumBlockFooter}>
          <ButtonLink
            to={PathsRoutes.Main}
            className={styles.forumBlockFooterButton}>
            Назад
          </ButtonLink>
          <Button onClick={handleOpen} variant="contained">
            Добавить
          </Button>
        </div>
        <ForumModal
          open={open}
          handleClose={handleClose}
          getTopics={getTopics}
        />
      </div>
    </div>
  )
}

export default Forum

export const initForumPage = async ({
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
