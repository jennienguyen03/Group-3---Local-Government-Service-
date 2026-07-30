import IssueCard from "./IssueCard";

type Issue = {
  id: string;
  title: string;
  type: string;
  address: string | null;
  createdAt: Date;
};

type StatusColumnProps = {
  label: string;
  count: number;
  colorVar: "status-open" | "status-progress" | "status-resolved";
  issues: Issue[];
};

const colorClasses: Record<StatusColumnProps["colorVar"], { dot: string; bg: string; text: string }> = {
  "status-open": { dot: "bg-status-open", bg: "bg-status-open-bg", text: "text-status-open" },
  "status-progress": { dot: "bg-status-progress", bg: "bg-status-progress-bg", text: "text-status-progress" },
  "status-resolved": { dot: "bg-status-resolved", bg: "bg-status-resolved-bg", text: "text-status-resolved" },
};

export default function StatusColumn({ label, count, colorVar, issues }: StatusColumnProps) {
  const colors = colorClasses[colorVar];

  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-lg border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${colors.dot}`} />
          <span className="text-sm font-medium text-text-primary">{label}</span>
        </div>
        <span className={`rounded px-2 py-0.5 font-mono text-xs font-medium ${colors.bg} ${colors.text}`}>
          {count}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
        {issues.length === 0 ? (
          <p className="py-6 text-center text-xs text-text-muted">No issues</p>
        ) : (
          issues.map((issue) => <IssueCard key={issue.id} {...issue} />)
        )}
      </div>
    </div>
  );
}