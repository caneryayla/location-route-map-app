"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useLocationStore } from "@/store/useLocationStore";
import { getMarkerIcon } from "@/utils/getMarkerIcon";
import { Box, Button, Text } from "@chakra-ui/react";
import { getCurrentLocationIcon } from "@/utils/getCurrentLocationIcon";
import Route from "@/components/map/route";
import RouteModal from "@/components/modal/RouteModal";

const DrawRoutePage = () => {
  const { locations } = useLocationStore();
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCurrentLocationInfo, setIsCurrentLocationInfo] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const getDistance = (
    a: { lat: number; lng: number },
    b: { lat: number; lng: number }
  ) => {
    const R = 6371;
    const dLat = ((b.lat - a.lat) * Math.PI) / 180;
    const dLng = ((b.lng - a.lng) * Math.PI) / 180;
    const lat1 = (a.lat * Math.PI) / 180;
    const lat2 = (b.lat * Math.PI) / 180;
    const x = dLng * Math.cos((lat1 + lat2) / 2);
    const y = dLat;
    return Math.sqrt(x * x + y * y) * R;
  };

  const sortedLocations = useMemo(() => {
    if (!userLocation) return locations;
    return [...locations].sort(
      (a, b) => getDistance(userLocation, a) - getDistance(userLocation, b)
    );
  }, [locations, userLocation]);

  const origin = sortedLocations[0];
  const destination =
    sortedLocations.length > 1
      ? sortedLocations[sortedLocations.length - 1]
      : null;
  const waypoints = sortedLocations.slice(1, -1);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  return (
    <APIProvider apiKey={API_KEY}>
      <RouteModal
        isOpen={isRouteModalOpen}
        onOpenChange={(open) => setIsRouteModalOpen(open)}
        origin={origin}
        destination={destination}
        waypoints={waypoints}
      />

      <Map
        style={{ width: "100%", height: "calc(100vh - 56px)" }}
        defaultCenter={userLocation ?? { lat: 41, lng: 29 }}
        defaultZoom={12}
        gestureHandling="greedy"
        disableDefaultUI
      >
        {userLocation && (
          <Marker
            position={userLocation}
            icon={getCurrentLocationIcon()}
            onClick={() => setIsCurrentLocationInfo(true)}
          />
        )}

        {userLocation && isCurrentLocationInfo && (
          <InfoWindow
            position={{
              lat: userLocation?.lat || 41,
              lng: userLocation?.lng || 29,
            }}
            onCloseClick={() => setIsCurrentLocationInfo(false)}
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
              {userLocation?.lat}, {userLocation?.lng}
            </Text>
          </InfoWindow>
        )}

        {sortedLocations?.map((item) => (
          <Marker
            key={item.id}
            position={{ lat: item.lat, lng: item.lng }}
            onClick={() => setSelectedId(item.id)}
            icon={getMarkerIcon(item.color as string)}
          />
        ))}

        {selectedId &&
          (() => {
            const item = locations.find((loc) => loc.id === selectedId);
            if (!item) return null;
            return (
              <InfoWindow
                position={{ lat: item.lat, lng: item.lng }}
                onCloseClick={() => setSelectedId(null)}
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
                <Text color={"black"} fontSize="sm">
                  {item.lat}, {item.lng}
                </Text>
              </InfoWindow>
            );
          })()}

        {origin && destination && (
          <Route
            origin={{ lat: origin.lat, lng: origin.lng }}
            destination={{ lat: destination.lat, lng: destination.lng }}
            waypoints={waypoints.map((w) => ({
              lat: w.lat,
              lng: w.lng,
            }))}
            travelMode="DRIVE"
            color="#000000"
            weight={5}
          />
        )}
      </Map>

      <Box
        position="absolute"
        bottom={10}
        left={0}
        right={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding={4}
      >
        <Button
          size="sm"
          variant="outline"
          color="white"
          bg={"black"}
          border={"none"}
          _hover={{ bg: "white", color: "black" }}
          onClick={() => setIsRouteModalOpen(true)}
        >
          Rota Bilgisini Gör
        </Button>
      </Box>
    </APIProvider>
  );
};

export default DrawRoutePage;
