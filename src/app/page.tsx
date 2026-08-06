import Link from "next/link";
import { db } from "~/server/db";
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

export const dynamic = "force-dynamic";

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

export default async function Home() {
  const issues = await db.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  const resolvedCount = issues.filter((i) => i.status === "RESOLVED").length;
  const latest = issues[0];

  return (
    <>
      <LandingNavbar />

      <main className="flex-1 bg-background">
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-20 md:grid-cols-[1.1fr_0.9fr] md:pt-24">
          <div>
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-brand-accent">
              Local government service requests
            </span>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-text-primary md:text-5xl">
              See something broken?
              <br />
              Report it in minutes.
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-text-secondary">
              Potholes, graffiti, broken streetlights, illegal dumping — flag
              it on a map and track it through to resolved. Council sees it
              the moment you submit.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard/report"
                className="rounded-md bg-brand-navy px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1c3a5c]"
              >
                Report an issue
              </Link>
              <Link
                href="/dashboard"
                className="rounded-md border border-border bg-surface px-5 py-3 text-sm font-medium text-text-primary transition-colors hover:border-brand-navy"
              >
                Track my reports
              </Link>
            </div>

            <div className="mt-12 flex gap-8 border-t border-border pt-6">
              <div>
                <div className="font-mono text-2xl font-semibold text-text-primary">
                  {issues.length}
                </div>
                <div className="text-xs text-text-muted">Reports logged</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-semibold text-status-resolved">
                  {resolvedCount}
                </div>
                <div className="text-xs text-text-muted">Resolved</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-semibold text-text-primary">
                  8
                </div>
                <div className="text-xs text-text-muted">Issue types tracked</div>
              </div>
            </div>
          </div>

          {/* Signature element: a service-ticket stub pulled from real data */}
          <div className="flex items-start justify-center md:justify-end">
            <div className="relative w-full max-w-sm rounded-lg border border-border bg-surface p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  Service ticket
                </span>
                <span className="font-mono text-[11px] text-text-muted">
                  {latest ? `#${latest.id.slice(-6).toUpperCase()}` : "#000000"}
                </span>
              </div>

              <div className="my-4 border-t border-dashed border-border" />

              {latest ? (
                <>
                  <p className="text-sm font-medium text-text-primary">
                    {latest.title}
                  </p>
                  <p className="mt-1 text-xs text-text-muted">
                    {latest.type.replaceAll("_", " ").toLowerCase()} ·{" "}
                    {latest.address ??
                      `${latest.latitude.toFixed(3)}, ${latest.longitude.toFixed(3)}`}
                  </p>
                  <span
                    className="mt-4 inline-block rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      color:
                        latest.status === "RESOLVED"
                          ? "var(--status-resolved)"
                          : latest.status === "IN_PROGRESS"
                          ? "var(--status-progress)"
                          : "var(--status-open)",
                      background:
                        latest.status === "RESOLVED"
                          ? "var(--status-resolved-bg)"
                          : latest.status === "IN_PROGRESS"
                          ? "var(--status-progress-bg)"
                          : "var(--status-open-bg)",
                    }}
                  >
                    {latest.status.replaceAll("_", " ")}
                  </span>
                </>
              ) : (
                <p className="text-sm text-text-muted">
                  No reports yet — be the first.
                </p>
              )}

              <div className="mt-6 border-t border-border pt-4 text-[11px] text-text-muted">
                Every report is timestamped and tracked from{" "}
                <span className="font-medium text-status-open">reported</span>{" "}
                to <span className="font-medium text-status-resolved">resolved</span>.
              </div>
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
                <Icon className="h-6 w-6 text-brand-accent" />
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
              href="/dashboard/report"
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