import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

dotenv.config()

export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
  },
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/assets/styles'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "@/assets/styles/vars.scss" as *;\n@use "@/assets/styles/mixins.scss" as *;\n`,
        silenceDeprecations: ['legacy-js-api'],
        quietDeps: true,
      },
    },
  },
  plugins: [
    react(),
    // VitePWA({
    //   injectRegister: 'auto',
    //   workbox: {
    //     globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
    //     runtimeCaching: [
    //       {
    //         urlPattern: /^https:\/\/ya-praktikum\.tech\/api\/v2\/.*/,
    //         handler: 'NetworkFirst',
    //         method: 'GET',
    //         options: {
    //           cacheName: 'ya-praktikum-api-cache',
    //           expiration: {
    //             maxAgeSeconds: 3600, // cache for 1 hour
    //           },
    //         },
    //       },
    //     ],
    //   },
    //   devOptions: {
    //     enabled:
    //       !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
    //     type: 'module',
    //   },
    // }),
  ],
})
