import { type ParseResult, parse, unparse } from "papaparse";

import type { Dataset } from "./consts.ts";

export async function parseDataset(file: File | string): Promise<Dataset> {
  const result = await new Promise<ParseResult<string[]>>((resolve) =>
    parse<string[]>(file, { header: false, complete: (res) => resolve(res) }),
  );

  const dataset: Dataset = { documents: [] };
  result.data.forEach((item, i) => {
    if (i === 0) return;

    const [title = "", text = "", category = ""] = item;
    if (title || text || category)
      dataset.documents.push({
        title,
        text,
        category,
      });
  });

  return dataset;
}

export function unparseDataset(dataset: Dataset): string {
  return unparse(dataset.documents);
}

export async function loadDataset(url: string): Promise<Dataset> {
  const response = await fetch(url);
  const text = await response.text();
  return parseDataset(text);
}
