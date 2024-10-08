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
    <button className={styles.forumBlockElem} onClick={onClick}>
      <h4>{name}</h4>
      <div className={styles.forumBlockElemDesc}>
        <p>{threads}</p>
        <p>{messages}</p>
      </div>
    </button>
  )
}

export default ForumBlock
