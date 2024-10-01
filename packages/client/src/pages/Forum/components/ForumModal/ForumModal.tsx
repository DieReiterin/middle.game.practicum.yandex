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
  return (
    <Modal
      className={styles.forumModal}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box className={styles.forumModal__desc}>
        <h3>Новая тема</h3>
        <TextField
          id="standard-basic"
          label="Название темы"
          variant="standard"
          value={newTopic}
          onChange={e => setNewTopic(e.target.value)}
        />
        <TextField
          id="standard-basic-description"
          label="Описание темы"
          variant="standard"
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
        />
        <Button variant="contained" onClick={addTopic}>
          Добавить новую тему
        </Button>
      </Box>
    </Modal>
  )
}

export default ForumModal
