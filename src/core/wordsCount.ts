import { sortBy, toPairs } from "lodash";
import stopWordsISO from "stopwords-iso/stopwords-iso.json";

import type { Dataset } from "./consts.ts";

export function extractPassage(text: string, query: string, exactWordsOnly: boolean, contextLength = 75) {
  const pattern = exactWordsOnly
    ? new RegExp(
        `(.{0,${contextLength}})\\b(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\b(.{0,${contextLength}})`,
        "i",
      )
    : new RegExp(
        `(.{0,${contextLength}})(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})(.{0,${contextLength}})`,
        "i",
      );

  const match = text.match(pattern);

  if (match) {
    return {
      passage: match[1] + match[2] + match[3],
      before: match[1],
      matched: match[2],
      after: match[3],
      index: match.index! + match[1].length,
    };
  }

  return null;
}

export function computeTopWords(dataset: Dataset, exactWordsOnly: boolean) {
  const texts = dataset.documents.map((d) => d.text);

  // Tokenize and create vocabulary
  const vocabulary = new Set<string>();
  const tokenizedDocs = texts.map((doc) => {
    // Tokenize: convert to lowercase, remove punctuation, split by whitespace
    const tokens = doc
      .toLowerCase()
      .replace(/[^\p{L}\s]/gu, "")
      .split(/\s+/);

    // Add to vocabulary
    tokens.forEach((token) => vocabulary.add(token));
    return tokens;
  });

  // Remove stop words
  let stopWords: string[] = [];
  stopWords = stopWords.concat(stopWordsISO.en); // Add English stop words
  stopWords = stopWords.concat(stopWordsISO.da); // Add Danish stop words
  stopWords = stopWords.map((token) => token.replace(/[^\p{L}\s]/gu, "")).filter((d) => d.length > 0); // Remove punctuation

  // Truncation
  const top = 25;

  // Count (efficient)
  let topWords = Array.from(vocabulary)
    .filter((w) => stopWords.indexOf(w) < 0)
    .map((w) => {
      const c = tokenizedDocs.filter((tokens) => {
        return tokens.indexOf(w) >= 0;
      }).length;
      return { word: w, count: c };
    });
  topWords.sort((a, b) => b.count - a.count);

  // Pre-truncate
  topWords = topWords.slice(0, 1.5 * top);

  /**
   * Why do we pre-truncate?
   * And why do we recompute the scores?
   *
   * We cannot compute the search on every word extracted, because it is too
   * costly and there are too many. So we count in an efficient way, based on
   * a bag-of-words model.
   *
   * This creates a discrepancy if we display that score, and it does not
   * match the count displayed in the bar chart and details. So we recount properly
   * on the truncated set.
   *
   * Now, in some cases the recount changes which words are on top. To mitigate that,
   * we pre-truncate with a bit more than we need, before recounting and re-truncating.
   */

  // Recount (quality)
  topWords.forEach((d) => {
    d.count = texts.filter((doc) => extractPassage(doc.toLowerCase(), d.word, exactWordsOnly) != null).length;
  });
  topWords.sort((a, b) => b.count - a.count);

  // Truncate
  topWords = topWords.slice(0, top);

  return topWords;
}

export function countCategories(
  { documents }: Dataset,
  query: string | undefined,
  exactWordsOnly: boolean,
  {
    palette = ["#777acd", "#cab21f", "#5ba965", "#ca5e4a", "#c55a9f"],
    paletteDefault = "#919191",
  }: { palette?: string[]; paletteDefault?: string } = {},
) {
  // Compute categories
  const categoriesCounts: Record<string, number> = {};
  documents.forEach(({ category }) => {
    categoriesCounts[category] = (categoriesCounts[category] || 0) + 1;
  });
  const categories = sortBy(toPairs(categoriesCounts), 1).map((entry, i) => {
    return { id: entry[0], count: entry[1], matches: 0, color: i < palette.length ? palette[i] : paletteDefault };
  });

  if (query) {
    // Note: in order of the categories, from the most to the least represented
    categories.forEach((cat) => {
      documents
        .filter(({ category }) => category == cat.id)
        .forEach(({ text }) => {
          if (extractPassage(text.toLowerCase(), query, exactWordsOnly)) cat.matches++;
        });
    });
  }

  return categories;
}
