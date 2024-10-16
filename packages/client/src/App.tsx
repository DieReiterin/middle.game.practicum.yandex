import { FC } from 'react'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './assets/theme'
import { getRoutes } from './router'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { Error } from './pages'

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

type TFallbackRenderProps = {
  error: {
    message: string
  }
}
function fallbackRender({ error }: TFallbackRenderProps) {
  if (error?.message?.includes('500')) {
    return (
      <Error title="500" descr="Мы уже чиним" text="Вернитесь чуть позже" />
    )
  }
  return (
    <Error
      title="Опаньки..."
      descr="Что-то пошло не так"
      text="Попробуйте перезагрузить страницу"
    />
  )
}

const App = () => {
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={fallbackRender}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes />
          </ThemeProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  )
}

export default App
