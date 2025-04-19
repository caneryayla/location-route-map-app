"use client";

import { Fragment, useEffect } from "react";
import {
  APIProvider,
  Map,
  Marker,
  MapMouseEvent,
} from "@vis.gl/react-google-maps";
import { useRouter, useParams } from "next/navigation";
import { useLocationStore } from "@/store/useLocationStore";
import { toaster } from "@/components/ui/toaster";
import LocationSelectCard from "@/components/card/LocationSelectCard";
import { getMarkerIcon } from "@/utils/getMarkerIcon";
import useMarkerState from "@/hooks/useMarkerState";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API ?? "";
const DEFAULT_LOCATION = { lat: 41.03968590417347, lng: 29.104650958676174 };

const EditLocationPage = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { locations, editLocation } = useLocationStore();

  const {
    marker,
    setMarker,
    resetMarker,
    isGeoCodeLoading,
    setAddressByLatLng,
  } = useMarkerState();

  useEffect(() => {
    const locationValues = locations.find((loc) => loc.id === id);
    if (locationValues) {
      setMarker({
        lat: locationValues.lat,
        lng: locationValues.lng,
        color: locationValues.color || "#000000",
        name: locationValues.name || "Konum",
      });
    }
  }, [id, locations, setMarker]);

  const handleMapClick = async (event: MapMouseEvent) => {
    const clickedLatLng = event.detail?.latLng;
    if (!clickedLatLng) return;

    setMarker({
      ...marker,
      lat: clickedLatLng.lat,
      lng: clickedLatLng.lng,
    });

    await setAddressByLatLng(clickedLatLng.lat, clickedLatLng.lng);
  };

  const handleSaveMarker = () => {
    editLocation(id, {
      id,
      lat: marker.lat ?? 0,
      lng: marker.lng ?? 0,
      color: marker.color,
      name: marker.name,
    });

    toaster.create({
      title: "Başarılı",
      description: "Konum güncellendi.",
      type: "success",
      duration: 1500,
    });
  };

  const handleCancel = () => {
    resetMarker();
    router.back();
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
            />
            <LocationSelectCard
              marker={marker}
              onChange={setMarker}
              onSave={handleSaveMarker}
              onCancel={handleCancel}
              isLoading={isGeoCodeLoading}
              label="Konumu Düzenle"
              saveButtonLabel="Güncelle"
              cancelButtonLabel="İptal"
            />
          </Fragment>
        )}
      </Map>
    </APIProvider>
  );
};

export default EditLocationPage;
