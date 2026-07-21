import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  define: {
    "process.env.DRAGGABLE_DEBUG": "false",
  },
  base: "/alliteration",
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // или 'prompt'
      includeAssets: ['src/assets/a.png'],
      manifest: {
        name: 'Alliteration',
        short_name: 'Alliteration',
        description: 'PWA для игры в объяснение слов используя только слова на одну букву',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: './',
        start_url: './',
        icons: [
          {
            src: 'a512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: 'screenshot1.jpg',
            sizes: '591x1280',
            type: 'image/jpg',
            form_factor: 'narrow'
          },
          {
            src: 'screenshot2.jpg',
            sizes: '591x1280',
            type: 'image/jpg',
            form_factor: 'narrow'
          },
          {
            src: 'screenshot3.png',
            sizes: '1980x975',
            type: 'image/png',
            form_factor: 'wide'
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
