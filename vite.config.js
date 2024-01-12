import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5000,
  },
  base: "/SleepCalculator",
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      scope: "/SleepCalculator",
      manifest: {
        name: "Sleep Calculator",
        orientation: "portrait",
        id: "/SleepCalculator",
        start_url: "/SleepCalculator",
        display: "standalone",
        theme_color: '#000',
        background_color: '#000',
        includeAssets: ['splash.png'],
      },
    }),
  ],
});
