import { cn } from "../../lib/utils";

const badgeVariants = {
  default: "bg-[color:var(--accent-soft)] text-[color:var(--accent-primary)]",
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
  muted: "bg-[color:var(--bg-inset)] text-[color:var(--text-secondary)]",
};

export function Badge({ className = "", variant = "default", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}
