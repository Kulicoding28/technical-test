import React, { useEffect, useRef, useState } from "react";
import {
  ArrowSortIcon,
  SortAZIcon,
  SortNewestIcon,
  SortOldestIcon,
  SortUnfinishedIcon,
  SortZAIcon,
} from "../../../assets";

export default function Sorter({ onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const options = [
    {
      label: "Terbaru",
      image: SortNewestIcon,
    },
    {
      label: "Terlama",
      image: SortOldestIcon,
    },
    {
      label: "A-Z",
      image: SortAZIcon,
    },
    {
      label: "Z-A",
      image: SortZAIcon,
    },
    {
      label: "Belum Selesai",
      image: SortUnfinishedIcon,
    },
  ];
  function handleOptionClick(label) {
    onChange(label);
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return (
    <div className="sorter" ref={ref}>
      <button
        className="sorter__button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img src={ArrowSortIcon} alt="arrow-sort" data-cy="todo-sort-button" />
      </button>

      <ul
        className={`sorter__options ${
          isOpen ? "options-open" : "options-hide"
        }`}
      >
        {options.map((option) => (
          <li
            data-cy="sort-selection"
            key={option.label}
            onClick={() => handleOptionClick(option.label)}
          >
            <img src={option.image} alt="option-label" />
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
