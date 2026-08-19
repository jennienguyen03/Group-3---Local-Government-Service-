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
  { type: "POTHOLE", label: "Pothole", Icon: IconPothole, color: "var(--status-open)", bg: "var(--status-open-bg)" },
  { type: "GRAFFITI", label: "Graffiti", Icon: IconGraffiti, color: "var(--brand-accent)", bg: "#e4f0f4" },
  { type: "ILLEGAL_DUMPING", label: "Illegal dumping", Icon: IconDumping, color: "var(--status-open)", bg: "var(--status-open-bg)" },
  { type: "DAMAGED_PLAYGROUND_EQUIPMENT", label: "Playground damage", Icon: IconPlayground, color: "var(--status-progress)", bg: "var(--status-progress-bg)" },
  { type: "BROKEN_STREETLIGHT", label: "Broken streetlight", Icon: IconStreetlight, color: "var(--status-progress)", bg: "var(--status-progress-bg)" },
  { type: "OVERGROWN_VEGETATION", label: "Overgrown vegetation", Icon: IconVegetation, color: "var(--status-resolved)", bg: "var(--status-resolved-bg)" },
  { type: "WATER_LEAK", label: "Water leak", Icon: IconWaterLeak, color: "var(--brand-accent)", bg: "#e4f0f4" },
  { type: "FOOTPATH_DAMAGE", label: "Footpath damage", Icon: IconFootpath, color: "var(--status-resolved)", bg: "var(--status-resolved-bg)" },
];

// The four steps a resident goes through to file a report
const REPORT_STEPS = [
  {
    number: "01",
    title: "Choose a category",
    copy: "Pick what kind of issue it is — pothole, graffiti, broken streetlight, and so on. This helps route your report to the right council team.",
    color: "var(--brand-accent)",
    bg: "var(--status-progress-bg)",
  },
  {
    number: "02",
    title: "Describe it and add a photo",
    copy: "Give a short description of what's wrong. Adding a photo helps staff assess it faster and avoid needing a site visit just to confirm.",
    color: "var(--status-open)",
    bg: "var(--status-open-bg)",
  },
  {
    number: "03",
    title: "Pin the location",
    copy: "Drop a pin on the map or use your current location. Accurate location means crews can find and fix it without guesswork.",
    color: "var(--status-resolved)",
    bg: "var(--status-resolved-bg)",
  },
  {
    number: "04",
    title: "Submit and track",
    copy: "Once submitted, you'll see it move from Reported → In Progress → Resolved, with updates along the way.",
    color: "var(--brand-navy)",
    bg: "var(--brand-navy-bg)",
  },
];

// The three statuses a report moves through after submission
const STATUS_STEPS = [
  {
    label: "Reported",
    color: "var(--status-open)",
    bg: "var(--status-open-bg)",
    copy: "Your report is in the system and visible to council staff.",
  },
  {
    label: "In progress",
    color: "var(--status-progress)",
    bg: "var(--status-progress-bg)",
    copy: "Council staff have picked it up, assessed it, and started the fix.",
  },
  {
    label: "Resolved",
    color: "var(--status-resolved)",
    bg: "var(--status-resolved-bg)",
    copy: "The issue is fixed. You'll be notified, and it stays on record.",
  },
];

// shared card style for the "Reporting an issue" section
const CARD = "rounded-lg border border-border bg-surface p-7 transition-shadow hover:shadow-sm";

export default function HowItWorksPage() {
  return (
    <>
      <LandingNavbar />

      <main className="flex-1 bg-background">
        {/* Intro */}
        <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28">
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-brand-accent md:text-6xl">
            How it works
          </h1>
          <p className="mt-5 text-lg font-semibold text-text-primary md:text-xl">
            Report anything broken in minutes
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            Smart Civic connects residents directly to council staff. Report
            an issue in a couple of minutes, and follow it the whole way
            through to resolved.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-text-secondary">
              4 simple steps
            </span>
            <span className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-text-secondary">
              Live status tracking
            </span>
            <span className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-text-secondary">
              8 issue types
            </span>
          </div>
        </section>

        {/* Step-by-step reporting flow */}
        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
              Reporting an issue
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {REPORT_STEPS.map((step) => (
                <div key={step.number} className={CARD}>
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full font-mono text-sm font-semibold"
                    style={{ color: step.color, background: step.bg }}
                  >
                    {step.number}
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">
                    {step.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Status tracking — tinted cards matching brand colors */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
            Tracking your report
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {STATUS_STEPS.map((step, i) => (
              <div
                key={step.label}
                className="rounded-lg border p-6 transition-shadow hover:shadow-sm"
                style={{ borderColor: step.color, background: step.bg }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full font-mono text-sm font-semibold text-white"
                    style={{ background: step.color }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-base font-semibold text-text-primary">
                    {step.label}
                  </span>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                  {step.copy}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* What you can report — colorful icons matching homepage */}
        <section className="border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
              What you can report
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {ISSUE_TYPES.map(({ type, label, Icon, color, bg }) => (
                <div
                  key={type}
                  className="flex flex-col items-start gap-3 rounded-lg border border-border bg-surface p-5 transition-shadow hover:shadow-sm"
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full"
                    style={{ background: bg }}
                  >
                    <Icon className="h-5 w-5 shrink-0" style={{ color }} />
                  </span>
                  <span className="text-base font-medium text-text-primary">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-t border-border bg-brand-navy">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Ready to report something?
              </h2>
              <p className="mt-1 text-base text-white/70">
                It takes under two minutes.
              </p>
            </div>
            <Link
              href="/"
              className="rounded-md bg-white px-5 py-3 text-sm font-medium text-brand-navy transition-colors hover:bg-white/90"
            >
              Home
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}