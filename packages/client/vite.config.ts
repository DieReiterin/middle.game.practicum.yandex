import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()
// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: Number(process.env.CLIENT_PORT) || 3000,
    },
    define: {
        __SERVER_PORT__: process.env.SERVER_PORT,
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
                additionalData: `@import "@/assets/styles/vars.scss";\n@import "@/assets/styles/mixins.scss";\n`,
            },
        },
    },
    plugins: [react()],
})
