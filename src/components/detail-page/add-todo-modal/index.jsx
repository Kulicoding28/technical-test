import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ModalAddCloseButtonIcon } from "../../../assets";
import Button from "../../global/button";
import Modal from "../../global/modal";
import SelectPriority from "../select-priority";

export default function AddTodoModal({
  isOpen,
  isEditMode,
  defaultValue,
  onClose,
  onSubmit,
}) {
  const { id: activity_group_id } = useParams();

  const [values, setValues] = useState({
    title: "",
    priority: "",
  });

  useEffect(() => {
    if (isEditMode) {
      setValues({
        title: defaultValue?.title || "",
        priority: defaultValue?.priority || "",
      });
    }
  }, [isEditMode, defaultValue?.title, defaultValue?.priority]);

  return (
    <Modal isOpen={isOpen} dataCy="modal-add" data-cy="modal-add">
      <div className="add-todo-modal">
        <div className="add-todo-modal__header">
          <h1>{isEditMode ? "Ubah" : "Tambah"} List Item</h1>
          <img
            src={ModalAddCloseButtonIcon}
            alt="modal-add-close-button"
            onClick={() => {
              onClose();
              setValues({
                title: "",
                priority: "",
              });
            }}
          />
        </div>

        <div className="add-todo-modal__content">
          <label htmlFor="item-list-name-input">NAMA LIST ITEM</label>
          <input
            data-cy="modal-add-name-input"
            id="item-list-name-input"
            type="text"
            placeholder="Tambahkan nama list item"
            value={values.title}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, title: e.target.value }))
            }
          />

          <label htmlFor="priority">PRIORITY</label>
          <SelectPriority
            options={[
              { value: "very-high", label: "Very High", color: "#ED4C5C" },
              { value: "high", label: "High", color: "#F8A541" },
              { value: "normal", label: "Medium", color: "#00A790" },
              { value: "low", label: "Low", color: "#428BC1" },
              { value: "very-low", label: "Very Low", color: "#8942C1" },
            ]}
            defaultValue={values.priority}
            onSelect={(val) =>
              setValues((prev) => ({ ...prev, priority: val }))
            }
          />
        </div>

        <div className="add-todo-modal__footer">
          <Button
            dataCy="modal-add-save-button"
            data-cy="modal-add-save-button"
            onClick={() => {
              onSubmit({ activity_group_id, ...values });
              setValues({
                title: "",
                priority: "",
              });
            }}
            disabled={!values.priority || !values.title}
          >
            Simpan
          </Button>
        </div>
      </div>
    </Modal>
  );
}
