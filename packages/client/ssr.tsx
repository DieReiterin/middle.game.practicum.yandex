import React from 'react'
import App from './src/App'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
// import { StaticRouter } from 'react-router-dom/server'
// import { createStore } from './src/ducks/store'

import { mockStore } from './src/ducks/mockStore'

export function render() {
  // export function render(url: string) {
  // const store = createStore()

  const appHtml = renderToString(
    // <StaticRouter location={url}>
    <Provider store={mockStore}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
    // </StaticRouter>
  )

  // const preloadedState = store.getState()

  // return { appHtml, preloadedState }
  return { appHtml }
}
