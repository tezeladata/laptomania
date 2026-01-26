import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

const variants = {
  up: "reveal-up",
  down: "reveal-down",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
};

export function Reveal({ as: Component = "div", variant = "up", className = "", children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const supportsIntersectionObserver = typeof window !== "undefined" && "IntersectionObserver" in window;

    if (!supportsIntersectionObserver || prefersReducedMotion) {
      node.classList.add("reveal-visible");
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            node.classList.add("reveal-visible");
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component ref={ref} className={cn("reveal", variants[variant], className)} {...props}>
      {children}
    </Component>
  );
}
