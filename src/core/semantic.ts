import { getAsyncMemoData, useAsyncMemo, useStorage } from "@ouestware/hooks";
import { FeatureExtractionPipeline, pipeline } from "@xenova/transformers";
import Graph from "graphology";
import { keyBy, sortBy } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Coordinates } from "sigma/types";
import { UMAP } from "umap-js";

import { type Dataset, type Document, STORAGE_KEYS } from "./consts.ts";

type EmbeddedDocument = {
  document: Document;
  features: number[];
};
type ProjectedDocument = EmbeddedDocument & {
  coordinates: Coordinates;
};
export type DocumentNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
  color: string;
  document: Document;
};
export type DocumentsGraph = Graph<DocumentNode>;

export function useExtractor() {
  const state = useAsyncMemo(() => pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", { quantized: false }), []);

  return getAsyncMemoData(state);
}

export function useEmbedding(dataset: Dataset, extractor?: FeatureExtractionPipeline) {
  const [state, setState] = useStorage("localStorage", STORAGE_KEYS.embedding, {
    defaultValue: { documentsToProcess: dataset.documents, embeddedDocuments: [] } as {
      documentsToProcess: Document[];
      embeddedDocuments: { document: Document; features: number[] }[];
    },
  });

  const embedFirstDocument = useCallback(() => {
    if (!extractor) return;

    setState((prevState) => {
      if (prevState.documentsToProcess.length === 0) return prevState;

      const [firstDoc, ...remainingDocs] = prevState.documentsToProcess;

      extractor(firstDoc.text, { pooling: "mean", normalize: true }).then((features) => {
        setState((currentState) => ({
          ...currentState,
          embeddedDocuments: [
            ...currentState.embeddedDocuments,
            { document: firstDoc, features: Array.from(features.data) },
          ],
        }));
      });

      // Return state with document moved from queue
      return {
        documentsToProcess: remainingDocs,
        embeddedDocuments: prevState.embeddedDocuments,
      };
    });
  }, [extractor]);

  useEffect(() => {
    setTimeout(() => embedFirstDocument(), 0);
  }, [state, embedFirstDocument]);

  return {
    embeddedDocuments: state.embeddedDocuments,
    embeddingProgress: state.embeddedDocuments.length / dataset.documents.length,
  };
}

export function useUMAP(embeddedDocuments?: { document: Document; features: number[] }[]) {
  const [state, setState] = useStorage("localStorage", STORAGE_KEYS.umap, {
    defaultValue: {
      progress: 0,
    } as {
      progress: number;
      projection?: number[][];
    },
  });
  const epochs = useMemo(() => Math.min(1000, 50 * (embeddedDocuments?.length || 0)), [embeddedDocuments]);
  const umap = useMemo(
    () =>
      embeddedDocuments?.length
        ? new UMAP({
            nComponents: 2,
            minDist: 0.1,
            nNeighbors: Math.min(8, (embeddedDocuments?.length || 0) - 1),
            nEpochs: epochs,
          })
        : null,
    [embeddedDocuments, epochs],
  );
  const projectedDocuments = useMemo<null | ProjectedDocument[]>(() => {
    const { projection } = state;
    if (!projection || !embeddedDocuments) return null;

    return embeddedDocuments.map(({ document, features }, i) => ({
      document,
      features,
      coordinates: {
        x: projection[i][0],
        y: projection[i][1],
      },
    }));
  }, [embeddedDocuments, state]);

  useEffect(() => {
    if (!embeddedDocuments?.length || !umap) return;

    // Also, don't reprocess everything if it looks like the projections are already processed
    // for the proper input (which can happen on reload, for instance):
    if (state.progress === 1 && embeddedDocuments.length === state.projection?.length) return;

    umap
      .fitAsync(
        embeddedDocuments.map(({ features }) => features),
        (epochNumber) => {
          if (epochNumber % 100 == 0 || epochNumber == epochs)
            setState((state) => ({
              ...state,
              progress: epochNumber / epochs,
            }));
        },
      )
      .then((projection) => {
        setState({
          progress: 1,
          projection,
        });
      });
  }, [embeddedDocuments, umap]);

  return {
    projectionProgress: state.progress,
    projectedDocuments,
  };
}

export function getGraph(
  projectedDocuments?: ProjectedDocument[],
  {
    palette = ["#777acd", "#cab21f", "#5ba965", "#ca5e4a", "#c55a9f"],
    paletteDefault = "#919191",
  }: { palette?: string[]; paletteDefault?: string } = {},
): DocumentsGraph {
  const graph = new Graph<DocumentNode>();
  if (!projectedDocuments?.length) return graph;

  const categoriesIndex: Record<string, number> = {};
  projectedDocuments.forEach(({ document: { category } }) => {
    categoriesIndex[category] = (categoriesIndex[category] || 0) + 1;
  });
  const categories = keyBy(
    sortBy(Object.entries(categoriesIndex), [(d) => d[1]]).map(([id, count], i) => ({
      id,
      count,
      color: palette[i] || paletteDefault,
    })),
    "id",
  );

  projectedDocuments.forEach(({ document, coordinates: { x, y } }, i) => {
    const { category, title } = document;
    const color = categories[category].color;
    graph.addNode(i, { id: i + "", label: title, x, y, size: 30, color: color, document });
  });

  return graph;
}
