import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa'
import path from 'path'


const manifest: Partial<ManifestOptions> = {
  name: 'Quick Chat',
  short_name: 'Quick Chat',
  description: 'Direct Chat to any Whatsapp Number',
  theme_color: '#ffffff',
  start_url: '/',
  display: 'standalone',
  scope: '/',

  icons: [
    {
      src: '/pwa-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/pwa-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePWA({
    workbox: {
      globPatterns: ["**/*"],
    },
    // add this to cache all the
    // static assets in the public folder
    includeAssets: [
      "**/*.{js,css,html,ico,png,svg}",
    ],
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true
    },
    manifest: manifest

  })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
