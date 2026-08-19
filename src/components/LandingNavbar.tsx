import Link from "next/link";

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-20 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-navy text-sm font-semibold text-white">
            SC
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-text-primary">
            Smart Civic
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-md px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-brand-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1c3a5c]"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}