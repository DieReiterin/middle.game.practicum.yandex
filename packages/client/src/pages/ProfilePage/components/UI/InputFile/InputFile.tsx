import { FC, ChangeEvent } from 'react'
import styles from './InputFile.module.scss'

interface IProps {
  name?: string
  id?: string
  accept?: string
  className?: string
  onChange?: (file: File) => void
}

export const InputFile: FC<IProps> = ({
  name = '',
  id = '',
  accept = '',
  className = '',
  onChange,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    if (input.files && input.files[0] && onChange) {
      onChange(input.files[0])
    }
  }

  return (
    <input
      className={`${styles.inputFile} ${className}`}
      type="file"
      name={name}
      id={id}
      accept={accept}
      onChange={handleChange}
    />
  )
}
