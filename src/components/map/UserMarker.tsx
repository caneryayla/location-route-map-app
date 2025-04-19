import { Marker } from "@vis.gl/react-google-maps";
import { getCurrentLocationIcon } from "@/utils/getCurrentLocationIcon";

interface UserMarkerProps {
  location: { lat: number; lng: number };
  onClick: () => void;
}

const UserMarker = ({ location, onClick }: UserMarkerProps) => {
  return (
    <Marker
      position={location}
      icon={getCurrentLocationIcon()}
      onClick={onClick}
    />
  );
};

export default UserMarker;
