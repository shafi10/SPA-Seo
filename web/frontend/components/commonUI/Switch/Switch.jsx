import React from "react";
import "./Switch.css";

export default function Switch({ checked, handleClick }) {
  return (
    <>
      <label class="switch">
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
