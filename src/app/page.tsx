import Link from "next/link";
import { LandingNavbar } from "~/components/LandingNavbar";
import {
  IconPothole,
  IconGraffiti,
  IconDumping,
  IconPlayground,
  IconStreetlight,
  IconVegetation,
  IconWaterLeak,
  IconFootpath,
} from "~/components/IssueTypeIcon";

const ISSUE_TYPES = [
  { type: "POTHOLE", label: "Pothole", Icon: IconPothole },
  { type: "GRAFFITI", label: "Graffiti", Icon: IconGraffiti },
  { type: "ILLEGAL_DUMPING", label: "Illegal dumping", Icon: IconDumping },
  { type: "DAMAGED_PLAYGROUND_EQUIPMENT", label: "Playground damage", Icon: IconPlayground },
  { type: "BROKEN_STREETLIGHT", label: "Broken streetlight", Icon: IconStreetlight },
  { type: "OVERGROWN_VEGETATION", label: "Overgrown vegetation", Icon: IconVegetation },
  { type: "WATER_LEAK", label: "Water leak", Icon: IconWaterLeak },
  { type: "FOOTPATH_DAMAGE", label: "Footpath damage", Icon: IconFootpath },
];

const STEPS = [
  {
    label: "Reported",
    color: "var(--status-open)",
    bg: "var(--status-open-bg)",
    copy: "Tell us what's wrong and where. Drop a pin or use your location.",
  },
  {
    label: "In progress",
    color: "var(--status-progress)",
    bg: "var(--status-progress-bg)",
    copy: "Council staff pick it up, assess it, and start the fix.",
  },
  {
    label: "Resolved",
    color: "var(--status-resolved)",
    bg: "var(--status-resolved-bg)",
    copy: "You're notified once it's done. Track it the whole way.",
  },
];

// Example tickets shown for illustration only — not real data.
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

      <main className="flex-1 bg-background">
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-20 md:grid-cols-[1.1fr_0.9fr] md:pt-24">
          <div>
            <span className="font-mono text-2xl font-bold uppercase tracking-wider text-brand-accent">
              Local government service requests
            </span>
           <h1 className="mt-4 text-xl font-semibold leading-[1.1] tracking-tight text-text-primary md:text-xl">
              Report anything broken in minutes
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-text-secondary">
              Potholes, graffiti, broken streetlights, illegal dumping — flag
              it on a map and track it through to resolved. Council sees it
              the moment you submit.
            </p>

            {/* Sign-in prompt */}
            <div className="mt-8 max-w-md rounded-lg border border-border bg-surface p-5">
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
                  className="flex-1 rounded-md bg-brand-navy px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-[#1c3a5c]"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>

          {/* Right column: example tickets */}
          <div className="flex items-start justify-center md:justify-end">
            <div className="w-full max-w-sm space-y-3">
              <span className="block font-mono text-[11px] uppercase tracking-wider text-text-muted">
                Example tickets
              </span>
              {EXAMPLE_TICKETS.map((ticket) => (
                <div
                  key={ticket.id}
                  className="rounded-lg border border-border bg-surface p-5 shadow-sm"
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
        </section>

        {/* How it works */}
        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-xl font-semibold text-text-primary">
              How it works
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {STEPS.map((step, i) => (
                <div
                  key={step.label}
                  className="rounded-lg border border-border bg-background p-5"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs font-semibold"
                      style={{ color: step.color, background: step.bg }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-text-primary">
                      {step.label}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {step.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Issue types */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-xl font-semibold text-text-primary">
            What you can report
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {ISSUE_TYPES.map(({ type, label, Icon }) => (
              <div
                key={type}
                className="flex flex-col items-start gap-3 rounded-lg border border-border bg-surface p-4"
              >
                <Icon className="h-5 w-5 shrink-0 text-brand-accent" />
                <span className="text-sm font-medium text-text-primary">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-t border-border bg-brand-navy">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-14 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Your street, your call.
              </h2>
              <p className="mt-1 text-sm text-white/70">
                It takes under two minutes to file a report.
              </p>
            </div>
            <Link
              href="/report"
              className="rounded-md bg-white px-5 py-3 text-sm font-medium text-brand-navy transition-colors hover:bg-white/90"
            >
              Report an issue
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}