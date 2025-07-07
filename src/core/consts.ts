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
  { url: `${import.meta.env.BASE_URL}data/Folkedrab.csv`, title: "🇩🇰 Avisartikler om folkedrab" },
  { url: `${import.meta.env.BASE_URL}data/Male and female pop artists on Wikipedia.csv`, title: "🇬🇧 Wikipedia - Male and female pop artists" },
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
