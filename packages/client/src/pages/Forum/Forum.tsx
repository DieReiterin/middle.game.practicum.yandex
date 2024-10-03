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
      const updatedTopics = [
        ...topics,
        JSON.stringify({ name: newTopic, description: newDescription }),
      ]
      setTopics(updatedTopics)
      setNewTopic('')
      setNewDescription('')
      handleClose()

      localStorage.setItem('topics', JSON.stringify(updatedTopics))
    }
  }

  const handleBlockClick = (index: number) => {
    const topicData = JSON.parse(topics[index])
    navigate(`${PathsRoutes.Forum}/${index + 1}`, { state: topicData })
  }

  const deleteTopic = (index: number) => {
    const updatedTopics = topics.filter((_, i) => i !== index)
    setTopics(updatedTopics)
    localStorage.setItem('topics', JSON.stringify(updatedTopics))

    localStorage.removeItem(`comments_${index + 1}`)
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

  return (
    <div className={styles.forum}>
      <div className={styles.forumBlock}>
        <h3 className={styles.forumBlockTitle}>Форумы</h3>
        <div className={styles.forumBlockHeader}>
          <div className={styles.forumBlockHeaderBlock}>
            <div>
              <p>Тема</p>
            </div>
            <div>
              <p>Треды</p>
              <p>Сообщения</p>
            </div>
          </div>
          <Tooltip onClick={clearTopics} title="Удалить все записи">
            <IconButton>
              <DeleteIcon style={{ color: '#b0abfe' }} />
            </IconButton>
          </Tooltip>
        </div>
        <div className={styles.forumBlockContent}>
          {topics.map((t, index) => {
            let topicData
            try {
              topicData = JSON.parse(t)
            } catch (error) {
              return null
            }

            return (
              <div key={index} className={styles.forumBlockContentBlock}>
                <ForumBlock
                  name={topicData.name}
                  threads={index + 1}
                  messages={index + 5}
                  onClick={() => handleBlockClick(index)}
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteTopic(index)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            )
          })}
        </div>
        <div className={styles.forumBlockFooter}>
          <ButtonLink
            to={PathsRoutes.Main}
            sx={{
              margin: '10px',
              background: '#b0abfe',
              color: 'white',
              width: '100px',
            }}>
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
