type ReportItem = {
  id: string;
  title: string;
  type: string;
  status: "REPORTED" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  address: string;
  createdAt: Date;
};

const statusStyles: Record<ReportItem["status"], { bg: string; text: string; label: string }> = {
  REPORTED: { bg: "bg-status-open-bg", text: "text-status-open", label: "Open" },
  IN_PROGRESS: { bg: "bg-status-progress-bg", text: "text-status-progress", label: "In progress" },
  RESOLVED: { bg: "bg-status-resolved-bg", text: "text-status-resolved", label: "Resolved" },
  CLOSED: { bg: "bg-border", text: "text-text-secondary", label: "Closed" },
};

export default function MyReportsList({
  reports,
}: {
  reports: ReportItem[];
}) {
  if (reports.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-text-muted">
        You haven&apos;t reported any issues yet.
      </p>
    );
  }

 return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface">
            <th className="px-4 py-3 text-left font-semibold text-text-primary">
              Title
            </th>

            <th className="px-4 py-3 text-left font-semibold text-text-primary">
              Category
            </th>

            <th className="px-4 py-3 text-left font-semibold text-text-primary">
              Date
            </th>

            <th className="px-4 py-3 text-left font-semibold text-text-primary">
              Address
            </th>

            <th className="px-4 py-3 text-left font-semibold text-text-primary">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {reports.map((report) => {
            const style = statusStyles[report.status];

            return (
              <tr
                key={report.id}
                className="border-b border-border last:border-0 hover:bg-background"
              >
                {/* Title */}
                <td className="px-4 py-4 font-medium text-text-primary">
                  {report.title}
                </td>

                {/* Category */}
                <td className="px-4 py-4 text-text-secondary">
                  {report.type
                    .replaceAll("_", " ")
                    .toLowerCase()}
                </td>

                {/* Date */}
                <td className="px-4 py-4 text-text-secondary">
                  {report.createdAt.toLocaleDateString()}
                </td>

                {/* Address */}
                <td className="px-4 py-4 text-text-secondary">
                  {report.address}
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <span
                    className={`inline-block rounded px-2.5 py-1 text-xs font-medium ${style.bg} ${style.text}`}
                  >
                    {style.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}