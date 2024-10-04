import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import styles from './ForumMessage.module.scss'
import { Button, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import avatar from '../../../../assets/images/photo-1-720.jpg'

type ForumMessageProps = {
  message: string
}
const ForumMessage: React.FC<ForumMessageProps> = ({ message }) => {
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
    <div className={styles.forumMessage}>
      <div className={styles.forumMessageBlock}>
        <div className={styles.forumMessageBlockUserData}>
          <div className={styles.forumMessageBlockUserDataImg}>
            <img src={avatar} alt="avatar" />
          </div>
          <div className={styles.forumMessageBlockUserDataDesc}>
            <p>Admin123</p>
            <p>admin</p>
          </div>
        </div>
        <div className={styles.forumMessageBlockContent}>
          <div>
            <h2>{message}</h2>
          </div>
          <div className={styles.forumMessageBlockContentComments}>
            {comments.map((c, index) => (
              <p
                key={index}
                className={styles.forumMessageBlockContentCommentsDesc}>
                {c}
              </p>
            ))}
          </div>
          <div className={styles.forumMessageBlockContentInput}>
            <TextField
              id="input-with-icon-textfield"
              label="Введите комментарий"
              variant="standard"
              value={comment}
              onChange={e => setComment(e.target.value)}
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
