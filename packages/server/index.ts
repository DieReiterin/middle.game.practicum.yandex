import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import serialize from 'serialize-javascript'
import { createProxyMiddleware } from 'http-proxy-middleware'

dotenv.config()

import express, { Request as ExpressRequest } from 'express'
import { readFileSync } from 'fs'
import path from 'path'
import cookieParser from 'cookie-parser'

dotenv.config()

import createCache from '@emotion/cache'
import type { EmotionCache } from '@emotion/cache'
import createEmotionServer from '@emotion/server/create-instance'

import themeRouter from './src/routes/themeRoutes'
import forumRouter from './src/routes/forumRoutes'
import emojisRouter from './src/routes/emojisRoutes'

export const apiHost = 'https://ya-praktikum.tech'
export const apiPrefix = '/api/v2'

async function startServer(isDev = process.env.NODE_ENV === 'development') {
  const app = express()
  app.use(cors(), cookieParser())

  const port = Number(process.env.SERVER_PORT) || 3000

  let srcPath = ''
  const distPath = path.resolve(__dirname, 'client', 'dist')
  if (isDev) {
    srcPath = path.resolve(__dirname, '..', 'client')
  }
  const ssrClientPath = path.resolve(
    __dirname,
    'client',
    'ssr-dist',
    'client.cjs',
  )

  let vite: ViteDevServer | undefined

  if (!isDev) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  } else {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })
    app.use(vite.middlewares)
  }

  app.use(
    apiPrefix,
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      target: `${apiHost}${apiPrefix}`,
    }),
  )

  app.use(express.json())
  app.use('/api/themes', themeRouter)
  app.use('/api/forum', forumRouter)
  app.use('/api/emojis', emojisRouter)

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string
      if (!isDev) {
        template = readFileSync(path.resolve(distPath, 'index.html'), 'utf-8')
      } else {
        template = readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')
        template = await vite!.transformIndexHtml(url, template)
      }

      let render: (
        renderCache: EmotionCache,
        req: ExpressRequest,
      ) => Promise<{ appHtml: string; initialState: unknown }>

      if (!isDev) {
        render = (await import(ssrClientPath)).render
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render
      }

      const cache: EmotionCache = createCache({
        key: 'mui-style',
        insertionPoint: undefined,
      })
      const { extractCriticalToChunks, constructStyleTagsFromChunks } =
        createEmotionServer(cache)

      const { appHtml, initialState } = await render(cache, req)

      const emotionChunks = extractCriticalToChunks(appHtml)
      const emotionCss = constructStyleTagsFromChunks(emotionChunks)

      const html = template
        .replace('<!-- ssr-outlet -->', appHtml)
        .replace('<!-- css-outlet -->', emotionCss)
        .replace(
          `<!--ssr-initial-state-->`,
          `<script>window.APP_INITIAL_STATE = ${serialize(initialState, {
            isJSON: true,
          })}</script>`,
        )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
