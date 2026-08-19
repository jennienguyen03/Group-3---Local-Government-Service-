import Link from "next/link";
import { SignOutButton} from "./SignOutButton";

type AdminNavbarProps = {
  name?: string | null;
};

export default function AdminNavbar({ name }: AdminNavbarProps) {
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

      <div className="flex items-center gap-4">
        {name && (
          <span className="text-sm text-white/80">
            Welcome, <span className="font-medium text-white">{name}</span>
          </span>
        )}
        <SignOutButton />
      </div>
    </header>
  );
}