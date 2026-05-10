import path from 'path'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5000,
  },
  build: {
    outDir: path.resolve(__dirname, 'docs/'),
  },
  base: "/SleepCalculator",
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      scope: "/SleepCalculator/",
      includeAssets: ['splash.png', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: "Sleep Calculator",
        short_name: "Sleep Calc",
        orientation: "portrait",
        id: "/SleepCalculator",
        start_url: "/SleepCalculator/",
        display: "fullscreen",
        display_override: ["fullscreen", "standalone"],
        theme_color: '#000',
        background_color: '#000',
        icons: [
          {
            src: "/SleepCalculator/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/SleepCalculator/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
      }
    }),
  ],
});
