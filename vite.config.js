import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/SafetizenDemoSite/', // GitHub Pages base path
  server: {
    host: true,      // 👈 expose to LAN
    port: 5173,
    strictPort: true
  }
})
