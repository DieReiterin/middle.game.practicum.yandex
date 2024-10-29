import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import './index.css'
// import { Provider } from 'react-redux'
// import { mockStore } from './ducks/mockStore'

// import createEmotionCache from '../createEmotionCache'
// import { CacheProvider } from '@emotion/react'
// import { CssBaseline, ThemeProvider } from '@mui/material'
// import { theme } from './assets/theme'

// import { store } from './ducks/store'
// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <Provider store={store}>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </Provider>
// )
// const cache = createEmotionCache()

function Main() {
  return (
    // <React.StrictMode>
    <h1>MAIN-TSX</h1>
    // <App />
    // </React.StrictMode>

    //   <CacheProvider value={cache}>
    //   <ThemeProvider theme={theme}>
    //     <CssBaseline />
    //     {/* <Provider store={mockStore}> */}
    //     <React.StrictMode>
    //       <App />
    //     </React.StrictMode>
    //     {/* </Provider> */}
    //   </ThemeProvider>
    // </CacheProvider>
  )
}

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, <Main />)
