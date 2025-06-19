import type { FC, ReactNode } from "react";

import { useAppContext } from "./context.ts";
import DA from "./translations/da.tsx";
import EN from "./translations/en.tsx";

const commonTranslations: Translations = {
  en: EN,
  da: DA,
};

/**
 * Useful types:
 */

export const LANGUAGE_CODES = ["en", "da"] as const;
export type LanguageCode = (typeof LANGUAGE_CODES)[number];

export type Translation = string | ReactNode | FC<Record<string, unknown>>;
export type Translations = Record<LanguageCode, Record<string, Translation>>;
export type TranslationObject = Record<LanguageCode, Translation>;

/**
 * Useful indices (useful to generate proper HTML meta-tags, or call JS
 * functions, such as Number#toLocaleString):
 */

export const langToLocale: Record<LanguageCode, string> = {
  en: "en_US",
  da: "da_DK",
};

export const langToJSLocale: Record<LanguageCode, string> = {
  en: "en-US",
  da: "da-DK",
};

/**
 * Actual translation helpers:
 */

export function renderTranslation(Value: Translation, params?: Record<string, unknown>): ReactNode | string {
  return typeof Value === "function" ? <Value {...(params || {})} /> : Value;
}

export function translate(
  translations: Translations,
  lang: LanguageCode,
  key: string,
  params?: Record<string, unknown>,
): ReactNode | string {
  return renderTranslation((translations[lang] || {})[key] || key, params);
}

export function translateObject(
  translation: TranslationObject,
  lang: LanguageCode,
  params?: Record<string, unknown>,
): ReactNode | string {
  return renderTranslation(translation[lang] || "", params);
}

/**
 * This function returns various translation helpers.
 * This can be used both from server-side Astro files, and client-side React component.
 */
export const getTranslationsHelpers = (lang: LanguageCode, translations?: Translations) => {
  const translationsWithCommons = {
    en: { ...commonTranslations.en, ...(translations || {}).en },
    da: { ...commonTranslations.da, ...(translations || {}).da },
  };
  const Translate: FC<{ k: string; params?: Record<string, unknown> }> = ({ k, params }) => {
    return translate(translationsWithCommons, lang, k, params);
  };
  const TO: FC<{ o: TranslationObject; params?: Record<string, unknown> }> = ({ o, params }) => {
    return <>{translateObject(o, lang, params)}</>;
  };

  return {
    T: Translate,
    t: (k: string | number, params?: Record<string, unknown>) =>
      typeof k === "number"
        ? k.toLocaleString(langToJSLocale[lang])
        : (translate(translationsWithCommons, lang, k, params) as string),
    to: (object: TranslationObject, params?: Record<string, unknown>) =>
      translateObject(object, lang, params) as string,
    TO,
  };
};

/**
 * This hook makes it easier to get translations helpers from a client-side React components context.
 */
export const useTranslate = () => {
  const { lang } = useAppContext();

  return getTranslationsHelpers(lang);
};
