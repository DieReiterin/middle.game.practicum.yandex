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
  const imageSrc = src && src.trim() ? src : defaultImage

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
      <img src={imageSrc} alt={alt} className={styles.image__pic} />
    </div>
  )
}
