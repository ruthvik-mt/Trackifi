import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 🔹 Frontend served at http://localhost:3000
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 🔸 Your Spring Boot backend
        changeOrigin: true,
        secure: false
      }
    }
  }
});
