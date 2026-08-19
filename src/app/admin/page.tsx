import { db } from "~/server/db";
import { auth } from "~/server/auth/config";
import AdminNavbar from "~/components/AdminNavbar";
import AdminIssuesSection from "~/components/AdminIssuesSection";

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
        attachments: {
          select: { id: true, fileName: true, url: true },
        },
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
        <AdminIssuesSection issues={issues} mapIssues={mapIssues} />
      </main>
    </div>
  );
}