import { createContext, useContext } from "react";

import { type Dataset, LANGUAGE_CODES, type LanguageCode } from "./consts.ts";

export type ContextType = {
  dataset: Dataset | undefined;
  setDataset: (dataset: Dataset | undefined) => void;
  lang: LanguageCode;
};

export const AppContext = createContext<ContextType>({
  dataset: undefined,
  setDataset: () => {},
  lang: "en",
});

export const useAppContext = () => useContext(AppContext);
