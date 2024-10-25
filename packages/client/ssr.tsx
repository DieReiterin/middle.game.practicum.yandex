import React from 'react'
import App from './src/App'
import { renderToString } from 'react-dom/server'
// import { Provider } from 'react-redux'
// import { StaticRouter } from 'react-router-dom/server'
// import { createStore } from './src/ducks/store'

export function render() {
  // export function render(url: string) {
  // const store = createStore()

  const appHtml = renderToString(
    // <StaticRouter location={url}>
    // <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    // </Provider>
    // </StaticRouter>
  )

  // const preloadedState = store.getState()

  // return { appHtml, preloadedState }
  return { appHtml }
}
