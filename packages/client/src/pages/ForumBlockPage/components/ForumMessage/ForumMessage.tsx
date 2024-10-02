import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import styles from './ForumMessage.module.scss'
import { Button, InputAdornment, TextField } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import SendIcon from '@mui/icons-material/Send'
import avatar from '../../../../assets/images/photo-1-720.jpg'

const ForumMessage: React.FC = ({ messege }) => {
  const { id } = useParams()
  const location = useLocation()

  const topicData = location.state

  if (!topicData) {
    return (
      <div className={styles.forumBlock__block}>
        <h3>Ошибка: Данные темы не найдены.</h3>
      </div>
    )
  }

  const [comments, setComments] = useState<string[]>(() => {
    const savedComments = localStorage.getItem(`comments_${id}`)
    return savedComments ? JSON.parse(savedComments) : []
  })

  const [comment, setComment] = useState('')

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && comment.trim()) {
      addComment()
    }
  }

  const addComment = () => {
    const updatedComments = [...comments, comment]
    setComments(updatedComments)
    setComment('')

    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments))
  }

  useEffect(() => {
    const savedComments = localStorage.getItem(`comments_${id}`)
    if (savedComments) {
      setComments(JSON.parse(savedComments))
    }
  }, [id])

  return (
    <div className={styles.forumBlock}>
      <div className={styles.forumBlock__block}>
        <div className={styles.forumBlock__block__userData}>
          <div className={styles.forumBlock__block__userData_img}>
            <img src={avatar} alt="avatar" />
          </div>
          <div className={styles.forumBlock__block__userData_desc}>
            <p>Admin123</p>
            <p>admin</p>
          </div>
        </div>
        <div className={styles.forumBlock__block__content}>
          <div className={styles.forumBlock__block__content__messege}>
            <h2>{messege}</h2>
          </div>
          <div className={styles.forumBlock__block__content__comments}>
            {comments.map((c, index) => (
              <p
                key={index}
                className={styles.forumBlock__block__content__comments_desc}>
                {c}
              </p>
            ))}
          </div>
          <div className={styles.forumBlock__block__content__input}>
            <TextField
              id="input-with-icon-textfield"
              label="Введите комментарий"
              variant="standard"
              value={comment}
              onChange={e => setComment(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={addComment}
              disabled={!comment.trim()}>
              Добавить
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForumMessage
