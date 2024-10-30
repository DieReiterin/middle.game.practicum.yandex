import React from 'react'
import App from './src/App'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { mockStore } from './src/ducks/mockStore'

import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

export function render(cache: EmotionCache) {
  const appHtml = renderToString(
    <CacheProvider value={cache}>
      <Provider store={mockStore}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </CacheProvider>,
  )
  return appHtml
}
