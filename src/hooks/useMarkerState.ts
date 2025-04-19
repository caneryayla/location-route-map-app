import { useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API ?? "";

interface MarkerState {
  lat: number | null;
  lng: number | null;
  color: string;
  name: string;
}

const DEFAULT_MARKER: MarkerState = {
  lat: null,
  lng: null,
  color: "#000000",
  name: "",
};

const useMarkerState = () => {
  const [marker, setMarker] = useState<MarkerState>(DEFAULT_MARKER);
  const [isGeoCodeLoading, setIsGeoCodeLoading] = useState(false);

  const resetMarker = () => setMarker(DEFAULT_MARKER);

  const setAddressByLatLng = async (lat: number, lng: number) => {
    try {
      setIsGeoCodeLoading(true);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
      );
      const data = await response.json();
      const address = data?.results?.[0]?.formatted_address;

      setMarker((prev) => ({
        ...prev,
        name: address || "",
      }));
    } catch {
    } finally {
      setIsGeoCodeLoading(false);
    }
  };

  return {
    marker,
    setMarker,
    resetMarker,
    isGeoCodeLoading,
    setAddressByLatLng,
  };
};

export default useMarkerState;
