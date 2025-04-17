"use client";

import { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

type LatLng = { lat: number; lng: number };
type LatLngLiteral = google.maps.LatLngLiteral;

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
  const routesLibrary = useMapsLibrary("routes");
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);
  const [geometry, setGeometry] = useState<LatLngLiteral[]>([]);

  useEffect(() => {
    if (!map || !routesLibrary) return;

    const directionsService = new routesLibrary.DirectionsService();
    const directionsRenderer = new routesLibrary.DirectionsRenderer({
      suppressMarkers: true,
    });

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
        setGeometry(path);

        // Create a new polyline
        const newPolyline = new google.maps.Polyline({
          path: path,
          strokeColor: color,
          strokeWeight: weight,
          map: map,
        });

        // Set the polyline state
        setPolyline(newPolyline);

        // Fit the map to the bounds of the route
        const bounds = new google.maps.LatLngBounds();
        path.forEach((point) => bounds.extend(point));
        map.fitBounds(bounds);
      } else {
        console.error("Rota oluşturulamadı");
      }
    });

    return () => {
      directionsRenderer.setMap(null);
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
    polyline,
  ]);

  useEffect(() => {
    if (!map || !polyline) return;

    polyline.setOptions({
      path: geometry,
      strokeColor: color,
      strokeWeight: weight,
    });
  }, [map, geometry, color, weight, polyline]);

  return null;
};

export default Route;
