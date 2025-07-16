import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // frontend runs on http://localhost:3000
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // backend
        changeOrigin: true,
        secure: false
      }
    }
  }
})
