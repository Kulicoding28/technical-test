import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, children, dataCy }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(isOpen);
    } else {
      setTimeout(() => {
        setShowModal(false);
      }, 200);
    }
  }, [isOpen]);

  if (!showModal) return null;

  return createPortal(
    <div
      data-cy={dataCy}
      className={`modal-overlay ${isOpen ? "modal-overlay-open" : ""}`}
    >
      <div className={`custom-modal ${isOpen ? "modal-open" : "modal-hide"}`}>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
