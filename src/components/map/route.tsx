"use client";

import React, { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { toaster } from "../ui/toaster";

type LatLng = { lat: number; lng: number };

interface RouteProps {
  origin: LatLng;
  destination: LatLng;
  waypoints?: LatLng[];
  travelMode?: "DRIVE" | "WALK" | "BICYCLE";
  color?: string;
  weight?: number;
}

const Route = ({
  origin,
  destination,
  waypoints = [],
  travelMode = "DRIVE",
  color = "#1e90ff",
  weight = 5,
}: RouteProps) => {
  const map = useMap();
  const geometry = useMapsLibrary("geometry");
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map || !geometry) return;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode:
          travelMode === "DRIVE"
            ? google.maps.TravelMode.DRIVING
            : travelMode === "WALK"
            ? google.maps.TravelMode.WALKING
            : travelMode === "BICYCLE"
            ? google.maps.TravelMode.BICYCLING
            : google.maps.TravelMode.DRIVING,
        waypoints: waypoints.map((point) => ({
          location: point,
          stopover: true,
        })),
        optimizeWaypoints: false,
      },
      (result, status) => {
        if (status === "OK" && result?.routes[0]) {
          const encoded = result.routes[0].overview_polyline;
          if (!encoded) return;

          const path = geometry.encoding.decodePath(encoded);

          if (polyline) polyline.setMap(null);

          const newPolyline = new google.maps.Polyline({
            path,
            strokeColor: color,
            strokeWeight: weight,
            strokeOpacity: 0.9,
            map,
          });

          setPolyline(newPolyline);

          const bounds = new google.maps.LatLngBounds();
          path.forEach((p) => bounds.extend(p));
          map.fitBounds(bounds);
        } else {
          toaster.create({
            title: "Rota oluşturulamadı",
            description: "Lütfen başlangıç ve varış noktalarını kontrol edin.",
            type: "error",
            duration: 3000,
          });
        }
      }
    );

    return () => {
      if (polyline) polyline.setMap(null);
    };
  }, [map, origin, destination, waypoints, travelMode, geometry]);

  return null;
};

export default Route;
