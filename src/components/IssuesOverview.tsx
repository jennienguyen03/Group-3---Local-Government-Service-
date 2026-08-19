"use client";

import { useMemo, useState } from "react";
import CategoryPieChart from "./CategoryPieChart";

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

type IssuesOverviewProps = {
  issues: Issue[];
  onViewOnMap: (issueId: string) => void;
};

const CATEGORY_COLORS: Record<string, string> = {
  POTHOLE: "#b4632a",
  GRAFFITI: "#6d5dfc",
  ILLEGAL_DUMPING: "#c2410c",
  DAMAGED_PLAYGROUND_EQUIPMENT: "#1c6e8c",
  BROKEN_STREETLIGHT: "#eab308",
  OVERGROWN_VEGETATION: "#2c7a52",
  WATER_LEAK: "#0ea5e9",
  FOOTPATH_DAMAGE: "#64748b",
  OTHER: "#94a3b8",
};

const STATUS_COLORS: Record<Issue["status"], { text: string; bg: string }> = {
  REPORTED: { text: "var(--status-open)", bg: "var(--status-open-bg)" },
  IN_PROGRESS: { text: "var(--status-progress)", bg: "var(--status-progress-bg)" },
  RESOLVED: { text: "var(--status-resolved)", bg: "var(--status-resolved-bg)" },
  CLOSED: { text: "var(--text-muted)", bg: "var(--border)" },
};

function extractSuburb(address: string | null): string {
  if (!address) return "Unknown";
  const parts = address.split(",").map((p) => p.trim());
  // Common format: "123 Example St, Suburb NSW 2000" -> take the segment before state/postcode
  if (parts.length >= 2) return parts[parts.length - 2] ?? parts[0]!;
  return parts[0]!;
}

function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const days = Math.floor(seconds / 86400);
  if (days >= 1) return `${days}d ago`;
  const hours = Math.floor(seconds / 3600);
  if (hours >= 1) return `${hours}h ago`;
  const minutes = Math.floor(seconds / 60);
  return `${Math.max(minutes, 1)}m ago`;
}

