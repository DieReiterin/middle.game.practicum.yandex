import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { mockStore } from './ducks/mockStore'

import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

const cache = createCache({ key: 'css' })

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <CacheProvider value={cache}>
    <Provider store={mockStore}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </CacheProvider>,
)
