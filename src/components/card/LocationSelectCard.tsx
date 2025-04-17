"use client";

import { Button, Card } from "@chakra-ui/react";
import React from "react";
import TextInput from "../input/TextInput";
import ColorPickerSelect from "../input/ColorPickerSelect";

interface MarkerData {
  lat: number | null;
  lng: number | null;
  name: string;
  color: string;
}

interface LocationCardProps {
  marker: MarkerData;
  onChange: (updated: MarkerData) => void;
  onSave: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  label?: string;
  cancelButtonLabel?: string;
  saveButtonLabel?: string;
}

const LocationSelectCard = ({
  marker,
  onChange,
  onSave,
  onCancel,
  label = "Konum Bilgileri",
  cancelButtonLabel = "Vazgeç",
  saveButtonLabel = "Kaydet",
  isLoading = false,
}: LocationCardProps) => {
  return (
    <Card.Root
      bg="white"
      position="absolute"
      bottom={10}
      left="50%"
      transform="translateX(-50%)"
      boxShadow="0 3px 3px rgba(0, 0, 0, 0.1)"
      borderRadius="lg"
      border="none"
      sm={{ width: "400px" }}
      width="80%"
    >
      <Card.Body gap={3}>
        <Card.Title color="black">{label}</Card.Title>

        <TextInput
          label="Konum Adı"
          placeholder="Konum Adı"
          value={marker.name}
          onChange={(name) => onChange({ ...marker, name })}
          disabled={isLoading}
        />

        <ColorPickerSelect
          value={marker.color}
          onChange={(color) => onChange({ ...marker, color })}
          label="Pin Rengi Seçiniz"
          placeholder="#000000"
          disabled={isLoading}
        />
      </Card.Body>

      <Card.Footer>
        <Button
          size="sm"
          variant="outline"
          color="black"
          borderColor="gray.400"
          _hover={{ bg: "black", color: "white" }}
          onClick={onCancel}
        >
          {cancelButtonLabel}
        </Button>

        <Button
          size="sm"
          variant="outline"
          color="black"
          borderColor="gray.400"
          _hover={{ bg: "black", color: "white" }}
          onClick={onSave}
          loading={isLoading}
          disabled={isLoading || !marker.name.trim() || !marker.color}
        >
          {saveButtonLabel}
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default LocationSelectCard;
