import React, { useCallback } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 24.662898933839585, // Default lat (e.g., Dubai)
  lng: 46.72015157531366,
};

type GoogleMapPickerProps = {
  onLocationSelect: (lat: number, lng: number) => void;
  initialLocation?: { lat: number; lng: number };
  setMarker: (marker: { lat: number; lng: number }) => void;
  marker: { lat: number; lng: number };
};

const GoogleMapPicker: React.FC<GoogleMapPickerProps> = ({
  onLocationSelect,
  initialLocation = center,
  setMarker,
  marker = initialLocation,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_API_ROOT_GOOGLE_MAPS_KEY, // Replace with your real key
  });

  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      const lat = e.latLng?.lat();
      const lng = e.latLng?.lng();
      if (lat && lng) {
        setMarker({ lat, lng });
        onLocationSelect(lat, lng);
      }
    },
    [onLocationSelect]
  );

  if (!isLoaded) return <p>Loading...</p>;
  console.log(marker);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={marker}
      zoom={14}
      clickableIcons
      onClick={handleMapClick}
    >
      <Marker position={marker} />
    </GoogleMap>
  );
};

export default GoogleMapPicker;
