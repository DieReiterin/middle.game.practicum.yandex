import React from 'react'
import { Box, Button, Modal, TextField } from '@mui/material'
import styles from './ForumModal.module.scss'

interface ForumModalProps {
  open: boolean
  handleClose: () => void
  newTopic: string
  setNewTopic: (value: string) => void
  newDescription: string
  setNewDescription: (value: string) => void
  addTopic: () => void
}

const ForumModal: React.FC<ForumModalProps> = ({
  open,
  handleClose,
  newTopic,
  setNewTopic,
  newDescription,
  setNewDescription,
  addTopic,
}) => {
  const isButtonDisabled = !newTopic.trim() || !newDescription.trim()

  const handleModalClose = () => {
    handleClose()
    setNewTopic('')
    setNewDescription('')
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
          onClick={addTopic}
          disabled={isButtonDisabled}>
          Добавить новую тему
        </Button>
      </Box>
    </Modal>
  )
}

export default ForumModal
