import React, { useRef } from "react";
import { useEffect } from "react";
import { ModalDeleteIcon } from "../../../assets";
import Button from "../button";
import Modal from "../modal";

export default function DeleteModal({
  isOpen,
  onClose,
  onDelete,
  highlightText,
}) {
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <Modal dataCy="modal-delete" isOpen={isOpen}>
      <div ref={ref} className="delete-modal">
        <img src={ModalDeleteIcon} alt="modal-delete-icon" />
        <p>
          Apakah anda yakin menghapus activity{" "}
          <span className="text-bold">{highlightText}</span>
        </p>
        <div className="delete-modal__footer">
          <Button
            dataCy="modal-delete-cancel-button"
            textColor="#4A4A4A"
            backgroundColor="#F4F4F4"
            backgroundColorHover="#d9d9d9"
            onClick={onClose}
          >
            Batal
          </Button>
          <Button
            dataCy="modal-delete-confirm-button"
            backgroundColor="#ED4C5C"
            backgroundColorHover="#a43944"
            onClick={onDelete}
          >
            Hapus
          </Button>
        </div>
      </div>
    </Modal>
  );
}
