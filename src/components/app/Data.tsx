import { Loader } from "@ouestware/loaders";
import { useModal } from "@ouestware/modals";
import { saveAs } from "file-saver";
import { type FC, useMemo, useState } from "react";
import { BsDownload, BsFileEarmarkPlusFill, BsTrash, BsUpload, BsX, BsStack } from "react-icons/bs";

import { type Document, SAMPLES, getEmptyDataset } from "../../core/consts.ts";
import { useAppContext } from "../../core/context.ts";
import { loadDataset, parseDataset, unparseDataset } from "../../core/data.ts";
import { useTranslate } from "../../core/translation";
import { ConfirmModal } from "../modals/ConfirmModal.tsx";
import { UploadFileModal } from "../modals/UploadFileModal.tsx";
import { BtnGroup } from "./BtnGroup.tsx";

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
  const { dataset, setDataset, lang } = useAppContext();
  const [editedDocIndex, setEditedDocIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <main>
        <div className="container bg-body pb-4">
          <div className="container pt-4">
            <h1>{t("data-documents")}</h1>
            <p>
              <BsStack /> {dataset?.documents.length} {t("docs-loaded")}
            </p>
            <p>{t("data-intro")}</p>
          </div>

          <div className="container pb-4">
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
                          documents: (dataset?.documents || []).filter((_document, index) => index !== editedDocIndex),
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

        <div className="container py-5 my-5">
          <div class="row justify-content-md-center">
            <div class="col vdl-action-card mb-4">
              <div class="card shadow">
                <img class="card-img-top" src={`${import.meta.env.BASE_URL}img/thumbnail-count.jpg`} alt="Mixed glass"/>
                <div class="card-body">
                  <h5 class="card-title">{t("app-count")}</h5>
                  <p class="card-text">{t("data-count-info")}</p>
                  <a href={`${import.meta.env.BASE_URL}${lang}/app/count`} class="btn btn-secondary btn-sm stretched-link">{t("data-use-this")}</a>
                </div>
              </div>
            </div>
            <div class="col vdl-action-card mb-4">
              <div class="card shadow">
                <img class="card-img-top" src={`${import.meta.env.BASE_URL}img/thumbnail-network.jpg`} alt="Mixed glass"/>
                <div class="card-body">
                  <h5 class="card-title">{t("app-network")}</h5>
                  <p class="card-text">{t("data-network-info")}</p>
                  <a href={`${import.meta.env.BASE_URL}${lang}/app/network`} class="btn btn-secondary btn-sm stretched-link">{t("data-use-this")}</a>
                </div>
              </div>
            </div>
            <div class="col vdl-action-card mb-4">
              <div class="card shadow">
                <img class="card-img-top" src={`${import.meta.env.BASE_URL}img/thumbnail-semantic-map.jpg`} alt="Mixed glass"/>
                <div class="card-body">
                  <h5 class="card-title">{t("app-semantic")}</h5>
                  <p class="card-text">{t("data-semantic-info")}</p>
                  <a href={`${import.meta.env.BASE_URL}${lang}/app/semantic`} class="btn btn-secondary btn-sm stretched-link">{t("data-use-this")}</a>
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
                    setDataset(getEmptyDataset());
                  }}
                />,
              )
            }
          >
            <BsX /> {t("clear-all")}
          </button>
          <BtnGroup
            className="me-1"
            label={t("data-load-example")}
            values={SAMPLES.map(({ url, title }) => ({
              label: title,
              onClick: async () => {
                setIsLoading(true);
                setDataset(await loadDataset(url));
                setIsLoading(false);
              },
            }))}
          />
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
        </div>
      </footer>

      {isLoading && <Loader />}
    </>
  );
};
