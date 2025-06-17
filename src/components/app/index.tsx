import { useStorage } from "@ouestware/hooks";
import { ModalProvider } from "@ouestware/modals";
import type { ComponentType, FC, PropsWithChildren } from "react";

import type { ApplicationPage, Dataset, LanguageCode } from "../../core/consts.ts";
import { AppContext } from "../../core/context.ts";
import { CountComponent } from "./Count";
import { DataComponent } from "./Data";
import { NetworkComponent } from "./Network";
import { SemanticComponent } from "./Semantic";

const APPLICATION_COMPONENTS: Record<ApplicationPage, ComponentType> = {
  data: DataComponent,
  count: CountComponent,
  network: NetworkComponent,
  semantic: SemanticComponent,
};

export const ApplicationComponent: FC<PropsWithChildren<{ page: ApplicationPage; lang: LanguageCode }>> = ({
  page,
  lang,
}) => {
  const [dataset, setDataset] = useStorage<Dataset>("localStorage", "vandolie-dataset");

  const Component = APPLICATION_COMPONENTS[page];

  return (
    <AppContext.Provider value={{ dataset, setDataset, lang }}>
      <ModalProvider>
        <Component />
      </ModalProvider>
    </AppContext.Provider>
  );
};
