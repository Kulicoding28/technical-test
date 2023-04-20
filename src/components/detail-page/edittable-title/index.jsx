import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { TodoEditButtonIcon } from "../../../assets";

export default function EdittableTitle({ value, onSave }) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const ref = useRef();
  const { id } = useParams();

  useEffect(() => {
    if (value) {
      setTitle(value);
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onSave({ id, title: ref.current.value });
        setEditMode(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      {editMode ? (
        <input
          type="text"
          className="title-input"
          ref={ref}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      ) : (
        <h1
          data-cy="todo-title"
          className="readonly-title"
          onClick={() => setEditMode(true)}
        >
          {title}
        </h1>
      )}

      <img
        data-cy="todo-title-edit-button"
        src={TodoEditButtonIcon}
        alt="edit-button"
        className="edit-button-icon"
        onClick={() => setEditMode(true)}
      />
    </>
  );
}
