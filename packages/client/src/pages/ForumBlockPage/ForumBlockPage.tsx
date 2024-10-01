import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import styles from './ForumBlockPage.module.scss'
import { InputAdornment, SvgIcon, TextField } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import avatar from '../../assets/images/photo-1-720.jpg'

const ForumBlockPage: React.FC = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

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
    setComment('') // Очищаем поле ввода

    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments))
  }

  useEffect(() => {
    const savedComments = localStorage.getItem(`comments_${id}`)
    if (savedComments) {
      setComments(JSON.parse(savedComments))
    }
  }, [id])

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

  return (
    <div className={styles.forumBlock}>
      <div className={styles.forumBlock__buttonHome} onClick={handleHomeClick}>
        <HomeIcon />
      </div>
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
          <h2 className={styles.forumBlock__block__content__title}>
            {topicData.name}
          </h2>
          <p className={styles.forumBlock__block__content__desc}>
            {topicData.description}
          </p>

          <div className={styles.forumBlock__block__content__comments}>
            {comments.map((c, index) => (
              <p
                key={index}
                className={styles.forumBlock__block__content__comments_desc}>
                --{c}
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForumBlockPage
