import { FC, MouseEvent } from 'react'
import styles from './Button.module.scss'

interface IProps {
  className?: string
  text?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

export const Button: FC<IProps> = ({
  className = '',
  text = '',
  type = 'button',
  onClick,
}) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (onClick) {
      onClick()
    }
  }

  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      onClick={handleClick}>
      {text}
    </button>
  )
}
