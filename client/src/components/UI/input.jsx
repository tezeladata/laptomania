import { cn } from "../../lib/utils";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-2xl border border-[color:var(--border-subtle)] bg-transparent px-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-inner outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-300",
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
        "flex min-h-[120px] w-full rounded-2xl border border-[color:var(--border-subtle)] bg-transparent px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-inner outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:text-slate-100 dark:placeholder:text-slate-500",
        className
      )}
      {...props}
    />
  );
}

export function Label({ className = "", ...props }) {
  return <label className={cn("text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400", className)} {...props} />;
}
