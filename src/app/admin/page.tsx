import { db } from "~/server/db";
import { auth } from "~/server/auth/config";
import AdminNavbar from "~/components/AdminNavbar";
import IssuesOverview from "~/components/IssuesOverview";
import MapSection from "~/components/MapSection";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await auth();

  const [issues, mapIssues] = await Promise.all([
    db.issue.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        status: true,
        address: true,
        latitude: true,
        longitude: true,
        createdAt: true,
      },
    }),
    db.issue.findMany({
      select: { id: true, title: true, type: true, latitude: true, longitude: true },
      take: 200,
    }),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100">
      <AdminNavbar name={session?.user?.name} />

      <main className="p-6">
        <IssuesOverview issues={issues} />

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