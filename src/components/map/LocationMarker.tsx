import { Marker } from "@vis.gl/react-google-maps";
import { getMarkerIcon } from "@/utils/getMarkerIcon";

interface LocationMarkerProps {
  item: {
    id: string;
    lat: number;
    lng: number;
    color: string | null;
    name: string | null;
  };
  onClick: () => void;
}

const LocationMarker = ({ item, onClick }: LocationMarkerProps) => {
  return (
    <Marker
      position={{ lat: item.lat, lng: item.lng }}
      icon={getMarkerIcon(item.color ?? "#000000")}
      onClick={onClick}
    />
  );
};

export default LocationMarker;
