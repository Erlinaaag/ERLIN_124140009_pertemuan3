import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Konfigurasi Vite + Vitest (environment jsdom untuk menguji komponen React)
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
})
