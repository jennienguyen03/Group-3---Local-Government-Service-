type IssueCardProps = {
  title: string;
  type: string;
  address: string | null;
  createdAt: Date;
};

function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const days = Math.floor(seconds / 86400);
  if (days >= 1) return `${days}d ago`;
  const hours = Math.floor(seconds / 3600);
  if (hours >= 1) return `${hours}h ago`;
  const minutes = Math.floor(seconds / 60);
  return `${Math.max(minutes, 1)}m ago`;
}

export default function IssueCard({ title, type, address, createdAt }: IssueCardProps) {
  return (
    <div className="rounded-md border border-border bg-surface p-3 transition-colors hover:border-brand-accent/40">
      <p className="text-sm font-medium text-text-primary">{title}</p>
      <p className="mt-1 text-xs text-text-secondary">
        {type.replaceAll("_", " ").toLowerCase()}
        {address ? ` · ${address}` : ""}
      </p>
      <p className="mt-2 font-mono text-[11px] text-text-muted">
        {timeAgo(createdAt)}
      </p>
    </div>
  );
}