import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './src/assets/theme'
import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './src/ducks/store'
import { fetchFakeUser } from './src/ducks/user'
import { Request as ExpressRequest } from 'express'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { routes } from './src/router'
import { createFetchRequest } from './src/utils'

export async function render(cache: EmotionCache, req: ExpressRequest) {
  const store = configureStore({
    reducer,
  })

  await store.dispatch(fetchFakeUser())

  const { query, dataRoutes } = createStaticHandler(routes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(dataRoutes, context)

  const appHtml = renderToString(
    <React.StrictMode>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <StaticRouterProvider router={router} context={context} />
          </Provider>
        </ThemeProvider>
      </CacheProvider>
    </React.StrictMode>,
  )

  return {
    appHtml,
    initialState: store.getState(),
  }
}
