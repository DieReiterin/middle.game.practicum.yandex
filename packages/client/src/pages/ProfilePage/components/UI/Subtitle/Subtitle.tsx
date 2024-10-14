import { FC } from 'react'
import styles from './Subtitle.module.scss'

interface IProps {
  className?: string
  text?: string
}

export const Subtitle: FC<IProps> = ({ className = '', text = '' }) => {
  return <span className={`${styles.subtitle} ${className}`}>{text}</span>
}
