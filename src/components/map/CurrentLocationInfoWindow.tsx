import { InfoWindow } from "@vis.gl/react-google-maps";
import { Box, Text } from "@chakra-ui/react";

interface CurrentLocationInfoWindowProps {
  location: { lat: number; lng: number };
  onClose: () => void;
}

const CurrentLocationInfoWindow = ({
  location,
  onClose,
}: CurrentLocationInfoWindowProps) => {
  return (
    <InfoWindow
      position={location}
      onCloseClick={onClose}
      headerContent={
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          color="black"
          fontWeight="bold"
          fontSize="md"
          textTransform="capitalize"
        >
          Şu an buradasınız
        </Box>
      }
    >
      <Text color={"black"} fontSize="sm">
        {location.lat}, {location.lng}
      </Text>
    </InfoWindow>
  );
};

export default CurrentLocationInfoWindow;
