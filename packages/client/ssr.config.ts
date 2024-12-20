import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

export default defineConfig({
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
      output: {
        dir: 'ssr-dist',
      },
    },
  },
  plugins: [react()],
  optimizeDeps: {
    include: ['@mui/icons-material'],
  },
  ssr: {
    noExternal: '@mui/icons-material',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/vars.scss" as *;\n@use "@/assets/styles/mixins.scss" as *;\n`,
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
})
