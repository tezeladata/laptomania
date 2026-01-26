import { cn } from "../../lib/utils";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-2xl border border-[color:var(--surface-border)] bg-transparent px-4 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] shadow-inner outline-none transition focus:border-[color:var(--accent-outline)] focus:ring-2 focus:ring-indigo-100",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-2xl border border-[color:var(--surface-border)] bg-transparent px-4 py-3 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] shadow-inner outline-none transition focus:border-[color:var(--accent-outline)] focus:ring-2 focus:ring-indigo-100",
        className
      )}
      {...props}
    />
  );
}

export function Label({ className = "", ...props }) {
  return <label className={cn("text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text-muted)]", className)} {...props} />;
}
