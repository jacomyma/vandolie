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
  redirects: {
    "/": "/da",
    // We have to declare a redirection rule for each language, because of that
    // bug: https://github.com/withastro/astro/issues/12036
    "/en/app": "/en/app/data",
    "/da/app": "/da/app/data",
  },
});
