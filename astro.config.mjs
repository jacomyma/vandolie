import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales: ["en", "da"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [react(), mdx()],

  // This piece here is quite important for deploying the application:
  site: "https://jacomyma.github.io/vandolie",
  base: "/vandolie/",
  // This "base" management seems honestly quite bad...
  // Anyway, future code traveller, please think of updating these redirection
  // targets when you update the website base:
  redirects: {
    "/": "/vandolie/da",
    // We have to declare a redirection rule for each language, because of that
    // bug: https://github.com/withastro/astro/issues/12036
    "/en/app": "/vandolie/en/app/data",
    "/da/app": "/vandolie/da/app/data",
  },
});
