import { createContext, useContext } from "react";

import { type Dataset, type LanguageCode, getEmptyDataset } from "./consts.ts";

export type ContextType = {
  dataset: Dataset;
  setDataset: (dataset: Dataset) => void;
  lang: LanguageCode;
};

export const AppContext = createContext<ContextType>({
  dataset: getEmptyDataset(),
  setDataset: () => {},
  lang: "en",
});

export const useAppContext = () => useContext(AppContext);
