import React from 'react'
import App from './src/App'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './src/assets/theme'
import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './src/ducks/store'

export async function render(cache: EmotionCache) {
  const store = configureStore({
    reducer,
  })

  const appHtml = renderToString(
    <React.StrictMode>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <App />
          </Provider>
        </ThemeProvider>
      </CacheProvider>
    </React.StrictMode>,
  )

  return {
    appHtml,
    initialState: store.getState(),
  }
}
