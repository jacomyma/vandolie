import { useStorage } from "@ouestware/hooks";
import { ModalProvider } from "@ouestware/modals";
import type { ComponentType, FC, PropsWithChildren } from "react";

import { type ApplicationPage, getEmptyDataset } from "../../core/consts.ts";
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
  const [dataset, setDataset] = useStorage("localStorage", "vandolie-dataset", {
    defaultValue: getEmptyDataset(),
  });

  const Component = APPLICATION_COMPONENTS[page];

  return (
    <AppContext.Provider value={{ dataset, setDataset, lang }}>
      <ModalProvider>
        <Component />
      </ModalProvider>
    </AppContext.Provider>
  );
};
