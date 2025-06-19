import { Modal, useModal } from "@ouestware/modals";
import { type FC, type ReactNode, useCallback } from "react";

import { useTranslate } from "../../core/translation";

export const ConfirmModal: FC<{
  title?: ReactNode;
  message: ReactNode;
  confirmText?: ReactNode;
  cancelText?: ReactNode;
  onConfirm: () => void;
}> = ({ title, message, onConfirm, confirmText, cancelText }) => {
  const { t } = useTranslate();
  const { closeModal } = useModal();

  return (
    <Modal title={title}>
      <form
        id="deleteForm"
        onSubmit={(e) => {
          e.preventDefault();
          onConfirm();
          closeModal();
        }}
      >
        {message}
      </form>

      <div className="col d-flex justify-content-between">
        <button className="btn btn-danger" onClick={closeModal}>
          {cancelText || t("cancel")}
        </button>
        <button className="btn btn-success" form="deleteForm">
          {confirmText || t("confirm")}
        </button>
      </div>
    </Modal>
  );
};
