import React, { useEffect, useState } from 'react'
import styles from './ForumMessage.module.scss'
import avatar from '@/assets/images/photo-1-720.jpg'

type ForumMessageProps = {
  message: string
}
const ForumMessage: React.FC<ForumMessageProps> = ({ message }) => {
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
              Anonymous user
            </p>
            <p className={styles.forumMessageBlockUserDataDescName}>admin</p>
          </div>
        </div>
        <div className={styles.forumMessageText}>{message}</div>
      </div>
    </div>
  )
}

export default ForumMessage
