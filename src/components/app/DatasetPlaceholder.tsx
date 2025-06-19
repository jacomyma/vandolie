import React, { type ComponentType, type FC } from "react";

import { useAppContext } from "../../core/context.ts";
import { useTranslate } from "../../core/translation.tsx";

const DatasetPlaceholder: FC = () => {
  const { t } = useTranslate();

  return (
    <main className="container d-flex flex-column">
      <div className="row bg-body flex-grow-1 h-100 d-flex align-items-center justify-content-center">
        <p className="text-muted w-75 text-center">{t("app-no-data")}</p>
      </div>
    </main>
  );
};

export function withDatasetPlaceholder<T extends Record<string, unknown>>(
  Component: ComponentType<T>,
): ComponentType<T> {
  return (props: T) => {
    const { dataset } = useAppContext();

    if (!dataset.documents?.length) return <DatasetPlaceholder />;

    return <Component {...props} />;
  };
}
