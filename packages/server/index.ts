import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import serialize from 'serialize-javascript'

dotenv.config()

import express from 'express'
import { readFileSync } from 'fs'
import path from 'path'

import createCache from '@emotion/cache'
import type { EmotionCache } from '@emotion/cache'
import createEmotionServer from '@emotion/server/create-instance'

async function startServer(isDev = process.env.NODE_ENV === 'development') {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('client'))
  const ssrClientPath = require.resolve('client/ssr-dist/client.cjs')

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

  app.get('/fakeUser', (_, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.json({
      id: 100,
      first_name: 'Степа',
      second_name: 'Степанов',
      display_name: 'display_name',
      phone: '88888888888',
      login: 'login',
      email: 'email@test.ru',
      avatar: '',
    })
  })

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

      const { appHtml, initialState } = await render(cache)

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
