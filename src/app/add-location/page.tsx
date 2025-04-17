"use client";
import { useLocationStore } from "@/store/useLocationStore";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toaster } from "@/components/ui/toaster";
import LocationSelectCard from "@/components/card/LocationSelectCard";
import { getMarkerIcon } from "@/utils/getMarkerIcon";

const AddLocationPage = () => {
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

  const { addLocation } = useLocationStore();

  const handleMapClick = async (event: any) => {
    const clickedLatLng = event.detail?.latLng;
    if (clickedLatLng) {
      setMarker((prev: any) => ({
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
      } catch (error) {
        setIsGeoCodeLoading(false);
      }
    }
  };

  const handleSaveMarker = () => {
    addLocation({
      id: uuidv4(),
      lat: marker?.lat || 0,
      lng: marker?.lng || 0,
      color: marker?.color || "#000000",
      name: marker?.name || "Location",
    });

    toaster.create({
      title: "Başarılı",
      description: "Konum kaydedildi.",
      type: "success",
      duration: 3000,
    });
  };

  const handleGiveUp = () => {
    setMarker({
      lat: null,
      lng: null,
      color: "#000000",
      name: "",
    });
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
            />
          </Fragment>
        )}
      </Map>
    </APIProvider>
  );
};

export default AddLocationPage;
