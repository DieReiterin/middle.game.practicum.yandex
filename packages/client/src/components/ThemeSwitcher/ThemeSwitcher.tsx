// ThemeSwitcher.tsx

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { themesSelector, currentThemeSelector } from '@/ducks/theme/selectors'
import { setUserTheme, setCurrentTheme } from '@/ducks/theme/slices'
import { userSelector } from '@/ducks/user'
import { useAppDispatch } from '@/ducks/store'
import styles from './ThemeSwitcher.module.scss'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

export const ThemeSwitcher: React.FC = () => {
  const dispatch = useAppDispatch()
  const themes = useSelector(themesSelector)
  const currentTheme = useSelector(currentThemeSelector)
  const user = useSelector(userSelector)
  const isDarkTheme = currentTheme?.id === 2

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newThemeId = isDarkTheme ? 1 : 2 // Переключение между ID тем
    const selectedTheme = themes.find(t => t.id === newThemeId)
    if (selectedTheme) {
      if (user) {
        dispatch(
          setUserTheme({ userId: user.id.toString(), themeId: newThemeId }),
        )
        localStorage.setItem('themeId', newThemeId.toString())
      } else {
        dispatch(setCurrentTheme(selectedTheme))
        localStorage.setItem('themeId', newThemeId.toString())
      }
    }
  }

  useEffect(() => {
    console.log('currentTheme', currentTheme)
  }, [currentTheme])

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add(styles['dark-theme'])
    } else {
      document.documentElement.classList.remove(styles['dark-theme'])
    }
  }, [isDarkTheme])

  return (
    <div className={styles.themeSwitcher}>
      <input
        type="checkbox"
        className={styles.checkbox}
        id="theme-switch"
        checked={isDarkTheme}
        onChange={handleThemeChange}
      />
      <label className={styles.label} htmlFor="theme-switch">
        <DarkModeIcon
          className={`${styles.icon} ${isDarkTheme ? styles.visible : ''}`}
        />
        <LightModeIcon
          className={`${styles.icon} ${!isDarkTheme ? styles.visible : ''}`}
        />
        <div className={styles.switch}></div>
      </label>
    </div>
  )
}
