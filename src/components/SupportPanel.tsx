export default function SupportPanel() {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <p className="text-sm text-text-secondary">
        Have a question about a report, or need to reach the council directly?
      </p>

      <form className="mt-3 flex flex-col gap-2">
        <textarea
          placeholder="Type your message..."
          rows={3}
          className="w-full resize-none rounded-md border border-border bg-surface p-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-accent focus:outline-none"
        />
        <button
          type="submit"
          className="self-end rounded-md bg-brand-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-accent/90"
        >
          Send message
        </button>
      </form>
    </div>
  );
}