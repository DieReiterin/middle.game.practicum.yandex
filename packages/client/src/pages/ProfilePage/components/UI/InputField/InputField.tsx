import { FC, useState } from 'react'
import { Input } from '../Input'
import styles from './InputField.module.scss'

interface IProps {
  typeProfile?: boolean
  name?: string
  id?: string
  placeholder?: string
  value?: string
  label?: string
  className?: string
  onBlur?: () => void
  onInput?: (val: string) => void
}

export const InputField: FC<IProps> = ({
  typeProfile = false,
  name = '',
  id = '',
  placeholder = '',
  value = '',
  label = '',
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

  const handleInput = (val: string) => {
    setInputValue(val)
    if (onInput) {
      onInput(val)
    }
  }

  return (
    <div
      className={`${styles.inputField} ${
        typeProfile ? styles.inputField_type_profile : ''
      } ${className}`}>
      {label && (
        <label className={styles.inputField__label} htmlFor={id}>
          {label}
        </label>
      )}
      <Input
        typeProfile={typeProfile}
        name={name}
        id={id}
        placeholder={placeholder}
        value={inputValue}
        onBlur={handleBlur}
        onInput={handleInput}
      />
    </div>
  )
}
