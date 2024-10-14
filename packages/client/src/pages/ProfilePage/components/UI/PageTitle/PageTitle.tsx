import { FC } from 'react'
import styles from './PageTitle.module.scss'

interface IProps {
  className?: string
  text?: string
}

export const PageTitle: FC<IProps> = ({ className = '', text = '' }) => {
  return <h1 className={`${styles.pageTitle} ${className}`}>{text}</h1>
}
