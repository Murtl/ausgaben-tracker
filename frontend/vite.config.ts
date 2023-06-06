import { fileURLToPath, URL } from 'node:url'
import { createHtmlPlugin } from 'vite-plugin-html'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ausgaben-tracker/',
  build: {
    minify: 'terser',
    terserOptions: { output: { comments: false } }
  },
  plugins: [vue(), 
    createHtmlPlugin({ minify: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
