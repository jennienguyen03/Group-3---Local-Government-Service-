import Link from "next/link";
import { SignOutButton} from "./SignOutButton";

export default function UserNavbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-brand-navy px-6">
      <Link href="/dashboard" className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded bg-white/10 font-mono text-sm font-medium text-white">
          SC
        </span>
        <span className="text-[15px] font-medium tracking-tight text-white">
          Smart Civic
        </span>
      </Link>

       <SignOutButton/>
    </header>
  );
}