type StatusChartProps = {
  open: number;
  inProgress: number;
  resolved: number;
  closed?: number;
};

const RADIUS = 60;
const STROKE = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function StatusChart({ open, inProgress, resolved, closed = 0 }: StatusChartProps) {
  const total = open + inProgress + resolved + closed;

  const segments = [
    { label: "Open", value: open, color: "var(--status-open)" },
    { label: "In progress", value: inProgress, color: "var(--status-progress)" },
    { label: "Resolved", value: resolved, color: "var(--status-resolved)" },
    { label: "Closed", value: closed, color: "var(--text-muted)" },
  ];

  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <svg width="180" height="180" viewBox="0 0 160 160" className="-rotate-90">
          <circle
            cx="80"
            cy="80"
            r={RADIUS}
            fill="none"
            stroke="var(--border)"
            strokeWidth={STROKE}
          />
          {total > 0 &&
            segments.map((seg) => {
              if (seg.value === 0) return null;
              const length = (seg.value / total) * CIRCUMFERENCE;
              const dasharray = `${length} ${CIRCUMFERENCE - length}`;
              const dashoffset = -offset;
              offset += length;
              return (
                <circle
                  key={seg.label}
                  cx="80"
                  cy="80"
                  r={RADIUS}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={STROKE}
                  strokeDasharray={dasharray}
                  strokeDashoffset={dashoffset}
                  strokeLinecap="butt"
                />
              );
            })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-2xl font-medium text-text-primary">
            {total}
          </span>
          <span className="text-[11px] text-text-muted">total issues</span>
        </div>
      </div>

      <ul className="flex w-full flex-col gap-2.5">
        {segments.map((seg) => (
          <li key={seg.label} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-text-secondary">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: seg.color }}
              />
              {seg.label}
            </span>
            <span className="font-mono text-xs font-medium text-text-primary">
              {seg.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}