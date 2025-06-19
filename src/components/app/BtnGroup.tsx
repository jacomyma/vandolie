import { ClickOutside } from "@ouestware/hooks";
import cx from "classnames";
import { type FC, type ReactNode, useState } from "react";

export const BtnGroup: FC<{
  label: ReactNode;
  values: { label: ReactNode; onClick: () => void }[];
  className?: string;
}> = ({ label, values, className }) => {
  const [show, setShow] = useState(false);

  return (
    <ClickOutside className={cx("btn-group dropup", className)} onClickOutside={() => setShow(false)}>
      <button
        className={cx("btn btn-info dropdown-toggle", show && "show")}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded={show ? "true" : "false"}
        onClick={() => setShow((v) => !v)}
      >
        {label}
      </button>
      <ul className={cx("dropdown-menu mb-1 position-absolute bottom-100 mb-1", show && "show")}>
        {values.map(({ label, onClick }, i) => (
          <li key={i}>
            <button
              className="dropdown-item"
              onClick={() => {
                onClick();
                setShow(false);
              }}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </ClickOutside>
  );
};
