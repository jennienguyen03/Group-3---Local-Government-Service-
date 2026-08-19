type CategoryPieChartProps = {
  data: { label: string; value: number; color: string }[];
};

const RADIUS = 60;
const STROKE = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative">
        <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
          <circle
            cx="80"
            cy="80"
            r={RADIUS}
            fill="none"
            stroke="var(--border)"
            strokeWidth={STROKE}
          />
          {total > 0 &&
            data.map((seg) => {
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
          <span className="font-mono text-xl font-medium text-text-primary">
            {total}
          </span>
          <span className="text-[11px] text-text-muted">issues</span>
        </div>
      </div>

      <ul className="flex w-full flex-col gap-2 text-sm">
        {data
          .filter((d) => d.value > 0)
          .map((seg) => (
            <li key={seg.label} className="flex items-center justify-between">
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