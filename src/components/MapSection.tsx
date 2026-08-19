"use client";

import dynamic from "next/dynamic";

const IssueMap = dynamic(() => import("./IssueMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-lg bg-background text-sm text-text-muted">
      Loading map...
    </div>
  ),
});

type MapIssue = {
  id: string;
  title: string;
  type: string;
  latitude: number;
  longitude: number;
};

export default function MapSection({
  issues,
  focusedId,
}: {
  issues: MapIssue[];
  focusedId?: string | null;
}) {
  return <IssueMap issues={issues} focusedId={focusedId} />;
}