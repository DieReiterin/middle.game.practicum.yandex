import React from 'react'
import App from './src/App'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { mockStore } from './src/ducks/mockStore'

import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './src/assets/theme'

export function render(cache: EmotionCache) {
  const appHtml = renderToString(
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
  return appHtml
}
