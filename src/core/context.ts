import { createContext, useContext } from "react";

import type { Dataset } from "./consts.ts";

export type ContextType = {
  dataset: Dataset | undefined;
  setDataset: (dataset: Dataset | undefined) => void;
};

export const AppContext = createContext<ContextType>({ dataset: undefined, setDataset: () => {} });

export const useAppContext = () => useContext(AppContext);
