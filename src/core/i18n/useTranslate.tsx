import type { FC, ReactNode } from "react";

import type { LanguageCode, Translation, TranslationObject, Translations } from "../consts.ts";
import { useTranslatedPath } from "./index.ts";
import commonTranslations from "./translations.ts";

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

export const useTranslate = (lang: LanguageCode, translations?: Translations) => {
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
  const translatePath = useTranslatedPath(lang);

  return {
    T: Translate,
    t: (k: string, params?: Record<string, unknown>) => translate(translationsWithCommons, lang, k, params) as string,
    to: (object: TranslationObject, params?: Record<string, unknown>) =>
      translateObject(object, lang, params) as string,
    TO,
    translatePath,
  };
};
