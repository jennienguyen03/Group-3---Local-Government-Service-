"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Leaflet's default marker icons break under Next.js bundling — point them
// at the CDN copies instead so pins actually render.
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type MapIssue = {
  id: string;
  title: string;
  type: string;
  latitude: number;
  longitude: number;
};

type IssueMapProps = {
  issues: MapIssue[];
  center?: [number, number];
  focusedId?: string | null;
};

// Default center: Sydney CBD — adjust to your council's actual area.
const DEFAULT_CENTER: [number, number] = [-33.8688, 151.2093];

function FlyToFocused({
  issue,
}: {
  issue: MapIssue | undefined;
}) {
  const map = useMap();

  useEffect(() => {
    if (issue) {
      map.flyTo([issue.latitude, issue.longitude], 16, { duration: 0.75 });
    }
  }, [issue, map]);

  return null;
}

export default function IssueMap({ issues, center = DEFAULT_CENTER, focusedId }: IssueMapProps) {
  const markerRefs = useRef<Record<string, L.Marker | null>>({});
  const focusedIssue = issues.find((i) => i.id === focusedId);

  useEffect(() => {
    if (focusedId) {
      // Slight delay so flyTo finishes before the popup tries to open
      const timer = setTimeout(() => {
        markerRefs.current[focusedId]?.openPopup();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [focusedId]);

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {focusedId && <FlyToFocused issue={focusedIssue} />}
      {issues.map((issue) => (
        <Marker
          key={issue.id}
          position={[issue.latitude, issue.longitude]}
          ref={(ref) => {
            markerRefs.current[issue.id] = ref;
          }}
        >
          <Popup>
            <p className="font-medium">{issue.title}</p>
            <p className="text-xs text-text-secondary">
              {issue.type.replaceAll("_", " ").toLowerCase()}
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}