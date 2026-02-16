import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
  integrations: [react()],
  i18n: {
    defaultLocale: "es",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
