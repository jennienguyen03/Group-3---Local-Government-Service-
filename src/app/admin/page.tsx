import Link from "next/link";
import { db } from "~/server/db";
import AdminNavbar from "~/components/AdminNavbar";
import StatusColumn from "~/components/StatusColumn";
import StatusChart from "~/components/StatusChart";
import MapSection from "~/components/MapSection";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [openIssues, progressIssues, resolvedIssues, openCount, progressCount, resolvedCount, mapIssues] =
    await Promise.all([
      db.issue.findMany({ where: { status: "REPORTED" }, orderBy: { createdAt: "desc" }, take: 8 }),
      db.issue.findMany({ where: { status: "IN_PROGRESS" }, orderBy: { createdAt: "desc" }, take: 8 }),
      db.issue.findMany({ where: { status: "RESOLVED" }, orderBy: { createdAt: "desc" }, take: 8 }),
      db.issue.count({ where: { status: "REPORTED" } }),
      db.issue.count({ where: { status: "IN_PROGRESS" } }),
      db.issue.count({ where: { status: "RESOLVED" } }),
      db.issue.findMany({
        select: { id: true, title: true, type: true, latitude: true, longitude: true },
        take: 200,
      }),
    ]);

  return (
    <div className="min-h-screen">
      <AdminNavbar />

      <main className="p-6">
        <div className="flex h-[500px] gap-6">
          {/* Left panel: issues overview */}
          <section className="flex flex-[2] flex-col rounded-xl border border-border bg-surface p-5">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-base font-medium text-text-primary">
                Issues overview
              </h1>
              <Link
                href="/report"
                className="rounded-md bg-brand-accent px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-accent/90"
              >
                + Add Issue
              </Link>
            </div>

            <div className="flex flex-1 gap-4">
              <StatusColumn
                label="Open"
                count={openCount}
                colorVar="status-open"
                issues={openIssues}
              />
              <StatusColumn
                label="In progress"
                count={progressCount}
                colorVar="status-progress"
                issues={progressIssues}
              />
              <StatusColumn
                label="Resolved"
                count={resolvedCount}
                colorVar="status-resolved"
                issues={resolvedIssues}
              />
            </div>
          </section>

          {/* Right panel: chart */}
          <aside className="flex w-72 flex-col rounded-xl border border-border bg-surface p-5">
            <h2 className="mb-4 text-base font-medium text-text-primary">
              Status Analytics
            </h2>
            <StatusChart
              open={openCount}
              inProgress={progressCount}
              resolved={resolvedCount}
            />
          </aside>
        </div>

        {/* Bottom: map of all reported issues */}
        <section className="mt-6 h-80 rounded-xl border border-border bg-surface p-5">
          <h2 className="mb-4 text-base font-medium text-text-primary">
            Reported issues map
          </h2>
          <div className="h-56 overflow-hidden rounded-lg">
            <MapSection issues={mapIssues} />
          </div>
        </section>
      </main>
    </div>
  );
}