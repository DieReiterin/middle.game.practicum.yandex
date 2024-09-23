import { FC, useEffect } from 'react'

import { ThemeProvider } from '@mui/material'
import { theme } from './assets/theme'
import { routes } from './router'
import { BrowserRouter, useRoutes } from 'react-router-dom'

import '@fontsource/manrope/300.css'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/700.css'
import './App.css'

const Routes: FC = () => {
  return useRoutes(routes)
}

const App = () => {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
