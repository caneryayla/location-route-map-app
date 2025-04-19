"use client";

import { Fragment } from "react";
import {
  APIProvider,
  Map,
  Marker,
  MapMouseEvent,
} from "@vis.gl/react-google-maps";
import { v4 as uuidv4 } from "uuid";
import { useLocationStore } from "@/store/useLocationStore";
import { getMarkerIcon } from "@/utils/getMarkerIcon";
import LocationSelectCard from "@/components/card/LocationSelectCard";
import { toaster } from "@/components/ui/toaster";
import useMarkerState from "@/hooks/useMarkerState";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API ?? "";
const DEFAULT_LOCATION = { lat: 41.03968590417347, lng: 29.104650958676174 };

const AddLocationPage = () => {
  const {
    marker,
    setMarker,
    resetMarker,
    isGeoCodeLoading,
    setAddressByLatLng,
  } = useMarkerState();
  const { addLocation } = useLocationStore();

  const handleMapClick = async (event: MapMouseEvent) => {
    const clickedLatLng = event.detail?.latLng;
    if (clickedLatLng) {
      setMarker({
        ...marker,
        lat: clickedLatLng.lat,
        lng: clickedLatLng.lng,
      });

      await setAddressByLatLng(clickedLatLng.lat, clickedLatLng.lng);
    }
  };

  const handleSaveMarker = () => {
    addLocation({
      id: uuidv4(),
      lat: marker.lat ?? 0,
      lng: marker.lng ?? 0,
      color: marker.color,
      name: marker.name || "Konum",
    });

    toaster.create({
      title: "Başarılı",
      description: "Konum kaydedildi.",
      type: "success",
      duration: 1500,
    });
  };

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{ width: "100vw", height: "calc(100vh - 56px)" }}
        defaultCenter={DEFAULT_LOCATION}
        defaultZoom={10}
        gestureHandling="greedy"
        disableDefaultUI
        onClick={handleMapClick}
      >
        {marker.lat && marker.lng && (
          <Fragment>
            <Marker
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={getMarkerIcon(marker.color)}
              draggable={false}
            />
            <LocationSelectCard
              marker={marker}
              onChange={setMarker}
              onSave={handleSaveMarker}
              onCancel={resetMarker}
              isLoading={isGeoCodeLoading}
            />
          </Fragment>
        )}
      </Map>
    </APIProvider>
  );
};

export default AddLocationPage;
