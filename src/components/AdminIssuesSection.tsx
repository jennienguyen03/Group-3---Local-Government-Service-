"use client";

import { useState } from "react";
import IssuesOverview from "./IssuesOverview";
import MapSection from "./MapSection";

type Issue = {
  id: string;
  title: string;
  description: string;
  type: string;
  status: "REPORTED" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  address: string | null;
  latitude: number;
  longitude: number;
  createdAt: Date;
  attachments: { id: string; fileName: string; url: string }[];
};

type MapIssue = {
  id: string;
  title: string;
  type: string;
  latitude: number;
  longitude: number;
};

export default function AdminIssuesSection({
  issues,
  mapIssues,
}: {
  issues: Issue[];
  mapIssues: MapIssue[];
}) {
  const [focusedId, setFocusedId] = useState<string | null>(null);

  function handleViewOnMap(issueId: string) {
    setFocusedId(issueId);
    document
      .getElementById("reported-issues-map")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <IssuesOverview issues={issues} onViewOnMap={handleViewOnMap} />

      <section id="reported-issues-map" className="mt-6 h-80 rounded-xl border border-border bg-surface p-5">
        <h2 className="mb-4 text-base font-medium text-text-primary">
          Reported issues map
        </h2>
        <div className="h-56 overflow-hidden rounded-lg">
          <MapSection issues={mapIssues} focusedId={focusedId} />
        </div>
      </section>
    </>
  );
}