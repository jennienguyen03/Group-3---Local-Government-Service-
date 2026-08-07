"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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
};

// Default center: Sydney CBD — adjust to your council's actual area.
const DEFAULT_CENTER: [number, number] = [-33.8688, 151.2093];

export default function IssueMap({ issues, center = DEFAULT_CENTER }: IssueMapProps) {
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
      {issues.map((issue) => (
        <Marker key={issue.id} position={[issue.latitude, issue.longitude]}>
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