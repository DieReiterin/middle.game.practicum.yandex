import { FC, useState, ChangeEvent } from 'react'
import styles from './Input.module.scss'

interface IProps {
  name?: string
  id?: string
  placeholder?: string
  value?: string
  typeProfile?: boolean
  className?: string
  onBlur?: () => void
  onInput?: (val: string) => void
}

export const Input: FC<IProps> = ({
  name = '',
  id = '',
  placeholder = '',
  value = '',
  typeProfile = false,
  className = '',
  onBlur,
  onInput,
}) => {
  const [inputValue, setInputValue] = useState(value || '')

  const handleBlur = () => {
    if (onBlur) {
      onBlur()
    }
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInputValue(val)
    if (onInput) {
      onInput(val)
    }
  }

  return (
    <input
      name={name}
      className={`${styles.input} ${
        typeProfile ? styles.input_type_profile : ''
      } ${className}`}
      type="text"
      id={id}
      placeholder={placeholder}
      value={inputValue}
      onBlur={handleBlur}
      onInput={handleInput}
    />
  )
}
