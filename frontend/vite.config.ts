import path from 'path'
import dns from 'dns'
import { defineConfig } from 'vite'
dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
