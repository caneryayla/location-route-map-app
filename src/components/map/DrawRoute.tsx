"use client";

import { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

type LatLng = { lat: number; lng: number };

interface RouteProps {
  origin: LatLng;
  destination: LatLng;
  waypoints?: LatLng[];
  travelMode?: "DRIVE" | "WALK" | "BICYCLE";
  color?: string;
  weight?: number;
  fitBounds?: boolean;
}

const DrawRoute = ({
  origin,
  destination,
  waypoints = [],
  travelMode = "DRIVE",
  color = "#1e90ff",
  weight = 5,
  fitBounds = false,
}: RouteProps) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map || !routesLibrary) return;

    const directionsService = new routesLibrary.DirectionsService();

    const request: google.maps.DirectionsRequest = {
      origin,
      destination,
      waypoints: waypoints.map((point) => ({
        location: point,
        stopover: true,
      })),
      travelMode:
        travelMode === "DRIVE"
          ? routesLibrary.TravelMode.DRIVING
          : travelMode === "WALK"
          ? routesLibrary.TravelMode.WALKING
          : routesLibrary.TravelMode.BICYCLING,
    };

    directionsService.route(request, (result, status) => {
      if (status === "OK" && result) {
        const path = result.routes[0].overview_path.map((point) => ({
          lat: point.lat(),
          lng: point.lng(),
        }));

        const newPolyline = new google.maps.Polyline({
          path,
          strokeColor: color,
          strokeWeight: weight,
          map,
        });

        if (polyline) {
          polyline.setMap(null);
        }

        setPolyline(newPolyline);

        if (fitBounds) {
          const bounds = new google.maps.LatLngBounds();
          path.forEach((point) => bounds.extend(point));
          map.fitBounds(bounds);
        }
      } else {
        console.error("Rota oluşturulamadı", status);
      }
    });

    return () => {
      if (polyline) {
        polyline.setMap(null);
      }
    };
  }, [
    map,
    origin,
    destination,
    waypoints,
    travelMode,
    color,
    weight,
    routesLibrary,
  ]);

  return null;
};

export default DrawRoute;
