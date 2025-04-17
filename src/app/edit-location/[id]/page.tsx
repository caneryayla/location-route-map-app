"use client";
import { useLocationStore } from "@/store/useLocationStore";
import {
  APIProvider,
  Map,
  Marker,
  MapMouseEvent,
} from "@vis.gl/react-google-maps";
import { Fragment, useEffect, useState } from "react";
import { toaster } from "@/components/ui/toaster";
import LocationSelectCard from "@/components/card/LocationSelectCard";
import { getMarkerIcon } from "@/utils/getMarkerIcon";
import { useParams, useRouter } from "next/navigation";

const EditLocationPage = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { editLocation, locations } = useLocationStore();
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API ?? "";

  const defaultLat = 41.03968590417347;
  const defaultLng = 29.104650958676174;
  const [isGeoCodeLoading, setIsGeoCodeLoading] = useState(false);
  const [marker, setMarker] = useState<{
    lat: number | null;
    lng: number | null;
    color: string;
    name: string;
  }>({
    lat: null,
    lng: null,
    color: "#000000",
    name: "",
  });

  const handleMapClick = async (event: MapMouseEvent) => {
    const clickedLatLng = event.detail?.latLng;
    if (clickedLatLng) {
      setMarker((prev) => ({
        ...prev,
        lat: clickedLatLng.lat,
        lng: clickedLatLng.lng,
      }));

      try {
        setIsGeoCodeLoading(true);
        const { lat, lng } = clickedLatLng;
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
        );
        const data = await response.json();
        const address = data?.results?.[0]?.formatted_address;

        setMarker((prev) => ({
          ...prev,
          name: address || "",
        }));

        setIsGeoCodeLoading(false);
      } catch {
        setIsGeoCodeLoading(false);
      }
    }
  };

  useEffect(() => {
    const locationValues = locations?.find((loc) => loc?.id === id);

    if (!locationValues) return;

    setMarker({
      lat: locationValues.lat,
      lng: locationValues.lng,
      color: locationValues.color as string,
      name: locationValues.name || "",
    });
  }, [id, locations]);

  const handleSaveMarker = () => {
    editLocation(id, {
      id: id,
      lat: marker.lat as number,
      lng: marker.lng as number,
      color: marker.color,
      name: marker.name,
    });

    toaster.create({
      title: "Başarılı",
      description: "Konum kaydedildi.",
      type: "success",
      duration: 3000,
    });
  };

  const handleGiveUp = () => {
    router.back();
  };

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{
          width: "100vw",
          height: "calc(100vh - 56px)",
        }}
        defaultCenter={{ lat: defaultLat, lng: defaultLng }}
        defaultZoom={10}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        onClick={handleMapClick}
      >
        {marker?.lat && marker?.lng && (
          <Fragment>
            <Marker
              position={{
                lat: marker?.lat as number,
                lng: marker?.lng as number,
              }}
              draggable={false}
              icon={getMarkerIcon(marker.color)}
            />

            <LocationSelectCard
              marker={marker}
              onChange={setMarker}
              onSave={handleSaveMarker}
              onCancel={handleGiveUp}
              isLoading={isGeoCodeLoading}
              label="Konumu Düzenle"
            />
          </Fragment>
        )}
      </Map>
    </APIProvider>
  );
};

export default EditLocationPage;
