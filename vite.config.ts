import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "The testing app for PWA",
        short_name: "PWA_Testing",
        description: "To test whether Web PWA can get beacon signals",
        // for deploy to gh-pages
        start_url: "/VueRouter/",
        theme_color: "#ffffff",
        icons: [
          { src: "/VueRouter/icons/pwa_192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/VueRouter/icons/pwa_512x512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],
  base: "/VueRouter/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
