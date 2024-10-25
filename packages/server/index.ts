import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import { readFileSync } from 'fs'
import path = require('path')

async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server')
  })

  app.use('*', async (_, res, next) => {
    const distPath = path.dirname(require.resolve('client/dist/index.html'))
    const ssrClientPath = require.resolve('client/ssr-dist/client.cjs')

    try {
      const template = readFileSync(
        path.resolve(distPath, 'index.html'),
        'utf-8'
      )

      const { render } = await import(ssrClientPath)

      const { appHtml } = await render()
      // const { appHtml, preloadedState } = await render(req.originalUrl)

      const html = template.replace('<!-- ssr-outlet -->', appHtml)
      // .replace(
      //   '<!-- preloaded-state -->',
      //   `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
      //     preloadedState
      //   ).replace(/</g, '\\u003c')}</script>`
      // )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
