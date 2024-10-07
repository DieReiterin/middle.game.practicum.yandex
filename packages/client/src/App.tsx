import { FC } from 'react'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './assets/theme'
import { getRoutes } from './router'
import { BrowserRouter, useRoutes } from 'react-router-dom'

import '@fontsource/manrope/300.css'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/700.css'
import './App.css'
import { useAuth } from './hooks'
import { Loader } from './components'

const Routes: FC = () => {
  const { loader, user } = useAuth()
  const isAuthorized = Boolean(user)

  const routes = getRoutes(isAuthorized)

  return loader ? <Loader /> : useRoutes(routes)
}

const startServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.debug(
            'ServiceWorker registration successful with scope: ',
            registration.scope
          )
        })
        .catch((error: string) => {
          console.debug('ServiceWorker registration failed: ', error)
        })
    })
  }
}

startServiceWorker()

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
