import { UndirectedGraph } from "graphology";
import louvain from "graphology-communities-louvain";
import { color, rgb } from "d3-color";
import forceAtlas2 from "graphology-layout-forceatlas2";
import { filter, keyBy, sortBy, uniq } from "lodash";
import stopWordsISO from "stopwords-iso/stopwords-iso.json";

import { DEFAULT_COLOR, DEFAULT_PALETTE } from "./colors.ts";
import type { Dataset } from "./consts.ts";

export type NetworkOptions = {
  includeTitle: boolean;
  multiPerDoc: boolean;
  stopWordsEN: boolean;
  stopWordsDK: boolean;
  removeOrphans: boolean;
  usePmi: boolean;
  threshold: number;
  cooccurrenceThreshold: number;
};

export const DEFAULT_NETWORK_OPTIONS: NetworkOptions = {
  includeTitle: false,
  multiPerDoc: false,
  stopWordsEN: true,
  stopWordsDK: true,
  removeOrphans: true,
  usePmi: true,
  threshold: 3,
  cooccurrenceThreshold: 0,
};

export function calculatePPMI(
  wordACount: number,
  wordBCount: number,
  coOccurrenceCount: number,
  totalDocuments: number,
) {
  // Calculate individual probabilities
  const probA = wordACount / totalDocuments;
  const probB = wordBCount / totalDocuments;

  // Calculate joint probability
  const probAB = coOccurrenceCount / totalDocuments;

  // Calculate PMI
  const pmi = Math.log(probAB / (probA * probB));

  return Math.max(0, pmi);
}

