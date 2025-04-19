import { useEffect, useState } from "react";

interface LatLng {
  lat: number;
  lng: number;
}

const useUserLocation = (): LatLng | null => {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  return userLocation;
};

export default useUserLocation;
