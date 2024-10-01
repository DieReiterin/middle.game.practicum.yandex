import React from 'react'
import styles from './ForumBlock.module.scss'

interface ForumBlockProps {
  name: string
  threads: number
  messages: number
  onClick: () => void
}

const ForumBlock: React.FC<ForumBlockProps> = ({
  name,
  threads,
  messages,
  onClick,
}) => {
  return (
    <div className={styles.forumBlock} onClick={onClick}>
      <h4>{name}</h4>
      <div className={styles.forumBlock__desc}>
        <p>{threads}</p>
        <p>{messages}</p>
      </div>
    </div>
  )
}

export default ForumBlock
