"use client";

import React, { Fragment, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useLocationStore } from "@/store/useLocationStore";
import { Box, Button } from "@chakra-ui/react";
import RouteModal from "@/components/modal/RouteModal";
import useUserLocation from "@/hooks/useUserLocation";
import useSortedLocations from "@/hooks/useSortedLocations";
import UserMarker from "@/components/map/UserMarker";
import CurrentLocationInfoWindow from "@/components/map/CurrentLocationInfoWindow";
import LocationMarker from "@/components/map/LocationMarker";
import SelectedLocationInfoWindow from "@/components/map/SelectedLocationInfoWindow";
import DrawRoute from "@/components/map/DrawRoute";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string;

const DrawRoutePage = () => {
  const { locations } = useLocationStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCurrentLocationInfo, setIsCurrentLocationInfo] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);

  const userLocation = useUserLocation();
  const sortedLocations = useSortedLocations(locations, userLocation);

  const origin = sortedLocations[0];
  const destination = sortedLocations.at(-1);
  const waypoints = sortedLocations.slice(1, -1);

  return (
    <APIProvider apiKey={API_KEY}>
      <RouteModal
        isOpen={isRouteModalOpen}
        onOpenChange={setIsRouteModalOpen}
        origin={origin}
        destination={destination ?? null}
        waypoints={waypoints}
      />

      <Map
        style={{ width: "100%", height: "calc(100vh - 56px)" }}
        defaultCenter={userLocation ?? { lat: 41, lng: 29 }}
        defaultZoom={12}
        gestureHandling="cooperative"
        disableDefaultUI={false}
        mapId="draw-route-map"
      >
        {userLocation && (
          <Fragment>
            <UserMarker
              location={userLocation}
              onClick={() => setIsCurrentLocationInfo(true)}
            />
            {isCurrentLocationInfo && (
              <CurrentLocationInfoWindow
                location={userLocation}
                onClose={() => setIsCurrentLocationInfo(false)}
              />
            )}
          </Fragment>
        )}

        {sortedLocations.map((item) => (
          <LocationMarker
            key={item.id}
            item={item}
            onClick={() => setSelectedId(item.id)}
          />
        ))}

        {selectedId && (
          <SelectedLocationInfoWindow
            item={locations.find((loc) => loc.id === selectedId)!}
            onClose={() => setSelectedId(null)}
          />
        )}

        {origin && destination && (
          <DrawRoute
            origin={origin}
            destination={destination}
            waypoints={waypoints}
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
        padding={4}
      >
        <Button
          size="sm"
          variant="outline"
          bg="black"
          color="white"
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
