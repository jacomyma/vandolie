import { Modal, useModal } from "@ouestware/modals";
import { type FC, type ReactNode, useState } from "react";

import { useTranslate } from "../../core/translation";

export const UploadFileModal: FC<{
  title?: ReactNode;
  message: ReactNode;
  fileLabel?: ReactNode;
  confirmText?: ReactNode;
  cancelText?: ReactNode;
  onConfirm: (file: File) => void;
}> = ({ title, message, fileLabel, onConfirm, confirmText, cancelText }) => {
  const { t } = useTranslate();
  const { closeModal } = useModal();
  const [file, setFile] = useState<null | File>(null);

  return (
    <Modal title={title}>
      <form
        id="deleteForm"
        onSubmit={(e) => {
          e.preventDefault();
          if (!file) return;

          onConfirm(file);
          closeModal();
        }}
      >
        {message}
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            {fileLabel || t("file")}
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={(e) => setFile((e.target.files && e.target.files[0]) || null)}
          />
        </div>
      </form>

      <div className="col d-flex justify-content-between">
        <button className="btn btn-danger" onClick={closeModal}>
          {cancelText || t("cancel")}
        </button>
        <button className="btn btn-success" form="deleteForm" disabled={!file}>
          {confirmText || t("upload")}
        </button>
      </div>
    </Modal>
  );
};
