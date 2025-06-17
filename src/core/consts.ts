import { type Locale, da, enUS } from "date-fns/locale";
import type { FC, ReactNode } from "react";

/**
 * Navigation management:
 */

export const APPLICATION_PAGES = ["data", "count", "network", "semantic"] as const;
export type ApplicationPage = (typeof APPLICATION_PAGES)[number];

/**
 * Internationalization management:
 */

export const LANGUAGE_CODES = ["en", "da"] as const;
export type LanguageCode = (typeof LANGUAGE_CODES)[number];

export type Translation = string | ReactNode | FC<Record<string, unknown>>;
export type Translations = Record<LanguageCode, Record<string, Translation>>;
export type TranslationObject = Record<LanguageCode, Translation>;

export const locales: Record<LanguageCode, Locale> = {
  da: da,
  en: enUS,
};

export const dateFormats = {
  en: "LLLL	d, yyyy",
  da: "d LLLL yyyy",
};

export const langToLocale: Record<LanguageCode, string> = {
  en: "en_US",
  da: "da_DK",
};

export const localeToLang: { [key: string]: string } = {
  en_US: "en",
  da_DK: "da",
};

/**
 * Data management
 */

export type Document = {
  title: string;
  text: string;
  category: string;
};

export type Dataset = {
  documents: Document[];
};

export const SAMPLES = [{ url: "/data/sample-1.csv", title: "Sample 1" }];
