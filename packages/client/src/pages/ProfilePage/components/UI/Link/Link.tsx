import { FC, MouseEvent } from 'react'
import styles from './Link.module.scss'

interface IProps {
  href?: string
  className?: string
  text?: string
  onClick?: () => void
  disabled?: boolean
}

export const Link: FC<IProps> = ({
  href = '',
  className = '',
  text = '',
  onClick,
  disabled,
}) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    if (onClick) {
      onClick()
    }
  }

  return (
    <a
      className={`${styles.link} ${className} ${
        disabled ? styles.link_disabled : ''
      }`}
      href={disabled ? undefined : href}
      onClick={handleClick}
      aria-disabled={disabled ? 'true' : 'false'}>
      {text}
    </a>
  )
}
