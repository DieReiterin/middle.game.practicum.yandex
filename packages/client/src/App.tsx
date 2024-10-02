import { FC, useContext } from 'react'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './assets/theme'
import { getRoutes } from './router'
import { BrowserRouter, useRoutes } from 'react-router-dom'

import '@fontsource/manrope/300.css'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/700.css'
import './App.css'
import { AuthContext, AuthProvider } from './context'

const Routes: FC = () => {
  const context = useContext(AuthContext)
  const isAuthorized = Boolean(context?.userInfo)

  const routes = getRoutes(isAuthorized)

  return useRoutes(routes)
}

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
