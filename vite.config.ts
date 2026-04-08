import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/login',
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  server: {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
    proxy: {
      // Proxy PathWorks app routes (with trailing slash) - excludes pathworks.png
      '^/pathworks/': {
        target: 'http://localhost:5173',
        changeOrigin: true,
      },
      // Proxy all other routes (except login) to Angular on port 4200
      // This includes static assets like /pathworks.png, /HealthLink.png
      '^/(?!login).*': {
        target: 'http://localhost:4200',
        changeOrigin: true,
      },
    },
  },
})
