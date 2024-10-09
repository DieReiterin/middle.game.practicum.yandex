import { FC, MouseEvent } from 'react'
import styles from './Image.module.scss'
import defaultImage from './default_profile.png'

interface IProps {
  className?: string
  src?: string
  alt?: string
  type?: boolean
  onClick?: () => void
}

export const Image: FC<IProps> = ({
  className = '',
  src = defaultImage,
  alt = '',
  type = false,
  onClick,
}) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (onClick) {
      onClick()
    }
  }

  return (
    <div
      className={`${styles.image} ${className} ${
        type ? styles.image_default : ''
      }`}
      onClick={handleClick}>
      <img src={src} alt={alt} className={styles.image__pic} />
    </div>
  )
}
