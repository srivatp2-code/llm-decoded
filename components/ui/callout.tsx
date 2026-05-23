import { type ReactNode } from "react";
import { Lightbulb, AlertTriangle, Sparkles, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type Kind = "insight" | "warning" | "key" | "source";

const config: Record<Kind, { icon: typeof Lightbulb; color: string; label: string }> = {
  insight: { icon: Lightbulb, color: "var(--color-sienna)", label: "Insight" },
  warning: { icon: AlertTriangle, color: "#9a3412", label: "Watch out" },
  key: { icon: Sparkles, color: "var(--color-sienna)", label: "Key idea" },
  source: { icon: BookOpen, color: "var(--color-marker)", label: "From the source" },
};

/**
 * A callout, set as a sidenote — like a footnote that's been promoted.
 * Uses the manuscript palette: paper deep background, sienna or marker accent.
 */
export function Callout({
  kind = "insight",
  children,
  title,
}: {
  kind?: Kind;
  children: ReactNode;
  title?: string;
}) {
  const { icon: Icon, color, label } = config[kind];
  return (
    <aside
      className={cn(
        "my-7 p-5 md:p-6 bg-[var(--color-paper-margin)] border-l-2 relative"
      )}
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} style={{ color }} />
        <span
          className="chapter-number"
          style={{ color }}
        >
          {title ?? label}
        </span>
      </div>
      <div className="font-body text-[16px] leading-[1.6] text-[var(--color-ink)]">
        {children}
      </div>
    </aside>
  );
}
