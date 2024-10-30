import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { mockStore } from './ducks/mockStore'

import { CacheProvider } from '@emotion/react'
import createEmotionCache from '../createEmotionCache'

const cache = createEmotionCache()

function Main() {
  return (
    <CacheProvider value={cache}>
      <Provider store={mockStore}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </CacheProvider>
  )
}

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, <Main />)
