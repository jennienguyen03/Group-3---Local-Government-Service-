import Link from "next/link";
import { db } from "~/server/db";
import UserNavbar from "~/components/UserNavbar";
import MyReportsList from "~/components/MyReportsList";
import SupportPanel from "~/components/SupportPanel";
import MapSection from "~/components/MapSection";

export const dynamic = "force-dynamic";

export default async function ResidentDashboard() {
  // TODO: once auth is added, filter by the signed-in resident's id
  // (e.g. where: { reportedById: session.user.id })
  const reports = await db.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  const mapIssues = await db.issue.findMany({
    select: { id: true, title: true, type: true, latitude: true, longitude: true },
    take: 100,
  });

  return (
    <div className="flex min-h-screen flex-col">
      <UserNavbar />

      <main className="flex flex-1 gap-6 p-6">
        {/* Left panel */}
        <section className="flex flex-[2] flex-col gap-6">

          {/* My reports */}
          <div className="flex flex-1 flex-col rounded-xl border border-border bg-surface p-5">

            {/* Header row */}
            <div className="mb-5 flex items-center justify-between">
              <h1 className="text-3xl font-semibold text-text-primary">
                My Reports
              </h1>

              <Link
                href="/report"
                className="rounded-md bg-brand-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-accent/90"
              >
                + Report an issue
              </Link>
            </div>

            <MyReportsList reports={reports} />
          </div>

          {/* Support */}
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="mb-3 text-base font-medium text-text-primary">
              Support
            </h2>
            <SupportPanel />
          </div>

        </section>

        {/* Right panel: map */}
        <aside className="flex w-96 flex-col rounded-xl border border-border bg-surface p-5">
          <h2 className="mb-4 text-base font-medium text-text-primary">
            Reported issues near you
          </h2>
          <div className="flex-1 overflow-hidden rounded-lg">
            <MapSection issues={mapIssues} />
          </div>
        </aside>
      </main>
    </div>
  );
}