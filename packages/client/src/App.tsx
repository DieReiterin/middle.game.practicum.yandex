import { routes } from './router'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { Error } from './pages'
import '@fontsource/manrope/300.css'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/700.css'
import './App.css'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

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
  const router = createBrowserRouter(routes)

  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <RouterProvider router={router} />
      <ThemeSwitcher />
    </ErrorBoundary>
  )
}

export default App
