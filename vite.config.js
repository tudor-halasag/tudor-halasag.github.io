import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/wip/',
  build: {
    outDir: 'dist',
  },
  optimizeDeps: {
    exclude: ['@shadergradient/react']
  }
})
