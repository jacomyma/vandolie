import { useStorage } from "@ouestware/hooks";
import { ModalProvider } from "@ouestware/modals";
import { type ComponentType, type FC, type PropsWithChildren, useCallback } from "react";

import {
  type ApplicationPage,
  KEYS_TO_FLUSH_ON_UPDATE_DATASET,
  STORAGE_KEYS,
  getEmptyDataset,
} from "../../core/consts.ts";
import { AppContext } from "../../core/context.ts";
import type { LanguageCode } from "../../core/translation.tsx";
import { CountComponent } from "./Count";
import { DataComponent } from "./Data";
import { withDatasetPlaceholder } from "./DatasetPlaceholder.tsx";
import { NetworkComponent } from "./Network";
import { SemanticComponent } from "./Semantic";

const APPLICATION_COMPONENTS: Record<ApplicationPage, ComponentType> = {
  data: DataComponent,
  count: withDatasetPlaceholder(CountComponent),
  network: withDatasetPlaceholder(NetworkComponent),
  semantic: withDatasetPlaceholder(SemanticComponent),
};

export const ApplicationComponent: FC<PropsWithChildren<{ page: ApplicationPage; lang: LanguageCode }>> = ({
  page,
  lang,
}) => {
  const [dataset, setDataset] = useStorage("localStorage", STORAGE_KEYS.dataset, {
    defaultValue: getEmptyDataset(),
  });

  const setDatasetAndFlushOtherKeys: typeof setDataset = useCallback(
    (...args) => {
      KEYS_TO_FLUSH_ON_UPDATE_DATASET.forEach((key) => localStorage.removeItem(key));
      setDataset(...args);
    },
    [setDataset],
  );

  const Component = APPLICATION_COMPONENTS[page];

  return (
    <AppContext.Provider value={{ lang, dataset, setDataset: setDatasetAndFlushOtherKeys }}>
      <ModalProvider>
        <Component />
      </ModalProvider>
    </AppContext.Provider>
  );
};
