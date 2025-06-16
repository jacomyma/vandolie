import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://jacomyma.github.io/vandolie",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "da"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [react(), mdx()],
});
