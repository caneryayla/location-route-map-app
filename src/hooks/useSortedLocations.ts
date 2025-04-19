import { useMemo } from "react";
import { getDistance } from "./useGetDistance";

interface LatLng {
  lat: number;
  lng: number;
}

interface LocationItem extends LatLng {
  id: string;
  color: string | null;
  name: string | null;
}

const useLocationDistances = (
  locations: LocationItem[],
  userLocation: LatLng | null
) => {
  const distances = useMemo(() => {
    if (!userLocation) return locations.map(() => 0);

    return locations.map((location) => {
      const distance = getDistance(userLocation, location);
      return distance;
    });
  }, [locations, userLocation]);

  return distances;
};

const useSortedLocations = (
  locations: LocationItem[],
  userLocation: LatLng | null
): LocationItem[] => {
  const distances = useLocationDistances(locations, userLocation);

  return useMemo(() => {
    if (!userLocation) return locations;

    const locationsWithDistances = locations.map((location, index) => ({
      location,
      distance: distances[index],
    }));

    return locationsWithDistances
      .sort((a, b) => a.distance - b.distance)
      .map((item) => item.location);
  }, [locations, distances, userLocation]);
};

export default useSortedLocations;
