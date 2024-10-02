import React, { useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import styles from './ForumBlockPage.module.scss'
import { Button, SvgIcon, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import ForumMessage from './components/ForumMessage/ForumMessage'

const ForumBlockPage: React.FC = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const topicData = location.state

  if (!topicData) {
    return (
      <div className={styles.forum_Block__block}>
        <h3>Ошибка: Данные темы не найдены.</h3>
      </div>
    )
  }

  function HomeIcon(props) {
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
    <div className={styles.forum_Block}>
      <div className={styles.forum_Block__buttonHome} onClick={handleHomeClick}>
        <HomeIcon />
      </div>
      <div className={styles.forum_Block__block}>
        <h2 className={styles.forum_Block__block__title}>{topicData.name}</h2>
        <p className={styles.forum_Block__block__desc}>
          {topicData.description}
        </p>
      </div>
      <div className={styles.forum_Block__input}>
        <TextField
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
      <div className={styles.forum_Block_messege}>
        {comments.map((msg, index) => (
          <ForumMessage key={index} messege={msg} />
        ))}
      </div>
    </div>
  )
}

export default ForumBlockPage
