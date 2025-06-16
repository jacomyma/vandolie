import { type FC, useMemo, useState } from "react";
import { BsDownload, BsFileEarmarkPlusFill, BsTrash, BsUpload, BsX } from "react-icons/bs";

import type { Document } from "../../core/consts.ts";
import { useAppContext } from "../../core/context.ts";

const DocumentComponent: FC<{ document: Document; onClick: () => void }> = ({ document, onClick }) => {
  return (
    <div className="col" onClick={onClick}>
      <div className="card shadow-sm card-doc-saved">
        <div className="card-header doc-title">{document.title}</div>
        <div className="card-body">
          <div className="mb-3 doc-text">{document.content}</div>

          <div className="input-group">
            {/* TODO: Translate */}
            <span className="input-group-text">Category</span>
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
  const [doc, setDoc] = useState({ ...document });
  const disabled = useMemo(
    () => doc.title === document.title && doc.content === document.content && doc.category === document.category,
    [doc.title, document.title, doc.content, document.content, doc.category, document.category],
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
            type="text"
            className="form-control"
            placeholder="Document title..."
            aria-label="Document title"
            value={doc.title}
            onChange={(e) => setDoc({ ...doc, title: e.target.value })}
          />
        </div>

        <div className="card-body">
          <div className="mb-3">
            <textarea
              className="form-control"
              rows={5}
              placeholder="Paste text content here..."
              value={doc.content}
              onChange={(e) => setDoc({ ...doc, content: e.target.value })}
            ></textarea>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">Category</span>
            <input
              type="text"
              className="form-control"
              placeholder="Describe document type..."
              value={doc.category}
              onChange={(e) => setDoc({ ...doc, category: e.target.value })}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-outline-danger" onClick={onDelete}>
                <BsTrash /> Delete
              </button>
            </div>
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-sm btn-primary" disabled={disabled}>
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export const DataComponent: FC = () => {
  const { dataset, setDataset } = useAppContext();
  const [editedDocIndex, setEditedDocIndex] = useState<number | null>(null);

  return (
    <>
      <main>
        <div className="container bg-body pb-4">
          <div className="container pt-4">
            <h1>Documents</h1>
            <p>
              Input documents here, or load an example dataset. Each document could be a newspaper article, a post on
              social media, or anything else consisting of just text. Copy-paste the text content in the main field,
              give a title, and choose a category. We recommend 10 to 50 documents, and 2 to 5 different categories.
            </p>
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
                            content: "",
                            category: "",
                          }),
                        });
                        setEditedDocIndex(dataset?.documents.length || 0);
                      }}
                    >
                      <BsFileEarmarkPlusFill /> Add document
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
          <button type="button" className="btn btn-outline-danger me-1">
            <BsX /> Clear all
          </button>
          <div className="btn-group me-1">
            <button
              className="btn btn-info dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Load example
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Example dataset #1
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Example dataset #2
                </a>
              </li>
            </ul>
          </div>
          <button type="button" className="btn btn-outline-secondary me-1">
            <BsUpload /> Upload (CSV)
          </button>
          <button type="button" className="btn btn-outline-secondary me-1">
            <BsDownload /> Save (CSV)
          </button>
          <button type="button" className="btn btn-primary px-3">
            OK
          </button>
        </div>
      </footer>
    </>
  );
};
