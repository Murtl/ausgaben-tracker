import { fileURLToPath, URL } from 'node:url'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { createHtmlPlugin } from 'vite-plugin-html'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  build: {
    minify: 'terser',
    terserOptions: { output: { comments: false } }
  },
  plugins: [vue(), vueJsx(), cssInjectedByJsPlugin(), createHtmlPlugin({ minify: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