export default function IssuesOverview({ issues, onViewOnMap }: IssuesOverviewProps) {
  const [suburbFilter, setSuburbFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const suburbs = useMemo(() => {
    const set = new Set(issues.map((i) => extractSuburb(i.address)));
    return Array.from(set).sort();
  }, [issues]);

  const categories = useMemo(() => {
    const set = new Set(issues.map((i) => i.type));
    return Array.from(set).sort();
  }, [issues]);

  const filtered = useMemo(() => {
    return issues.filter((i) => {
      const suburbOk =
        suburbFilter === "all" || extractSuburb(i.address) === suburbFilter;
      const categoryOk = categoryFilter === "all" || i.type === categoryFilter;
      return suburbOk && categoryOk;
    });
  }, [issues, suburbFilter, categoryFilter]);

  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const i of filtered) {
      counts[i.type] = (counts[i.type] ?? 0) + 1;
    }
    return Object.entries(counts).map(([type, value]) => ({
      label: type.replaceAll("_", " ").toLowerCase(),
      value,
      color: CATEGORY_COLORS[type] ?? "#94a3b8",
    }));
  }, [filtered]);

  const selectedIssue = filtered.find((i) => i.id === selectedId) ?? null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      {/* Left: filters + issue list */}
      <div className="flex flex-col rounded-xl border border-border bg-surface p-5">
        <h1 className="mb-4 text-base font-medium text-text-primary">
          Issues overview
        </h1>

        {/* Filters */}
        <div className="mb-4 flex flex-wrap gap-3">
          <select
            value={suburbFilter}
            onChange={(e) => setSuburbFilter(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm text-text-primary"
          >
            <option value="all">All suburbs</option>
            {suburbs.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm text-text-primary"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.replaceAll("_", " ").toLowerCase()}
              </option>
            ))}
          </select>

          {(suburbFilter !== "all" || categoryFilter !== "all") && (
            <button
              onClick={() => {
                setSuburbFilter("all");
                setCategoryFilter("all");
              }}
              className="rounded-md px-3 py-2 text-sm text-text-secondary underline hover:text-text-primary"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Issue list */}
        <div className="flex max-h-[420px] flex-col gap-2 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="py-10 text-center text-sm text-text-muted">
              No issues match these filters.
            </p>
          ) : (
            filtered.map((issue) => {
              const colors = STATUS_COLORS[issue.status];
              const isSelected = issue.id === selectedId;
              return (
                <button
                  key={issue.id}
                  onClick={() => setSelectedId(issue.id)}
                  className={`rounded-md border p-3 text-left transition-colors ${
                    isSelected
                      ? "border-brand-accent bg-brand-accent/5"
                      : "border-border bg-background hover:border-brand-accent/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-text-primary">
                      {issue.title}
                    </p>
                    <span
                      className="rounded-full px-2 py-0.5 font-mono text-[10px] font-medium"
                      style={{ color: colors.text, background: colors.bg }}
                    >
                      {issue.status.replaceAll("_", " ")}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">
                    {issue.type.replaceAll("_", " ").toLowerCase()}
                    {issue.address ? ` · ${extractSuburb(issue.address)}` : ""}
                  </p>
                  <p className="mt-1.5 font-mono text-[11px] text-text-muted">
                    {timeAgo(issue.createdAt)}
                  </p>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Right: pie chart by default, issue detail when one is selected */}
      <div className="flex flex-col rounded-xl border border-border bg-surface p-5">
        {selectedIssue ? (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-medium text-text-primary">
                Issue detail
              </h2>
              <button
                onClick={() => setSelectedId(null)}
                className="text-xs text-text-secondary underline hover:text-text-primary"
              >
                Back to breakdown
              </button>
            </div>

            <p className="text-sm font-medium text-text-primary">
              {selectedIssue.title}
            </p>
 <span
              className="mt-2 inline-block w-fit rounded-full px-2.5 py-1 font-mono text-xs font-medium"
              style={{
                color: STATUS_COLORS[selectedIssue.status].text,
                background: STATUS_COLORS[selectedIssue.status].bg,
              }}
            >
              {selectedIssue.status.replaceAll("_", " ")}
            </span>

            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              {selectedIssue.description || "No description provided."}
            </p>

            {selectedIssue.attachments.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-xs font-medium text-text-secondary">
                  Photos ({selectedIssue.attachments.length})
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {selectedIssue.attachments.map((a) => (
                    <img
                      key={a.id}
                      src={a.url}
                      alt={a.fileName}
                      className="aspect-square w-full rounded-md border border-border object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => onViewOnMap(selectedIssue.id)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-brand-navy"
            >
              📍 View on map
            </button>

            <div className="mt-4 space-y-1.5 border-t border-border pt-4 text-xs text-text-muted">
              <p>
                <span className="font-medium text-text-secondary">Category:</span>{" "}
                {selectedIssue.type.replaceAll("_", " ").toLowerCase()}
              </p>
              <p>
                <span className="font-medium text-text-secondary">Location:</span>{" "}
                {selectedIssue.address ?? `${selectedIssue.latitude.toFixed(4)}, ${selectedIssue.longitude.toFixed(4)}`}
              </p>
              <p>
                <span className="font-medium text-text-secondary">Reported:</span>{" "}
                {timeAgo(selectedIssue.createdAt)}
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-4 text-base font-medium text-text-primary">
              Category breakdown
            </h2>
            {chartData.length === 0 ? (
              <p className="py-10 text-center text-sm text-text-muted">
                No issues to chart yet.
              </p>
            ) : (
              <CategoryPieChart data={chartData} />
            )}
            <p className="mt-4 text-center text-xs text-text-muted">
              Select an issue on the left to see its details here.
            </p>
          </>
        )}
      </div>
    </div>
  );
}