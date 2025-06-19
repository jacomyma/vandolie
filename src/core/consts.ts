/**
 * Navigation management:
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

export const SAMPLES = [{ url: "/data/sample-1.csv", title: "Sample 1" }];
