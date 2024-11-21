import React, { useEffect, useState } from 'react'
import styles from './ForumMessage.module.scss'
import avatar from '@/assets/images/photo-1-720.jpg'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import MoodIcon from '@mui/icons-material/Mood'
import { Emoji } from '@/ducks/emojis'
import { addEmojiToMessage, AddEmojiToMessageParams } from '@/ducks/user'

type ForumMessageProps = {
  message: string
  emojis: Emoji[]
  messageId: number
  emoji?: number
  userName?: string
}
const ForumMessage: React.FC<ForumMessageProps> = ({
  emojis,
  emoji: currentEmoji,
  message,
  messageId,
  userName,
}) => {
  const [emoji, setEmoji] = useState<number | undefined>(
    currentEmoji || undefined,
  )

  const handleEmojiChange = async (
    event: SelectChangeEvent<string>,
  ): Promise<void> => {
    const emoji_id =
      event.target.value !== undefined ? Number(event.target.value) : undefined
    setEmoji(emoji_id)

    try {
      const data = await addEmojiToMessage({ emoji_id, message_id: messageId })

      if (
        data &&
        'message' in data &&
        data.message !== 'Message added successfully'
      ) {
        throw new Error('server error')
      }
    } catch (e) {
      console.error('sendMessage error:', e)
    }
  }

  useEffect(() => {
    setEmoji(currentEmoji || undefined)
  }, [currentEmoji])

  return (
    <div className={styles.forumMessage}>
      <div className={styles.forumMessageBlock}>
        <div className={styles.forumMessageBlockUserData}>
          <div>
            <img
              className={styles.forumMessageBlockUserDataImg}
              src={avatar}
              alt="avatar"
            />
          </div>
          <div className={styles.forumMessageBlockUserDataDesc}>
            <p className={styles.forumMessageBlockUserDataDescNick}>
              {userName || 'Anonymous user'}
            </p>
            <p className={styles.forumMessageBlockUserDataDescName}>admin</p>
          </div>
        </div>
        <div className={styles.forumMessageText}>{message}</div>
      </div>
      <FormControl>
        {!emoji && (
          <InputLabel id="emoji">
            <MoodIcon />
          </InputLabel>
        )}
        <Select
          labelId="emoji"
          size="small"
          variant="standard"
          value={emoji ? emoji.toString() : undefined}
          className={styles.emojiField}
          onChange={handleEmojiChange}>
          {emojis &&
            emojis.map(({ emoji, emoji_id }) => (
              <MenuItem
                key={emoji_id}
                value={emoji_id.toString()}
                className={styles.emoji}>
                {emoji}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default ForumMessage
