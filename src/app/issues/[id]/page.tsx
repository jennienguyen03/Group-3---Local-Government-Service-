import Link from "next/link";
import { db } from "~/server/db";
import MapSection from "~/components/MapSection";

export const dynamic = "force-dynamic";

// colors for each status badge, matches MyReportsLists status styling
const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  REPORTED: { bg: "bg-status-open-bg", text: "text-status-open", label: "Reported" },
  IN_PROGRESS: { bg: "bg-status-progress-bg", text: "text-status-progress", label: "In progress" },
  RESOLVED: { bg: "bg-status-resolved-bg", text: "text-status-resolved", label: "Resolved" },
  CLOSED: { bg: "bg-border", text: "text-text-secondary", label: "Closed" },
};

// turns "IN_PROGRESS" into "In Progress" so it's readable on the page
function formatEnum(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((w) => w[0]!.toUpperCase() + w.slice(1))
    .join(" ");
}

// formats a date into something readable, like "28 Jul 2026, 9:15 am"
function formatDate(date: Date) {
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

// main page component, shows all the details for one issue
export default async function IssuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const issue = await db.issue.findUnique({
    where: { id },
    include: {
      reportedBy: true,
      assignedTo: true,
      attachments: true,
      history: {
        orderBy: { createdAt: "asc" },
        include: { changedBy: true },
      },
    },
  });

  // no issue found with this id
  if (!issue) {
    return (
      <main className="min-h-screen bg-background px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm text-text-secondary">
            This issue couldn&apos;t be found.
          </p>
          <Link
            href="/dashboard"
            className="mt-4 inline-block text-sm font-medium text-brand-accent hover:underline"
          >
            ← Back to dashboard
          </Link>
        </div>
      </main>
    );
  }

  // other issues nearby shown on the map alongside this one
  const mapIssues = await db.issue.findMany({
    select: { id: true, title: true, type: true, latitude: true, longitude: true },
    take: 100,
  });

  const status = STATUS_STYLES[issue.status];

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/dashboard"
          className="text-sm text-text-secondary hover:text-text-primary"
        >
          ← Back to dashboard
        </Link>

        <div className="mt-6 flex items-start justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
            {issue.title}
          </h1>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${status?.bg} ${status?.text}`}
          >
            {status?.label ?? formatEnum(issue.status)}
          </span>
        </div>

        <p className="mt-1 text-sm text-text-secondary">
          {formatEnum(issue.type)} · Reported {formatDate(issue.createdAt)}
        </p>

        {/* Description */}
        <div className="mt-8 rounded-lg border border-border bg-surface p-6">
          <h2 className="text-sm font-medium text-text-primary">
            Description
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {issue.description}
          </p>
        </div>

        {/* Location */}
        <div className="mt-4 rounded-lg border border-border bg-surface p-6">
          <h2 className="text-sm font-medium text-text-primary">
            Location
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            {issue.address ?? "No address provided"}
          </p>
          <div className="mt-3 h-64 overflow-hidden rounded-md">
            <MapSection issues={mapIssues} focusedId={issue.id} />
          </div>
        </div>

        {/* Photos */}
        {issue.attachments.length > 0 && (
          <div className="mt-4 rounded-lg border border-border bg-surface p-6">
            <h2 className="text-sm font-medium text-text-primary">
              Photos ({issue.attachments.length})
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {issue.attachments.map((a) => (
                <img
                  key={a.id}
                  src={a.url}
                  alt={a.fileName}
                  className="aspect-square rounded-md object-cover"
                />
              ))}
            </div>
          </div>
        )}

        {/* Reported by / assigned to */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="text-xs font-medium text-text-muted">
              Reported by
            </h2>
            <p className="mt-1 text-sm text-text-primary">
              {issue.reportedBy.name}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="text-xs font-medium text-text-muted">
              Assigned to
            </h2>
            <p className="mt-1 text-sm text-text-primary">
              {issue.assignedTo ? issue.assignedTo.name : "Unassigned"}
            </p>
          </div>
        </div>

        {/* Status history */}
        <div className="mt-4 rounded-lg border border-border bg-surface p-6">
          <h2 className="text-sm font-medium text-text-primary">
            Status history
          </h2>
          <ul className="mt-4 flex flex-col gap-4">
            {issue.history.map((h, i) => (
              <li key={h.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand-accent" />
                  {i < issue.history.length - 1 && (
                    <div className="mt-1 w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="pb-2">
                  <p className="text-sm font-medium text-text-primary">
                    {formatEnum(h.status)}
                  </p>
                  {h.note && (
                    <p className="mt-0.5 text-sm text-text-secondary">
                      {h.note}
                    </p>
                  )}
                  <p className="mt-0.5 text-xs text-text-muted">
                    {formatDate(h.createdAt)} · {h.changedBy.name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}