import React, { useEffect, useState } from "react";
import { updateTodoById } from "../../../api/todo";
import {
  ActivityItemDeleteButtonIcon,
  TodoEditButtonIcon,
  TodoItemChecked,
  TodoItemUnchecked,
} from "../../../assets";

export default function TodoCard({
  onOpenEditModal,
  onOpenDeleteModal,
  id,
  title,
  priority,
  is_active,
}) {
  const [isChecked, setIsChecked] = useState(false);

  function convertPriorityToColor(priority) {
    if (priority === "very-high") {
      return "#ED4C5C";
    } else if (priority === "high") {
      return "#F8A541";
    } else if (priority === "normal") {
      return "#00A790";
    } else if (priority === "low") {
      return "#428BC1";
    } else if (priority === "very-low") {
      return "#8942C1";
    } else {
      return "#B01AFF";
    }
  }

  useEffect(() => {
    if (!is_active) {
      setIsChecked(true);
    }
  }, [is_active]);

  return (
    <div className="todo-card">
      <div className="todo-card__section1">
        <button
          className="todo-checkbox"
          onClick={() => {
            updateTodoById({ id, is_active: Number(isChecked) });
            setIsChecked((prev) => !prev);
          }}
        >
          <img
            src={isChecked ? TodoItemChecked : TodoItemUnchecked}
            alt="todo-checkbox"
            data-cy="todo-item-checkbox"
          />
        </button>
        <div
          className="circle"
          style={{ backgroundColor: convertPriorityToColor(priority) }}
        />
        <p
          data-cy="todo-item-title"
          className="todo-title"
          style={{ textDecoration: isChecked ? "line-through" : "none" }}
        >
          {title}
        </p>
        <button
          className="todo-edit-button"
          onClick={onOpenEditModal}
          data-cy="todo-item-edit-button"
        >
          <img src={TodoEditButtonIcon} alt="todo-edit-button" />
        </button>
      </div>

      <div className="todo-card__section2">
        <button className="todo-delete-button" onClick={onOpenDeleteModal}>
          <img
            src={ActivityItemDeleteButtonIcon}
            alt="todo-delete-button"
            data-cy="todo-item-delete-button"
          />
        </button>
      </div>
    </div>
  );
}
