import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  define: {
  "process.env.DRAGGABLE_DEBUG": "false",
},
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // или 'prompt'
      manifest: {
        name: 'Alliteration',
        short_name: 'Alliteration',
        description: 'PWA дял игры в объясненеи слов используя только слова на одну букву',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'src/assets/hero.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: '/screenshots/screenshot1.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
          },
        ],
      },
      // Опционально: конфигурация Workbox для кастомного кэширования
    }),
  ],
  css: {
    modules: {
      generateScopedName: '[folder]_[local]__[hash:base64:5]',
    },
  },
});
