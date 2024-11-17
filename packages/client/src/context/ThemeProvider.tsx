// ThemeProvider.tsx
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider as MuiThemeProvider, Theme } from '@mui/material'
import { themesMap, lightTheme } from '@/assets/themes'
import { currentThemeSelector } from '@/ducks/theme'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const currentTheme = useSelector(currentThemeSelector)
  const muiTheme: Theme = currentTheme ? themesMap[currentTheme.id] : lightTheme

  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
}
