import Link from "next/link";

export default function AdminNavbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-brand-navy px-6">
      <Link href="/admin" className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded bg-white/10 font-mono text-sm font-medium text-white">
          SC
        </span>
        <span className="text-[15px] font-medium tracking-tight text-white">
          Admin Dashboard
        </span>
      </Link>

      <form action="/api/auth/logout" method="post">
        <button
          type="submit"
          className="rounded border border-white/20 px-4 py-1.5 text-sm text-white/90 transition-colors hover:bg-white/10"
        >
          Sign out
        </button>
      </form>
    </header>
  );
}