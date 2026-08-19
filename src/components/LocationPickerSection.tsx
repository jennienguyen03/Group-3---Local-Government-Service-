"use client";

import dynamic from "next/dynamic";

const LocationPicker = dynamic(() => import("./LocationPicker"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-sm text-neutral-400 dark:bg-neutral-800">
      Loading map…
    </div>
  ),
});

type LocationPickerSectionProps = {
  value: { lat: number; lng: number } | null;
  onChange: (coords: { lat: number; lng: number }) => void;
};

export default function LocationPickerSection(props: LocationPickerSectionProps) {
  return <LocationPicker {...props} />;
}