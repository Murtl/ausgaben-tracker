import { fileURLToPath, URL } from 'node:url'
import { ViteMinifyPlugin } from 'vite-plugin-minify'

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
    ViteMinifyPlugin({})],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
