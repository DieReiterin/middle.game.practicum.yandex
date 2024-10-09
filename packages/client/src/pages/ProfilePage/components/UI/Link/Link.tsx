import { FC, MouseEvent } from 'react'
import styles from './Link.module.scss'

interface IProps {
  href?: string
  className?: string
  text?: string
  onClick?: () => void
}

export const Link: FC<IProps> = ({
  href = '',
  className = '',
  text = '',
  onClick,
}) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (onClick) {
      onClick()
    }
  }

  return (
    <a
      className={`${styles.link} ${className}`}
      href={href || '#'}
      onClick={handleClick}>
      {text}
    </a>
  )
}
