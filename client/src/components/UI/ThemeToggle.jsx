import { useTheme } from "../../context/theme.context.jsx";
import { cn } from "../../lib/utils.js";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex h-9 w-24 items-center rounded-full border p-1 text-[10px] font-semibold uppercase tracking-[0.25em] transition",
        isDark
          ? "border-slate-600 bg-slate-900 text-slate-300"
          : "border-slate-200 bg-white text-slate-600 shadow"
      )}
    >
      <span className={cn("relative z-10 flex-1 text-center", !isDark ? "text-slate-900" : "text-slate-500")}>Light</span>
      <span className={cn("relative z-10 flex-1 text-center", isDark ? "text-white" : "text-slate-400")}>Dark</span>
      <span
        className={cn(
          "absolute top-1 h-7 w-[calc(50%-6px)] rounded-full shadow transition-all",
          isDark ? "left-1/2 bg-slate-700" : "left-1 bg-slate-900"
        )}
      />
    </button>
  );
};
