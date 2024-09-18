import React from "react";
import "./Switch.css";

export default function Switch({ checked = false, handleClick }) {
  return (
    <>
      <label className="switch">
        <input
          type="checkbox"
          id="toggleSwitch"
          checked={checked}
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
        />
        <span className={`slider ${checked ? "checked" : ""}`}></span>
      </label>
    </>
  );
}
