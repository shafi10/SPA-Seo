import React from "react";
import { TextField } from "@shopify/polaris";

export const InputField = ({
  labelHidden,
  label,
  error,
  id,
  value,
  onChange,
  autoComplete,
  helpText,
  type,
  placeholder,
  name,
  index,
}) => {
  return (
    <TextField
      labelHidden={labelHidden}
      label={label}
      error={error}
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={(value) => onChange(value, name, index)}
      autoComplete={autoComplete}
      helpText={helpText}
      placeholder={placeholder}
    />
  );
};
