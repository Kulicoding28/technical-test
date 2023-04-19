import { useContext } from "react";
import { createPortal } from "react-dom";
import { AppContext } from "../../../AppContext";
import { ModalInformationIcon } from "../../../assets";

export default function Alert() {
  const { alertConfig } = useContext(AppContext);

  if (!alertConfig?.show) return null;

  return createPortal(
    <div
      className={`alert-overlay ${
        alertConfig?.show ? "alert-overlay-open" : ""
      }`}
    >
      <div
        className={`custom-alert ${
          alertConfig?.show ? "alert-open" : "alert-hide"
        }`}
      >
        <img src={ModalInformationIcon} alt="alert-info" />
        <p>{alertConfig?.message || ""}</p>
      </div>
    </div>,
    document.getElementById("alert-root")
  );
}
