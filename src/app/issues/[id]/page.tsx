import Link from "next/link";

export const dynamic = "force-dynamic";

// TODO: fetch the real issue from the db here once backend's connected


// Fake Data for Prototype
const mockIssue = {
  id: "clx1issue001",
  title: "Large pothole on Macquarie St",
  description:
    "There's a deep pothole right in the middle of the northbound lane, near the intersection with George St. It's been growing for a few weeks and a couple of cars have already swerved to avoid it. Could be a hazard for cyclists especially at night.",
  type: "POTHOLE",
  status: "IN_PROGRESS",
  latitude: -33.8708,
  longitude: 151.2073,
  address: "142 Macquarie St, Sydney NSW 2000",
  createdAt: new Date("2026-07-28T09:15:00"),
  reportedBy: { name: "Sarah Chen" },
  assignedTo: { name: "James Whitfield" },
  attachments: [
    { id: "a1", fileName: "pothole-1.jpg", url: "/images/pothole-1.jpg" },
    { id: "a2", fileName: "pothole-2.jpg", url: "/images/pothole-2.jpg" },
  ],
  history: [
    {
      id: "h1",
      status: "REPORTED",
      note: "Issue submitted by resident.",
      createdAt: new Date("2026-07-28T09:15:00"),
      changedBy: { name: "Sarah Chen" },
    },
    {
      id: "h2",
      status: "IN_PROGRESS",
      note: "Assigned to roads maintenance team.",
      createdAt: new Date("2026-08-02T14:30:00"),
      changedBy: { name: "James Whitfield" },
    },
  ],
};

// Keeping colours consistent with the design system
const STATUS_STYLES: Record<string, string> = {
  REPORTED: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  IN_PROGRESS:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  RESOLVED:
    "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  CLOSED: "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-500",
};

//Makes enum values more readable, e.g. "IN_PROGRESS" -> "In Progress"
function formatEnum(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((w) => w[0]!.toUpperCase() + w.slice(1))
    .join(" ");
}

//formats date to a more readable format, e.g. "28 Jul 2026, 9:15 AM"
function formatDate(date: Date) {
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

// This page is for viewing a single issue report. It is currently using mock data, but will eventually fetch the real issue from the database once the backend is connected.
export default function IssuePage() {
  const issue = mockIssue;

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 dark:bg-black">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          ← Back to all reports
        </Link>

        <div className="mt-6 flex items-start justify-between gap-4">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            {issue.title}
          </h1>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[issue.status]}`}
          >
            {formatEnum(issue.status)}
          </span>
        </div>

        <p className="mt-1 text-sm text-zinc-500">
          {formatEnum(issue.type)} · Reported {formatDate(issue.createdAt)}
        </p>

        <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            Description
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {issue.description}
          </p>
        </div>

        <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            Location
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {issue.address}
          </p>
          <div className="mt-3 flex h-40 items-center justify-center rounded-md bg-zinc-100 text-xs text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600">
            Map preview ({issue.latitude}, {issue.longitude})
          </div>
        </div>

        {issue.attachments.length > 0 && (
          <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
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

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Reported by
            </h2>
            <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">
              {issue.reportedBy.name}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Assigned to
            </h2>
            <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">
              {issue.assignedTo ? issue.assignedTo.name : "Unassigned"}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            Status history
          </h2>
          <ul className="mt-4 flex flex-col gap-4">
            {issue.history.map((h, i) => (
              <li key={h.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                  {i < issue.history.length - 1 && (
                    <div className="mt-1 w-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                  )}
                </div>
                <div className="pb-2">
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {formatEnum(h.status)}
                  </p>
                  {h.note && (
                    <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                      {h.note}
                    </p>
                  )}
                  <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-600">
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