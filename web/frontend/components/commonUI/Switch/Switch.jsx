import React from "react";
import "./Switch.css";

export default function Switch() {
  return (
    <>
      <label class="switch">
        <input type="checkbox" id="toggleSwitch" />
        <span class="slider"></span>
      </label>
    </>
  );
}
