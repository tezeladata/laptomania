import { cn } from "../../lib/utils";

const baseStyles =
  "card-hover inline-flex items-center justify-center rounded-2xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  default:
    "bg-[color:var(--accent-primary)] text-[color:var(--accent-primary-foreground)] shadow hover:-translate-y-0.5 hover:bg-[color:var(--accent-primary-hover)] focus-visible:ring-indigo-400",
  ghost:
    "bg-transparent text-[color:var(--text-primary)] hover:bg-[color:var(--accent-soft)]",
  outline:
    "border border-[color:var(--surface-border)] text-[color:var(--text-primary)] hover:bg-[color:var(--bg-inset)]",
  subtle:
    "bg-[color:var(--bg-inset)] text-[color:var(--text-primary)] hover:bg-[color:var(--bg-muted-accent)]",
};

const sizes = {
  default: "h-11 px-5",
  sm: "h-9 px-3 text-xs",
  lg: "h-12 px-8 text-base",
};

export function Button({ className = "", variant = "default", size = "default", asChild = false, ...props }) {
  const Comp = asChild ? "span" : "button";
  return <Comp className={cn(baseStyles, variants[variant], sizes[size], className)} {...props} />;
}
