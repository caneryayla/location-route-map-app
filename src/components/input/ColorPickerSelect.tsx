"use client";

import {
  ColorPicker,
  HStack,
  Portal,
  parseColor,
  type Color,
} from "@chakra-ui/react";
import React from "react";

interface ColorPickerSelectProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const ColorPickerSelect = ({
  value,
  onChange,
  label = "Renk Seçiniz",
  placeholder = "#000000",
  disabled = false,
}: ColorPickerSelectProps) => {
  const parsed = parseColor(value);

  return (
    <ColorPicker.Root
      value={parsed}
      onValueChange={(color) => {
        const hexColor = color?.value?.toString("hex");

        if (hexColor) {
          onChange(hexColor);
        }
      }}
      disabled={disabled}
    >
      <ColorPicker.HiddenInput />
      <ColorPicker.Label color="black">{label}</ColorPicker.Label>

      <ColorPicker.Control>
        <ColorPicker.Input placeholder={placeholder} color="black" />
        <ColorPicker.Trigger />
      </ColorPicker.Control>

      <Portal>
        <ColorPicker.Positioner>
          <ColorPicker.Content>
            <ColorPicker.Area />
            <HStack>
              <ColorPicker.EyeDropper size="xs" variant="outline" />
              <ColorPicker.Sliders />
            </HStack>
          </ColorPicker.Content>
        </ColorPicker.Positioner>
      </Portal>
    </ColorPicker.Root>
  );
};

export default ColorPickerSelect;
