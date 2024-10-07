import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './ForumMessage.module.scss'
import { Button, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import avatar from '../../../../assets/images/photo-1-720.jpg'
import useTopicData from '../../../../hooks/useTopicData'

type ForumMessageProps = {
    message: string
}
const ForumMessage: React.FC<ForumMessageProps> = ({ message }) => {
    const { id } = useParams()
    useTopicData()

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
                    <div>
                        <img
                            className={styles.forumMessageBlockUserDataImg}
                            src={avatar}
                            alt="avatar"
                        />
                    </div>
                    <div className={styles.forumMessageBlockUserDataDesc}>
                        <p className={styles.forumMessageBlockUserDataDescNick}>
                            Admin123
                        </p>
                        <p className={styles.forumMessageBlockUserDataDescName}>
                            admin
                        </p>
                    </div>
                </div>
                <div className={styles.forumMessageBlockContent}>
                    <div>
                        <h2>{message}</h2>
                    </div>
                    <div className={styles.forumMessageBlockContentComments}>
                        {comments.map((comment, index) => (
                            <p
                                key={index}
                                className={
                                    styles.forumMessageBlockContentCommentsDesc
                                }>
                                {comment}
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
                            className={styles.forumMessageBlockContentButton}
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
