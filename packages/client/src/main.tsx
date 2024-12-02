import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { ThemeProvider } from './context/ThemeProvider'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { store } from './ducks/store'
import { Helmet } from 'react-helmet'

import { CssBaseline } from '@mui/material'

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
    <Helmet>
      <meta
        httpEquiv="Content-Security-Policy"
        content="default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com https://mui.com/; img-src 'self' data:; font-src 'self' https://fonts.gstatic.com;"
      />
    </Helmet>
    <CacheProvider value={cache}>
      <Provider store={store}>
        <ThemeProvider>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  </React.StrictMode>,
)
