import Link from "next/link";
import { db } from "~/server/db";
import { auth } from "~/server/auth/config";
import UserNavbar from "~/components/UserNavbar";
import MyReportsList from "~/components/MyReportsList";
import SupportPanel from "~/components/SupportPanel";
import MapSection from "~/components/MapSection";

export const dynamic = "force-dynamic";

export default async function ResidentDashboard() {
  const session = await auth();

  // TODO: filter by the signed-in resident's id once reports are linked to accounts
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
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-sky-100 via-purple-100 to-pink-100">
      <UserNavbar name={session?.user?.name} />

      <main className="flex flex-1 gap-6 p-6">
        {/* Left panel */}
        <section className="flex flex-[2] flex-col gap-6">
          {/* Report an issue */}
          <Link
            href="/report"
            className="flex items-center justify-center rounded-xl bg-brand-accent px-5 py-4 text-sm font-medium text-white transition-colors hover:bg-brand-accent/90"
          >
            + Report an issue
          </Link>

          {/* My reports */}
          <div className="flex flex-1 flex-col rounded-xl border border-border bg-surface p-5">
            <h1 className="mb-4 text-base font-medium text-text-primary">
              My reports
            </h1>
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