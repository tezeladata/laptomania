import { cn } from "../../lib/utils";

export function StatCard({ title, value, description, icon, className = "" }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-3xl border border-[color:var(--surface-border)] bg-linear-to-br from-[color:var(--bg-card)] via-[color:var(--bg-elevated)]/60 to-transparent p-6 shadow-[var(--shadow-soft)]",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-muted)]">{title}</p>
        {icon}
      </div>
      <p className="text-3xl font-black text-[color:var(--text-primary)]">{value}</p>
      <p className="text-sm text-[color:var(--text-secondary)]">{description}</p>
    </div>
  );
}
