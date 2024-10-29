import React from 'react'
import App from './src/App'
import { renderToString } from 'react-dom/server'
// import { renderToString } from 'react-dom/server.browser'
import { Provider } from 'react-redux'
import { mockStore } from './src/ducks/mockStore'

// import { CacheProvider } from '@emotion/react'
import createEmotionCache from './createEmotionCache'
import createEmotionServer from '@emotion/server/create-instance'

export function render() {
  // const cache = createEmotionCache()

  // const { extractCriticalToChunks, constructStyleTagsFromChunks } =
  //   createEmotionServer(cache)

  const appHtml = renderToString(
    // <CacheProvider value={cache}>
    <Provider store={mockStore}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
    // </CacheProvider>
  )

  // const emotionChunks = extractCriticalToChunks(appHtml)
  // const emotionCss = constructStyleTagsFromChunks(emotionChunks)
  // console.log('emotionCss', emotionCss)

  // return { appHtml, emotionCss }
  return { appHtml, emotionCss: '<!-- REPLACED -->' }
}
