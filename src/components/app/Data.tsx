import { Loader } from "@ouestware/loaders";
import { useModal } from "@ouestware/modals";
import { Tooltip } from "@ouestware/tooltip";
import { saveAs } from "file-saver";
import { type FC, useMemo, useState } from "react";
import { BsDownload, BsFileEarmarkPlusFill, BsTrash, BsUpload, BsX } from "react-icons/bs";

import { type Document, SAMPLES } from "../../core/consts.ts";
import { useAppContext } from "../../core/context.ts";
import { loadDataset, parseDataset, unparseDataset } from "../../core/data.ts";
import { useTranslate } from "../../core/i18n";
import { ConfirmModal } from "../modals/ConfirmModal.tsx";
import { UploadFileModal } from "../modals/UploadFileModal.tsx";

const DocumentComponent: FC<{ document: Document; onClick: () => void }> = ({ document, onClick }) => {
  const { t } = useTranslate();

  return (
    <div className="col" onClick={onClick}>
      <div className="card shadow-sm card-doc-saved">
        <div className="card-header doc-title">{document.title}</div>
        <div className="card-body">
          <div className="mb-3 doc-text">{document.text}</div>

          <div className="input-group">
            <span className="input-group-text">{t("data-doc-category")}</span>
            <input type="text" className="form-control" value={document.category} disabled readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

const DocumentEditComponent: FC<{
  document: Document;
  onCancel: () => void;
  onDelete: () => void;
  onSubmit: (newDocument: Document) => void;
}> = ({ document, onCancel, onDelete, onSubmit }) => {
  const { t } = useTranslate();

  const [doc, setDoc] = useState({ ...document });
  const disabled = useMemo(
    () =>
      !doc.title ||
      !doc.text ||
      !doc.category ||
      (doc.title === document.title && doc.text === document.text && doc.category === document.category),
    [doc.title, document.title, doc.text, document.text, doc.category, document.category],
  );

  return (
    <div className="col">
      <form
        className="card shadow border-primary"
        onSubmit={(e) => {
          e.preventDefault();

          if (!disabled) onSubmit(doc);
        }}
      >
        <div className="card-header">
          <input
            autoFocus
            type="text"
            className="form-control"
            placeholder={t("data-doc-title") + "..."}
            aria-label={t("data-doc-title")}
            value={doc.title}
            onChange={(e) => setDoc({ ...doc, title: e.target.value })}
          />
        </div>

        <div className="card-body">
          <div className="mb-3">
            <textarea
              className="form-control"
              rows={5}
              placeholder={t("data-doc-content-placeholder")}
              value={doc.text}
              onChange={(e) => setDoc({ ...doc, text: e.target.value })}
            ></textarea>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">{t("data-doc-category")}</span>
            <input
              type="text"
              className="form-control"
              placeholder={t("data-doc-category-placeholder")}
              value={doc.category}
              onChange={(e) => setDoc({ ...doc, category: e.target.value })}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-outline-danger" onClick={onDelete}>
                <BsTrash /> {t("delete")}
              </button>
            </div>
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onCancel}>
                {t("cancel")}
              </button>
              <button type="submit" className="btn btn-sm btn-primary" disabled={disabled}>
                {t("save")}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export const DataComponent: FC = () => {
  const { t } = useTranslate();
  const { openModal } = useModal();
  const { dataset, setDataset } = useAppContext();
  const [editedDocIndex, setEditedDocIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <main>
        <div className="container bg-body pb-4">
          <div className="container pt-4">
            <h1>{t("data-documents")}</h1>
            <p>{t("data-intro")}</p>
          </div>

          <div className="container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-3">
              {dataset?.documents.map((document, i) => (
                <div key={i} className="col">
                  {editedDocIndex === i ? (
                    <DocumentEditComponent
                      key={i}
                      document={document}
                      onCancel={() => setEditedDocIndex(null)}
                      onDelete={() => {
                        setDataset({
                          ...dataset,
                          documents: (dataset?.documents || []).filter((document, index) => index !== editedDocIndex),
                        });
                        setEditedDocIndex(null);
                      }}
                      onSubmit={(newDocument) => {
                        setDataset({
                          ...dataset,
                          documents: (dataset?.documents || []).map((document, index) =>
                            index === editedDocIndex ? newDocument : document,
                          ),
                        });
                        setEditedDocIndex(null);
                      }}
                    />
                  ) : (
                    <DocumentComponent key={i} document={document} onClick={() => setEditedDocIndex(i)} />
                  )}
                </div>
              ))}

              <div className="col">
                <div className="card text-bg-light">
                  <div className="card-body doc-new">
                    <button
                      type="button"
                      className="btn btn-lg btn-outline-primary"
                      onClick={() => {
                        setDataset({
                          ...dataset,
                          documents: (dataset?.documents || []).concat({
                            title: "",
                            text: "",
                            category: "",
                          }),
                        });
                        setEditedDocIndex(dataset?.documents.length || 0);
                      }}
                    >
                      <BsFileEarmarkPlusFill /> {t("data-add-document")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer bg-body-secondary p-3">
        <div className="container text-center">
          <button
            type="button"
            className="btn btn-outline-danger me-1"
            disabled={!dataset?.documents?.length}
            onClick={() =>
              openModal(
                <ConfirmModal
                  title={t("data-clear-dataset")}
                  message={t("data-clear-dataset-confirm-message")}
                  confirmText={t("yes")}
                  cancelText={t("no")}
                  onConfirm={() => {
                    setDataset(undefined);
                  }}
                />,
              )
            }
          >
            <BsX /> {t("clear-all")}
          </button>
          <Tooltip rootClassName="me-1">
            <button
              className="btn btn-info dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {t("data-load-example")}
            </button>
            <section className="tooltip-inner">
              {SAMPLES.map(({ url, title }) => (
                <button
                  key={url}
                  className="dropdown-item btn btn-link"
                  onClick={async () => {
                    setIsLoading(true);
                    setDataset(await loadDataset(url));
                    setIsLoading(false);
                  }}
                >
                  {title}
                </button>
              ))}
            </section>
          </Tooltip>
          <button
            type="button"
            className="btn btn-outline-secondary me-1"
            onClick={() =>
              openModal(
                <UploadFileModal
                  title={t("data-upload-csv")}
                  message={t("data-upload-csv-message")}
                  onConfirm={async (file) => {
                    setIsLoading(true);
                    setDataset(await parseDataset(file));
                    setIsLoading(false);
                  }}
                />,
              )
            }
          >
            <BsUpload /> {t("data-upload-csv")}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary me-1"
            onClick={() => {
              if (!dataset?.documents?.length) return;
              const csv = unparseDataset(dataset);
              saveAs(new File([csv], "documents.csv", { type: "text/plain;charset=utf-8" }));
            }}
            disabled={!dataset?.documents?.length}
          >
            <BsDownload /> {t("data-save-csv")}
          </button>
          <button type="button" className="btn btn-primary px-3">
            {t("ok")}
          </button>
        </div>
      </footer>

      {isLoading && <Loader />}
    </>
  );
};
