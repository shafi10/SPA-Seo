import React from "react";
import "../../assets/textarea.css";

export default function TextareaField({
  name,
  value,
  label,
  onChange,
  placeholder,
  error,
  index,
}) {
  return (
    <div className="text__area_input_field">
      <label htmlFor="myTextarea" className="text__area_label">
        {label}
      </label>
      <textarea
        id="myTextarea"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value, name, index)}
        placeholder={placeholder}
      />
      {error && (
        <label htmlFor="myError" className="text__danger_textfield">
          {error}
        </label>
      )}
    </div>
  );
}
