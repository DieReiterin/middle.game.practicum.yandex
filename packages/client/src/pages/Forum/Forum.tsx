import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Forum.module.scss'
import { ButtonLink } from '../../components/ButtonLink'
import { PathsRoutes } from '../../router/types'
import { Button, IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ForumBlock from './components/ForumBlock/ForumBlock'
import ForumModal from './components/ForumModal/ForumModal'

const Forum = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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

  return (
    <div className={styles.forum}>
      <div className={styles.forumBlock}>
        <h3 className={styles.forumBlockTitle}>Форумы</h3>
        <div className={styles.forumBlockHeader}>
          <div className={styles.forumBlockHeaderBlock}>
            <div>
              <p className={styles.forumBlockHeaderBlockText}>Тема</p>
            </div>
            <div className={styles.forumBlockHeaderBlockDesc}>
              <p className={styles.forumBlockHeaderBlockText}>Треды</p>
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
          {parsedTopics.map((topic, index) => (
            <div key={topic.id} className={styles.forumBlockContentBlock}>
              <ForumBlock
                name={topic.name}
                threads={index + 1}
                messages={0}
                onClick={() => handleBlockClick(topic.id)}
              />
              <IconButton
                aria-label="delete"
                onClick={() => deleteTopic(topic.id)}>
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
          newTopic={newTopic}
          setNewTopic={setNewTopic}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          addTopic={addTopic}
        />
      </div>
    </div>
  )
}

export default Forum
