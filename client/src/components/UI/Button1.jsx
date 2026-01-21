import { cn } from "../../lib/utils";

const baseStyles =
  "card-hover inline-flex items-center justify-center rounded-2xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  default:
    "bg-indigo-600 text-white shadow hover:-translate-y-0.5 hover:bg-indigo-500 focus-visible:ring-indigo-400 dark:bg-indigo-500 dark:hover:bg-indigo-400",
  ghost:
    "bg-transparent text-white hover:bg-white/10 dark:text-slate-100 dark:hover:bg-slate-800",
  outline:
    "border border-slate-200 text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800",
  subtle:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700",
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
