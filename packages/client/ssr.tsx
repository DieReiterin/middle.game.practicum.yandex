import React from 'react'
import App from './src/App'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
// import { createStore } from './src/ducks/store'

import { mockStore } from './src/ducks/mockStore'

export function render() {
  // export function render(url: string) {
  // const store = createStore()

  const appHtml = renderToString(
    <Provider store={mockStore}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  )

  // const preloadedState = store.getState()

  // return { appHtml, preloadedState }
  return { appHtml }
}
