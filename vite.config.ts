import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // The MapLibre chunk (~1 MB) is lazy-loaded only on pages with a map.
    chunkSizeWarningLimit: 1200,
  },
})
