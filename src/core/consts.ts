import { version } from "../../package.json";

/**
 * Navigation management
 */

export const APPLICATION_PAGES = ["data", "count", "network", "semantic"] as const;
export type ApplicationPage = (typeof APPLICATION_PAGES)[number];

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

export function getEmptyDataset(): Dataset {
  return {
    documents: [],
  };
}

export const SAMPLES = [
  { url: `${import.meta.env.BASE_URL}data/Fishing and Trains.csv`, title: "🇬🇧 BBC - Fishing & trains" },
  { url: `${import.meta.env.BASE_URL}data/Male and female pop artists on Wikipedia.csv`, title: "🇬🇧 Wikipedia - Male and female pop artists" },
  { url: `${import.meta.env.BASE_URL}data/Bingo of words - Meat and animal welfare.csv`, title: "🇬🇧 Bingo of words - Meat and animal welfare" },
  { url: `${import.meta.env.BASE_URL}data/Veganisme.csv`, title: "🇩🇰 Avisartikler om veganisme" },
  { url: `${import.meta.env.BASE_URL}data/Folkedrab.csv`, title: "🇩🇰 Avisartikler om folkedrab" },
  { url: `${import.meta.env.BASE_URL}data/Mænd og kvinder popartister på Wikipedia.csv`, title: "🇩🇰 Wikipedia - Mænd og kvinder popartister" },
  { url: `${import.meta.env.BASE_URL}data/Ord-bingo - Kød og dyrevelfærd.csv`, title: "🇩🇰 Ord-bingo - Kød og dyrevelfærd" },
];

/**
 * Local storage management
 */
const STORAGE_KEYS_PREFIX = `vandolie-${version}-`;
export const STORAGE_KEYS = {
  dataset: `${STORAGE_KEYS_PREFIX}dataset`,
  wordsCount: `${STORAGE_KEYS_PREFIX}wordsCount`,
  networkOptions: `${STORAGE_KEYS_PREFIX}networkOptions`,
  embedding: `${STORAGE_KEYS_PREFIX}embedding`,
  umap: `${STORAGE_KEYS_PREFIX}umap`,
} as const;

export const KEYS_TO_FLUSH_ON_UPDATE_DATASET = [STORAGE_KEYS.wordsCount, STORAGE_KEYS.embedding, STORAGE_KEYS.umap];
