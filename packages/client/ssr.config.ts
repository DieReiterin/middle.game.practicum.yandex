import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

export default defineConfig({
  // mode: 'production',
  // ssr: {
  //   noExternal: ['@emotion/react', '@emotion/styled', '@emotion/server'],
  // },
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/assets/styles'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'ssr.tsx'),
      name: 'client',
      formats: ['cjs'],
    },
    rollupOptions: {
      // external: ['react', 'react-dom', '@vitejs/plugin-react'],
      output: {
        dir: 'ssr-dist',
        // globals: {
        //   react: 'React',
        //   'react-dom': 'ReactDOM',
        // },
      },
    },
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/vars.scss";\n@import "@/assets/styles/mixins.scss";\n`,
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
})
