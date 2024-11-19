import React, { useState } from 'react'
import { Box, Button, Modal, TextField } from '@mui/material'
import styles from './ForumModal.module.scss'
import { addTopic } from '@/ducks/user'

interface ForumModalProps {
  open: boolean
  handleClose: () => void
  getTopics: () => void
}

interface ForumProps {
  topic_name: string
  topic_descr: string
}

const ForumModal: React.FC<ForumModalProps> = ({
  open,
  handleClose,
  getTopics,
}) => {
  const [newTopic, setNewTopic] = useState('')
  const [newDescription, setNewDescription] = useState('')

  const isButtonDisabled = !newTopic.trim() || !newDescription.trim()

  const handleModalClose = () => {
    handleClose()
    setNewTopic('')
    setNewDescription('')
  }

  // const getTopics = async () => {
  //   try {
  //     const data = await getAllTopics()
  //     setTopicsData(data)
  //   } catch (e) {
  //     console.error('fetchTopics error:', e)
  //   }
  // }

  const handleAddTopic = async () => {
    const params: ForumProps = {
      topic_name: newTopic,
      topic_descr: newDescription,
    }
    addTopic(params)
    getTopics()
  }

  return (
    <Modal
      className={styles.forumModal}
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box className={styles.forumModalContent}>
        <h3 className={styles.forumModalContentTitle}>Новая тема</h3>
        <TextField
          className={styles.forumModalContentInput}
          id="standard-basic"
          label="Название темы"
          variant="standard"
          value={newTopic}
          onChange={e => setNewTopic(e.target.value)}
        />
        <TextField
          className={styles.forumModalContentInput}
          id="standard-basic-description"
          label="Описание темы"
          variant="standard"
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleAddTopic}
          disabled={isButtonDisabled}>
          Добавить новую тему
        </Button>
      </Box>
    </Modal>
  )
}

export default ForumModal