export function makeNetwork(
  dataset: Dataset,
  {
    includeTitle,
    multiPerDoc,
    stopWordsEN,
    stopWordsDK,
    removeOrphans,
    usePmi,
    threshold,
    cooccurrenceThreshold,
  }: NetworkOptions,
  { palette = DEFAULT_PALETTE, paletteDefault = DEFAULT_COLOR }: { palette?: string[]; paletteDefault?: string } = {},
) {
  const documents = includeTitle
    ? dataset.documents.map((d) => d.title + " \n" + d.text)
    : dataset.documents.map((d) => d.text);

  // Step 0: keep track of categories
  const categoriesIndex: Record<string, number> = {};
  dataset.documents.forEach((document) => {
    categoriesIndex[document.category] = (categoriesIndex[document.category] || 0) + 1;
  });
  const categories = keyBy(
    sortBy(Object.entries(categoriesIndex), [(d) => -d[1]], 0).map(([id, count], i) => ({
      id,
      count,
      color: palette[i] || paletteDefault,
    })),
    "id",
  );
  
  // Step 1: Tokenize and create vocabulary
  const vocabulary = new Set<string>();
  const tokenizedDocs = documents.map((doc) => {
    // Tokenize: convert to lowercase, remove punctuation, split by whitespace
    const tokens = doc
      .toLowerCase()
      .replace(/[^\p{L}\s-]/gu, "")
      .split(/\s+/);
    // Add to vocabulary
    tokens.forEach((token) => vocabulary.add(token));
    return tokens;
  });

  // Step 2: Convert vocabulary Set to an Array for indexing
  const vocabularyArray = Array.from(vocabulary);

  // Step 3: Create bag of words representation for each document
  const bagOfWords = tokenizedDocs.map((rawTokens) => {
    // Initialize counts for this document
    const counts: number[] = new Array(vocabularyArray.length).fill(0);

    const tokens = multiPerDoc ? rawTokens : uniq(rawTokens);

    // Count occurrences of each token
    tokens.forEach((token) => {
      const index = vocabularyArray.indexOf(token);
      counts[index]++;
    });

    return counts;
  });

  // Step 4: Count total occurrences per word
  const vocabularyCounts = vocabularyArray.map((token, index) => {
    // Init categories mix
    let mix = Object.fromEntries(
        Object.keys(categories).map(key => [key, 0])
    );
    return { index, token, count: 0, mix:mix };
  });
  bagOfWords.forEach((counts, idoc) => {
    const cat = dataset.documents[idoc].category
    counts.forEach((count, i) => {
      const vc = vocabularyCounts[i];
      vc.count += count;
      if (count>0) {
        vc.mix[cat]++;
      }
    });
  });

  // Step 5: Remove words per threshold
  const vocabularyData = sortBy(sortBy(vocabularyCounts, [(o) => -o.count, "token"]).map((o) => ({
    ...o,
    keep: o.count > threshold,
  })), "index")

  // Step 6: Remove stop words
  let stopWords: string[] = [];
  if (stopWordsEN) stopWords = stopWords.concat(stopWordsISO.en); // Add English stop words
  if (stopWordsDK) stopWords = stopWords.concat(stopWordsISO.da); // Add Danish stop words
  stopWords = stopWords.map((token) => token.replace(/[^\p{L}\s-]/gu, "")).filter((d) => d.length > 0); // Remove punctuation
  stopWords.sort();
  let glitchStopWords: string[] = ["", " ", "-"];
  vocabularyData.forEach((d) => {
    d.keep = d.keep && stopWords.indexOf(d.token) < 0 && glitchStopWords.indexOf(d.token) < 0;
  });
  const filteredVocabularyData = vocabularyData.filter((d) => d.keep);

  // Step 7: Count co-occurrences
  const allCooccurrences: Record<string, number> = {};
  bagOfWords.forEach((counts) => {

    for (let i in counts) {
      if (vocabularyData[i].keep && counts[i] > 0) {
        for (let j in counts) {
          if (i < j && vocabularyData[j].keep && counts[j] > 0) {
            const pair = vocabularyData[i].token + "|" + vocabularyData[j].token;
            if (multiPerDoc) {
              allCooccurrences[pair] = (allCooccurrences[pair] || 0) + Math.min(counts[i], counts[j]);
            } else {
              allCooccurrences[pair] = (allCooccurrences[pair] || 0) + 1;
            }
          }
        }
      }
    }
  });

  // Step 8: Remove co-occurrences under threshold
  const keysToRemove = filter(allCooccurrences, (v) => v <= cooccurrenceThreshold);
  keysToRemove.forEach((k) => {
    delete allCooccurrences[k];
  });
  const cooccurrences = sortBy(Object.entries(allCooccurrences), [(a) => -a[1], 0]);

  // Step 9: Create the network
  const graph = new UndirectedGraph();
  filteredVocabularyData.forEach((d) => {

    // Determine rgb blend from categories mix
    const colorCats = Object.keys(d.mix).map((cat) => { return {color: color(categories[cat].color), count: d.mix[cat]} });
    const total = colorCats.map((d) => d.count).reduce((acc, num) => acc + num, 0);
    const rgb_ = ['r', 'g', 'b'].map((channel) => {
      return colorCats.map((d) => { return Math.floor(d.color[channel] * d.count / total) }).reduce((acc, num) => acc + num, 0);
    })
    const col = rgb(rgb_[0], rgb_[1], rgb_[2]).hex()

    graph.addNode(d.token, {
      label: d.token,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      size: 0.3 + 1.3 * Math.log(1 + 3 * d.count),
      color: col,
    });
  });

  const vocabularyIndex = keyBy(filteredVocabularyData, "token");
  cooccurrences.forEach((d) => {
    let [nid1, nid2] = d[0].split("|");
    const weight = usePmi
      ? calculatePPMI(vocabularyIndex[nid1].count, vocabularyIndex[nid2].count, d[1], documents.length)
      : d[1];

    if (weight > 0) graph.addEdge(nid1, nid2, { weight: weight, color: "#FFF" });
  });

  if (removeOrphans) {
    // Remove orphans
    graph.nodes().forEach((nid) => {
      if (graph.degree(nid) <= 0) {
        graph.dropNode(nid);
      }
    });
  }

  // // Step 10: Compute Louvain
  // const nodesModularityClasses = louvain(graph);
  // const communitiesSizes: Record<string, number> = {};
  // Object.entries(nodesModularityClasses).forEach(([_node, modularityClass]) => {
  //   communitiesSizes[modularityClass] = (communitiesSizes[modularityClass] || 0) + 1;
  // });

  // const communities = sortBy(Object.entries(communitiesSizes), [(a) => -a[1]]).map((entry, i) => {
  //   return { id: entry[0], count: entry[1], color: palette[i] || paletteDefault };
  // });
  // const communitiesIndex = keyBy(communities, "id");
  // graph.nodes().forEach((nid) => {
  //   graph.setNodeAttribute(nid, "color", communitiesIndex[nodesModularityClasses[nid]].color);
  // });

  // Step 11: Compute Layout
  const fa2Settings = forceAtlas2.inferSettings(graph);
  fa2Settings.strongGravityMode = true;
  fa2Settings.gravity = 0.1;
  fa2Settings.edgeWeightInfluence = 0.3;
  fa2Settings.slowDown = 1;
  forceAtlas2.assign(graph, {
    iterations: 100,
    settings: fa2Settings,
  });
  fa2Settings.linLogMode = true;
  fa2Settings.scalingRatio = (fa2Settings.scalingRatio ?? 1) / 20;
  fa2Settings.gravity = 0.0001;
  fa2Settings.slowDown = 1;
  forceAtlas2.assign(graph, {
    iterations: 200,
    settings: fa2Settings,
  });
  fa2Settings.slowDown = 10;
  fa2Settings.adjustSizes = true;
  forceAtlas2.assign(graph, {
    iterations: 50,
    settings: fa2Settings,
  });

  return { graph, cooccurrences, vocabularyData, filteredVocabularyData, vocabulary, stopWords };
}
