import React from "react";
import "./Switch.css";

export default function Switch({ checked = false, handleClick }) {
  return (
    <>
      <label
        onClick={(e) => {
          handleClick();
        }}
        className="switch"
      >
        <span className={`slider ${checked ? "checked" : ""}`}></span>
      </label>
    </>
  );
}
