import { InfoWindow } from "@vis.gl/react-google-maps";
import { Box, Text } from "@chakra-ui/react";

interface SelectedLocationInfoWindowProps {
  item: {
    id: string;
    lat: number;
    lng: number;
    color: string | null;
    name: string | null;
  };
  onClose: () => void;
}

const SelectedLocationInfoWindow = ({
  item,
  onClose,
}: SelectedLocationInfoWindowProps) => {
  return (
    <InfoWindow
      position={{ lat: item.lat, lng: item.lng }}
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
          {item.name}
        </Box>
      }
    >
      <Text color="black" fontSize="sm">
        {item.lat}, {item.lng}
      </Text>
    </InfoWindow>
  );
};

export default SelectedLocationInfoWindow;
