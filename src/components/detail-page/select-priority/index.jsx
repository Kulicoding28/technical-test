import React, { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "../../../assets";

export default function SelectPriority({ options, defaultValue, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("Pilih priority");
  const [selectedColor, setSelectedColor] = useState("");

  const selectRef = useRef(null);

  useEffect(() => {
    if (defaultValue) {
      const selectedOption = options.find((opt) => opt.value === defaultValue);
      setSelectedLabel(selectedOption.label);
      setSelectedColor(selectedOption.color);
    } else {
      setSelectedLabel("Pilih priority");
      setSelectedColor("");
    }
  }, [defaultValue]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleOptionClick({ value, label, color }) {
    onSelect(value);
    setSelectedLabel(label);
    setSelectedColor(color);
    setIsOpen(false);
  }

  return (
    <div className="select-priority" ref={selectRef}>
      <div
        className="select-priority__label"
        style={{ backgroundColor: isOpen ? "#E5E5E5" : "#FFFFFF" }}
        onClick={toggleDropdown}
      >
        <div>
          {selectedColor && (
            <div
              className="circle"
              style={{ backgroundColor: selectedColor }}
            />
          )}
          {selectedLabel}
        </div>
        <img
          data-cy="modal-add-priority-dropdown"
          src={isOpen ? ChevronUpIcon : ChevronDownIcon}
          alt="chevron"
        />
      </div>
      <div
        className={`select-priority__options ${
          isOpen ? "options-open" : "options-hide"
        }`}
      >
        {options.map((option) => (
          <div
            key={option.value}
            data-cy="modal-add-priority-item"
            className="option-list"
            onClick={() => handleOptionClick(option)}
          >
            <div className="circle" style={{ backgroundColor: option.color }} />{" "}
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}
