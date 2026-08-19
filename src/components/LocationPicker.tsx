"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Fix default marker icons (same approach as IssueMap)
const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const DEFAULT_CENTER: [number, number] = [-33.8688, 151.2093]; // Sydney

type LocationPickerProps = {
  value: { lat: number; lng: number } | null;
  onChange: (coords: { lat: number; lng: number }) => void;
};

function ClickHandler({ onChange }: { onChange: LocationPickerProps["onChange"] }) {
  useMapEvents({
    click(e) {
      onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

export default function LocationPicker({ value, onChange }: LocationPickerProps) {
  const [center] = useState<[number, number]>(
    value ? [value.lat, value.lng] : DEFAULT_CENTER,
  );

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="h-full w-full"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler onChange={onChange} />
      {value && <Marker position={[value.lat, value.lng]} icon={markerIcon} />}
    </MapContainer>
  );
}