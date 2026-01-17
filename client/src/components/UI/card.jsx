import { cn } from "../../lib/utils";

export function Card({ className = "", ...props }) {
  return (
    <div
      data-card
      className={cn(
        "card-hover rounded-3xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-card)] shadow-[var(--shadow-soft)] backdrop-blur",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }) {
  return <div className={cn("space-y-1.5 p-6", className)} {...props} />;
}

export function CardTitle({ className = "", ...props }) {
  return <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />;
}

export function CardDescription({ className = "", ...props }) {
  return <p className={cn("text-sm text-slate-500 dark:text-slate-400", className)} {...props} />;
}

export function CardContent({ className = "", ...props }) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({ className = "", ...props }) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}
