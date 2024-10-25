import React from 'react'
import ReactDOM from 'react-dom/client'
// import { Provider } from 'react-redux'
import App from './App'
import './index.css'

// import { store } from './ducks/store'
// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <Provider store={store}>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </Provider>
// )

// import { createStore } from './ducks/store'
// const preloadedState = (window as any).__PRELOADED_STATE__
// const store = createStore(preloadedState)

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  // <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  // </Provider>
)
