import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Forum.module.scss'
import { ButtonLink } from '../../components/ButtonLink'
import { PathsRoutes } from '../../router/types'
import { Button } from '@mui/material'
import ForumBlock from './components/ForumBlock/ForumBlock'
import ForumModal from './components/ForumModal/ForumModal'
import { usePage } from '@/hooks'
import { PageInitArgs } from '@/ducks/store'
import { getAllTopics, getUser, userSelector } from '@/ducks/user'

interface Topic {
  topic_id: number
  topic_name: string
  topic_descr: string
  messages_count: number
}

const Forum = () => {
  usePage({ initPage: initForumPage })
  const navigate = useNavigate()
  const [modalOpened, setModalOpened] = useState(false)
  const openModal = () => setModalOpened(true)
  const closeModal = () => setModalOpened(false)

  const [topicsData, setTopicsData] = useState<Topic[]>([])

  const getTopics = async () => {
    try {
      const data = await getAllTopics()
      setTopicsData(data)
    } catch (e) {
      console.error('fetchTopics error:', e)
    }
  }

  useEffect(() => {
    getTopics()
  }, [])

  const handleBlockClick = (id: number) => {
    navigate(`${PathsRoutes.Forum}/${id}`)
  }

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
        </div>
        <div className={styles.forumBlockContent}>
          {Array.isArray(topicsData) &&
            topicsData.length > 0 &&
            topicsData.map(topic => (
              <div
                key={topic.topic_id}
                className={styles.forumBlockContentBlock}>
                <ForumBlock
                  name={topic.topic_name}
                  messages={topic.messages_count}
                  onClick={() => handleBlockClick(topic.topic_id)}
                />
              </div>
            ))}
        </div>
        <div className={styles.forumBlockFooter}>
          <ButtonLink
            to={PathsRoutes.Main}
            className={styles.forumBlockFooterButton}>
            Назад
          </ButtonLink>
          <Button onClick={openModal} variant="contained">
            Добавить
          </Button>
        </div>
        <ForumModal
          open={modalOpened}
          handleClose={closeModal}
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
