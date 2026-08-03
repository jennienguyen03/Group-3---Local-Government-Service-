import { db } from "~/server/db";
import { LoginForm } from "./components/loginForm";
export const dynamic = "force-dynamic";

export default async function Home() {
  const issues = await db.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 dark:bg-black">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
          Login
        </h1>
        <LoginForm />
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Local Government Service Request Portal
        </p>

        <div className="mt-10">
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
            Recent reports ({issues.length})
          </h2>

          {issues.length === 0 ? (
            <p className="mt-4 text-zinc-500">
              No issues reported yet. Once your database is connected and
              seeded, they will show up here.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {issues.map((issue) => (
                <li
                  key={issue.id}
                  className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">
                      {issue.title}
                    </span>
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      {issue.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-500">
                    {issue.type} · {issue.address ?? `${issue.latitude}, ${issue.longitude}`}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
