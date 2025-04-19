import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { IoArrowForwardSharp } from "react-icons/io5";

interface LatLng {
  lat: number;
  lng: number;
  name: string | null;
  color?: string | null;
  id: string;
}

const RouteOrderCardItem = ({
  point,
  index,
  allPoints,
}: {
  point: LatLng | null;
  index: number;
  allPoints: LatLng[] | null;
}) => {
  return (
    <HStack>
      <Box
        px={4}
        py={2}
        borderRadius="md"
        bg={point?.color ?? "black"}
        color="white"
        textAlign="center"
        minW="100px"
      >
        <Text fontWeight="medium" fontSize="sm">
          {point?.name || `Konum ${index + 1}`}
        </Text>
      </Box>

      {allPoints && index !== allPoints.length - 1 && (
        <IoArrowForwardSharp size={24} color="black" />
      )}
    </HStack>
  );
};

export default RouteOrderCardItem;
