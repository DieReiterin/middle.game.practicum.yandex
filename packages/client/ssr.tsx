import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './src/assets/theme'
import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './src/ducks/store'
import { Request as ExpressRequest } from 'express'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { routes } from './src/router'
import { cookiesToString, createFetchRequest, createUrl } from './src/utils'
import { matchRoutes } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { UserResponse } from './src/ducks/user'

export async function render(cache: EmotionCache, req: ExpressRequest) {
  const store = configureStore({
    reducer,
  })
  const url = createUrl(req)
  const foundRoutes = matchRoutes(routes, url)

  if (!foundRoutes) {
    throw new Error('Страница не найдена!')
  }

  const [
    {
      route: { fetchData },
    },
  ] = foundRoutes

  try {
    await fetchData({
      dispatch: store.dispatch,
      state: store.getState(),
      cookies: cookiesToString(req.cookies),
    })
  } catch (e) {
    console.log('Инициализация страницы произошла с ошибкой', e)
  }

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
