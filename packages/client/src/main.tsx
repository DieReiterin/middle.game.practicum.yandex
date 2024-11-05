import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { mockStore } from './ducks/mockStore'

import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './assets/theme'

function createClientCache() {
  const emotionInsertionPoint = document.querySelector(
    'meta[name="emotion-insertion-point"]',
  )
  const insertionPoint =
    emotionInsertionPoint instanceof HTMLElement
      ? emotionInsertionPoint
      : undefined

  return createCache({ key: 'mui-style', insertionPoint })
}

const cache = createClientCache()

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={mockStore}>
          <App />
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>,
)
