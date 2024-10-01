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

  const [topic, setTopic] = useState<string[]>(() => {
    const savedTopics = localStorage.getItem('topics')
    return savedTopics ? JSON.parse(savedTopics) : []
  })

  const [newTopic, setNewTopic] = useState('')
  const [newDescription, setNewDescription] = useState('')

  const addTopic = () => {
    if (newTopic.trim() && newDescription.trim()) {
      const updatedTopics = [
        ...topic,
        JSON.stringify({ name: newTopic, description: newDescription }),
      ]
      setTopic(updatedTopics)
      setNewTopic('')
      setNewDescription('')
      handleClose()

      localStorage.setItem('topics', JSON.stringify(updatedTopics))
    }
  }

  const handleBlockClick = (index: number) => {
    const topicData = JSON.parse(topic[index])
    navigate(`${PathsRoutes.Forum}/${index + 1}`, { state: topicData })
  }

  const deleteTopic = (index: number) => {
    const updatedTopics = topic.filter((_, i) => i !== index)
    setTopic(updatedTopics) // Обновляем состояние
    localStorage.setItem('topics', JSON.stringify(updatedTopics))

    localStorage.removeItem(`comments_${index + 1}`)
  }

  const clearTopics = () => {
    setTopic([])
    localStorage.removeItem('topics')
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('comments_')) {
        localStorage.removeItem(key)
      }
    })
  }

  return (
    <div className={styles.forum}>
      <div className={styles.forum__block}>
        <h3 className={styles.forum__block_title}>Форумы</h3>
        <div className={styles.forum__block_header}>
          <div className={styles.forum__block_headerBlock}>
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
        <div className={styles.forum__block_content}>
          {topic.map((t, index) => {
            let topicData
            try {
              topicData = JSON.parse(t)
            } catch (error) {
              return null
            }

            return (
              <div key={index} className={styles.forum__block_contentBlock}>
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
        <div className={styles.forum__block_footer}>
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
