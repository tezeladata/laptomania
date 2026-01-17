import { cn } from "../../lib/utils";

export function StatCard({ title, value, description, icon, className = "" }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-3xl border border-[color:var(--border-subtle)]/50 bg-gradient-to-br from-white/20 via-white/5 to-transparent p-6 shadow-[var(--shadow-soft)] dark:from-white/10 dark:via-white/0",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-200">{title}</p>
        {icon}
      </div>
      <p className="text-3xl font-black text-white">{value}</p>
      <p className="text-sm text-slate-200 dark:text-slate-300">{description}</p>
    </div>
  );
}
