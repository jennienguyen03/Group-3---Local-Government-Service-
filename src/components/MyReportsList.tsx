type ReportItem = {
  id: string;
  title: string;
  type: string;
  status: "REPORTED" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  createdAt: Date;
};

const statusStyles: Record<ReportItem["status"], { bg: string; text: string; label: string }> = {
  REPORTED: { bg: "bg-status-open-bg", text: "text-status-open", label: "Open" },
  IN_PROGRESS: { bg: "bg-status-progress-bg", text: "text-status-progress", label: "In progress" },
  RESOLVED: { bg: "bg-status-resolved-bg", text: "text-status-resolved", label: "Resolved" },
  CLOSED: { bg: "bg-border", text: "text-text-secondary", label: "Closed" },
};

export default function MyReportsList({ reports }: { reports: ReportItem[] }) {
  if (reports.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-text-muted">
        You haven&apos;t reported any issues yet.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {reports.map((report) => {
        const style = statusStyles[report.status];
        return (
          <li
            key={report.id}
            className="flex items-center justify-between rounded-md border border-border bg-surface px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium text-text-primary">{report.title}</p>
              <p className="mt-0.5 text-xs text-text-secondary">
                {report.type.replaceAll("_", " ").toLowerCase()}
              </p>
            </div>
            <span className={`rounded px-2.5 py-1 text-xs font-medium ${style.bg} ${style.text}`}>
              {style.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}