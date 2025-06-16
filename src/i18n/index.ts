import { format } from "date-fns";

import astroConfig from "../../astro.config.mjs";
import { type LanguageCode, dateFormats, locales } from "../core/consts.ts";

const i18n = {
  defaultLocale: "en",
  locales: ["en", "da"],
  routing: {
    prefixDefaultLocale: false,
  },
};
export default i18n;

function getLangFromPath(path: string) {
  const [, lang] = path.split("/");
  if (i18n.locales.includes(lang)) return lang as LanguageCode;
  return i18n.defaultLocale as LanguageCode;
}

export function getLangFromURL(url: URL) {
  return getLangFromPath(url.pathname);
}

export function useTranslatedPath(lang: LanguageCode) {
  return function translatePath(path: string, l: string = lang) {
    const pathLang = getLangFromPath(path);
    const pathWithoutLang = path.replace(new RegExp(`^\/${pathLang}\/`), "/");
    const prefixDefaultLocale =
      typeof astroConfig.i18n?.routing === "object" && astroConfig.i18n.routing.prefixDefaultLocale;
    return !prefixDefaultLocale && l === astroConfig.i18n?.defaultLocale ? pathWithoutLang : `/${l}${pathWithoutLang}`;
  };
}

export function formatDate(date: Date, lang: LanguageCode): string {
  return format(date, dateFormats[lang], { locale: locales[lang] });
}
