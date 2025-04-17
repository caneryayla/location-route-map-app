"use client";
import { Field, Input } from "@chakra-ui/react";
import React from "react";

interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  type?: string;
}

const TextInput = ({
  label,
  placeholder,
  value,
  onChange,
  disabled = false,
  type = "text",
}: TextInputProps) => {
  return (
    <Field.Root>
      <Field.Label as="label" color={"black"}>
        {label}
      </Field.Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        color={"black"}
      />
    </Field.Root>
  );
};

export default TextInput;
