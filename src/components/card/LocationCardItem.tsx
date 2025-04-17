"use client";

import { getMarkerIcon } from "@/utils/getMarkerIcon";
import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";

interface LocationCardItemProps {
  id: string;
  lat: number;
  lng: number;
  name: string;
  color?: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const LocationCardItem = ({
  id,
  lat,
  lng,
  name,
  color,
  onDelete,
  onEdit,
}: LocationCardItemProps) => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API ?? "";
  const [showCoords, setShowCoords] = useState(false);

  return (
    <Box
      borderRadius="xl"
      overflow="hidden"
      bg="white"
      boxShadow="0 3px 3px rgba(0, 0, 0, 0.1)"
      height={500}
      position={"relative"}
    >
      <VStack w={"full"} h="100%">
        <APIProvider apiKey={API_KEY}>
          <Map
            style={{ height: "85%", width: "100%" }}
            defaultZoom={15}
            gestureHandling={"none"}
            disableDefaultUI={true}
            defaultCenter={{ lat, lng }}
          >
            <Marker
              position={{ lat, lng }}
              draggable={false}
              icon={getMarkerIcon(color || "#000000")}
              onClick={() => setShowCoords(!showCoords)}
            />
          </Map>
        </APIProvider>

        <HStack
          h={"15%"}
          w={"full"}
          px={4}
          py={2}
          gap={3}
          justify="space-between"
        >
          <Box>
            <Text
              fontSize="sm"
              color="black"
              fontWeight={"semibold"}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              Konum: {name}
            </Text>
            {showCoords && (
              <Text fontSize="xs" color="gray.600">
                Enlem: {lat}, Boylam: {lng}
              </Text>
            )}
          </Box>

          <Button
            size="xs"
            variant="surface"
            onClick={() => onEdit(id)}
            aria-label="Düzenle"
          >
            <FiArrowRight size={18} color="white" />
          </Button>
        </HStack>

        <Box
          display="flex"
          position="absolute"
          top={3}
          right={3}
          gap={1}
          flexDirection="column"
        >
          <Button bg="red.600" size="sm" onClick={() => onDelete(id)} p={1}>
            <MdDeleteOutline size={16} color="white" />
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default LocationCardItem;
