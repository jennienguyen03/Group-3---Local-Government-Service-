import Link from "next/link";
import { LandingNavbar } from "~/components/LandingNavbar";

const EXAMPLE_TICKETS = [
  {
    id: "A1F92C",
    title: "Pothole on Church Street",
    meta: "pothole · near Church St & 5th Ave",
    status: "IN_PROGRESS" as const,
  },
  {
    id: "7E3D01",
    title: "Broken streetlight",
    meta: "broken streetlight · Riverside Park",
    status: "RESOLVED" as const,
  },
];

function statusStyle(status: "REPORTED" | "IN_PROGRESS" | "RESOLVED") {
  if (status === "RESOLVED") {
    return { color: "var(--status-resolved)", background: "var(--status-resolved-bg)" };
  }
  if (status === "IN_PROGRESS") {
    return { color: "var(--status-progress)", background: "var(--status-progress-bg)" };
  }
  return { color: "var(--status-open)", background: "var(--status-open-bg)" };
}

export default function Home() {
  return (
    <>
      <LandingNavbar />

      <main className="flex-1 bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100">
        {/* Hero */}
        <section className="relative overflow-hidden">
          {/* Decorative map background, dark + low opacity */}
          <div className="pointer-none absolute inset-0 z-0 overflow-hidden">
            <iframe
              title="background map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=150.9%2C-33.95%2C151.3%2C-33.75&layer=mapnik"
              className="h-full w-full opacity-70"
              scrolling="no"
              tabIndex={-1}
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-20 md:grid-cols-[1.1fr_0.9fr] md:pt-24 min-h-screen items-center">
            <div>
              <span className="block text-lg font-bold uppercase tracking-wide text-white sm:text-xl">
                Local Government Service Requests
              </span>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl">
                See something broken?
                <br />
                Report it in minutes.
              </h1>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/80">
                Potholes, graffiti, broken streetlights, illegal dumping — flag
                it on a map and track it through to resolved. Council sees it
                the moment you submit.
              </p>

              {/* Sign-in prompt */}
              <div className="mt-8 max-w-md rounded-lg border border-white/15 bg-white/95 p-5 shadow-lg backdrop-blur">
                <p className="text-sm font-medium text-text-primary">
                  Create your account or sign in today.
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  Save your reports and get updates as council works on them.
                </p>
                <div className="mt-4 flex gap-2">
                  <Link
                    href="/login"
                    className="flex-1 rounded-md border border-border bg-background px-4 py-2 text-center text-sm font-medium text-text-primary transition-colors hover:border-brand-navy"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="flex-1 rounded-md bg-brand-accent px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:opacity-90"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>

            {/* Right column: example tickets */}
            <div className="flex items-start justify-center md:justify-end">
              <div className="w-full max-w-sm space-y-3">
                <span className="block font-mono text-[11px] uppercase tracking-wider text-white/70">
                  Example tickets
                </span>
                {EXAMPLE_TICKETS.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="rounded-lg border border-white/15 bg-white/95 p-5 shadow-lg backdrop-blur"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                        Service ticket
                      </span>
                      <span className="font-mono text-[11px] text-text-muted">
                        #{ticket.id}
                      </span>
                    </div>

                    <div className="my-3 border-t border-dashed border-border" />

                    <p className="text-sm font-medium text-text-primary">
                      {ticket.title}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">{ticket.meta}</p>
                    <span
                      className="mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium"
                      style={statusStyle(ticket.status)}
                    >
                      {ticket.status.replaceAll("_", " ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About us */}
        <section className="relative overflow-hidden bg-brand-navy">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-accent/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-white/80">
                Our story
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Who's behind Smart Civic?
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                We're a small team building tools that make it easier for
                residents and councils to work together on the issues that
                matter to their community. Learn more about our mission, our
                team, and what's next.
              </p>
              <Link
                href="/aboutUs"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-medium text-brand-navy transition-colors hover:bg-white/90"
              >
                About Us 
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}