import React from "react";
import "./Switch.css";

export default function Switch({ checked = false, handleClick }) {
  return (
    <>
      <label
        className="switch"
        onClick={(e) => {
          console.log("clicked");
          e.preventDefault();
          handleClick();
        }}
      >
        <span className={`slider ${checked ? "checked" : ""}`}></span>
      </label>
    </>
  );
}
