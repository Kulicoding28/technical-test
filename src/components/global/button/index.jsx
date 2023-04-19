import { useEffect, useState } from "react";

export default function Button({
  children,
  textColor = "#ffffff",
  backgroundColor = "#16abf8",
  backgroundColorHover = "#1792cf",
  disabledColor = "#5ac4f9",
  onClick,
  dataCy,
  disabled,
}) {
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    if (backgroundColor && !disabled) {
      setBgColor(backgroundColor);
    } else if (backgroundColor && disabled) {
      setBgColor(disabledColor);
    } else {
      setBgColor("");
    }
  }, [backgroundColor]);

  const handleMouseEnter = () => {
    setBgColor(backgroundColorHover);
  };

  const handleMouseLeave = () => {
    setBgColor(backgroundColor);
  };

  return (
    <button
      data-cy={dataCy}
      className="custom-button"
      style={{
        color: textColor,
        backgroundColor: bgColor,
        cursor: disabled ? "default" : "pointer",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
