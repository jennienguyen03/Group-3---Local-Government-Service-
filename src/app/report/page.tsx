"use client";

import React from "react";
import { useRouter } from "next/navigation";
import UserNavbar from "~/components/UserNavbar";
import { createReport } from "./actions";
import LocationPickerSection from "~/components/LocationPickerSection";

const CATEGORIES = [
  { value: "POTHOLE", label: "Pothole" },
  { value: "GRAFFITI", label: "Graffiti" },
  { value: "ILLEGAL_DUMPING", label: "Illegal dumping" },
  { value: "DAMAGED_PLAYGROUND_EQUIPMENT", label: "Playground damage" },
  { value: "BROKEN_STREETLIGHT", label: "Broken streetlight" },
  { value: "OVERGROWN_VEGETATION", label: "Overgrown vegetation" },
  { value: "WATER_LEAK", label: "Water leak" },
  { value: "FOOTPATH_DAMAGE", label: "Footpath damage" },
  { value: "OTHER", label: "Other" },
];

const MAX_PHOTOS = 4;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Report() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100">
      <UserNavbar />

      <main className="p-6">
        <button
          onClick={() => router.back()}
          className="
            mb-4 rounded-md border border-neutral-300 dark:border-neutral-700
            px-4 py-2 text-sm bg-white dark:bg-neutral-900
            text-neutral-900 dark:text-neutral-100
            hover:bg-neutral-100 dark:hover:bg-neutral-800 transition
          "
        >
          ← Back
        </button>

        <div className="flex justify-center">
          <AddIssues />
        </div>
      </main>

      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="
          fixed bottom-6 right-6 rounded-full bg-neutral-800 text-white
          w-10 h-10 hover:bg-neutral-700 transition shadow-md
          text-neutral-900 dark:text-neutral-100
        "
      >
        ↑
      </button>
    </div>
  );
}

function AddIssues() {
  const router = useRouter();

  const [form, setForm] = React.useState({
    title: "",
    category: "",
    description: "",
    address: "",
  });

  const [coords, setCoords] = React.useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = React.useState(false);
  const [photos, setPhotos] = React.useState<{ fileName: string; dataUrl: string }[]>([]);
  const [error, setError] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  function handleUseLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation isn't supported on this browser. You can still enter an address instead.");
      return;
    }
    setLocating(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocating(false);
      },
      (err) => {
        console.error("Geolocation error:", err.code, err.message);
        setError("Couldn't get your location — you can enter an address instead.");
        setLocating(false);
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 },
    );
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setError("");

    if (photos.length + files.length > MAX_PHOTOS) {
      setError(`You can attach up to ${MAX_PHOTOS} photos.`);
      return;
    }

    const oversized = files.find((f) => f.size > MAX_FILE_SIZE);
    if (oversized) {
      setError(`"${oversized.name}" is too large. Max size is 5MB per photo.`);
      return;
    }

    try {
      const newPhotos = await Promise.all(
        files.map(async (file) => ({
          fileName: file.name,
          dataUrl: await fileToDataUrl(file),
        })),
      );
      setPhotos((prev) => [...prev, ...newPhotos]);
    } catch {
      setError("Couldn't read one of the selected files. Please try again.");
    }

    e.target.value = "";
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    if (!form.address.trim() && !coords) {
      setError("Please enter an address or use your location.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await createReport({
        title: form.title,
        type: form.category,
        description: form.description,
        address: form.address,
        latitude: coords?.lat ?? null,
        longitude: coords?.lng ?? null,
        photos,
      });

      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex flex-col gap-4
        max-w-lg w-full
        p-6
        rounded-lg
        border border-neutral-300 dark:border-neutral-700
        bg-white dark:bg-neutral-900
        text-neutral-900 dark:text-neutral-100
      "
    >
      <h1 className="text-xl font-semibold">Report an Issue</h1>

      <label htmlFor="title" className="text-sm font-medium">
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
        className="
          p-2 border border-neutral-300 dark:border-neutral-700
          rounded-md bg-white dark:bg-neutral-800
          text-neutral-900 dark:text-neutral-100
        "
      />

      <label htmlFor="category" className="text-sm font-medium">
        Category
      </label>
      <select
        id="category"
        name="category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        required
        className="
          p-2 border border-neutral-300 dark:border-neutral-700
          rounded-md bg-white dark:bg-neutral-800
          text-neutral-900 dark:text-neutral-100
        "
      >
        <option value="">Select a category</option>
        {CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      <label htmlFor="description" className="text-sm font-medium">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="
          p-2 border border-neutral-300 dark:border-neutral-700
          rounded-md bg-white dark:bg-neutral-800
          text-neutral-900 dark:text-neutral-100
          min-h-[80px]
        "
      />

      <label htmlFor="address" className="text-sm font-medium">
        Address
      </label>
      <input
        type="text"
        id="address"
        name="address"
        placeholder="e.g. 142 Macquarie St, Sydney NSW 2000"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        className="
          p-2 border border-neutral-300 dark:border-neutral-700
          rounded-md bg-white dark:bg-neutral-800
          text-neutral-900 dark:text-neutral-100
        "
      />

  <label className="text-sm font-medium">
        Pin the location on the map
      </label>
      <div className="h-64 w-full overflow-hidden rounded-md border border-neutral-300 dark:border-neutral-700">
        <LocationPickerSection value={coords} onChange={setCoords} />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleUseLocation}
          disabled={locating}
          className="
            text-sm
            text-neutral-600 dark:text-neutral-400
            underline
            hover:text-neutral-900 dark:hover:text-white
            disabled:opacity-50
            text-neutral-900 dark:text-neutral-100
          "
        >
          {locating ? "Locating…" : "📍 Use my current location instead"}
        </button>
        {coords && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
          </p>
        )}
      </div>

      <label htmlFor="photos" className="text-sm font-medium">
        Photos (optional, up to {MAX_PHOTOS})
      </label>
      <input
        type="file"
        id="photos"
        name="photos"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="
          text-sm
          file:mr-3 file:rounded-md file:border-0
          file:bg-neutral-800 file:px-3 file:py-2
          file:text-sm file:text-white
          hover:file:bg-neutral-700
          text-neutral-900 dark:text-neutral-100
        "
      />

      {photos.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {photos.map((photo, i) => (
            <div key={i} className="relative">
              <img
                src={photo.dataUrl}
                alt={photo.fileName}
                className="aspect-square w-full rounded-md object-cover"
              />
              <button
                type="button"
                onClick={() => removePhoto(i)}
                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-xs text-white"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="
          p-2
          bg-neutral-800
          text-white
          rounded-md
          hover:bg-neutral-700
          transition
          disabled:opacity-50
          text-neutral-900 dark:text-neutral-100
        "
      >
        {submitting ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}