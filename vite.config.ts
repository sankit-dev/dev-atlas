import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react'
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion'
            }
            if (id.includes('shiki') || id.includes('@shikijs')) {
              return 'vendor-shiki'
            }
            if (id.includes('@vercel') || id.includes('better-auth')) {
              return 'vendor-auth'
            }
          }
          if (id.includes('/data/dsaCourse')) {
            return 'content-dsa'
          }
        },
      },
    },
  },
})

