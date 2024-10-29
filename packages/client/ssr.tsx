import React from 'react'
// import App from './src/App'
import { renderToString } from 'react-dom/server'
// import { renderToString } from 'react-dom/server.browser'
// import { Provider } from 'react-redux'
// import { mockStore } from './src/ducks/mockStore'

// import createEmotionCache from './createEmotionCache'
// import createEmotionServer from '@emotion/server/create-instance'
// import { CacheProvider } from '@emotion/react'
// import { theme } from './src/assets/theme'
// import { CssBaseline, ThemeProvider } from '@mui/material'

export function render() {
  // const cache = createEmotionCache()
  // const { extractCriticalToChunks, constructStyleTagsFromChunks } =
  //   createEmotionServer(cache)

  const appHtml = renderToString(
    // <React.StrictMode>
    // <App />
    <h1>SSR-TSX</h1>,
    // </React.StrictMode>

    // <CacheProvider value={cache}>
    //   {/* <ThemeProvider theme={theme}> */}
    //   {/* <CssBaseline /> */}
    //   {/* <Provider store={mockStore}> */}
    //   {/* <React.StrictMode> */}
    //   {/* <App /> */}
    //   <h1>SSR-TSX</h1>
    //   {/* </React.StrictMode> */}
    //   {/* </Provider> */}
    //   {/* </ThemeProvider> */}
    // </CacheProvider>
  )

  // const emotionChunks = extractCriticalToChunks(appHtml)
  // const emotionCss = constructStyleTagsFromChunks(emotionChunks)
  // console.log('emotionCss', emotionCss)

  // return { appHtml, emotionCss }
  return { appHtml, emotionCss: '' }
}
