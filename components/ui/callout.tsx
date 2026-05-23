import { type ReactNode } from "react";
import { Lightbulb, AlertTriangle, Sparkles, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type Kind = "insight" | "warning" | "key" | "source";

const config: Record<Kind, { icon: typeof Lightbulb; color: string; label: string }> = {
  insight: { icon: Lightbulb, color: "var(--color-blue-3)", label: "Insight" },
  warning: { icon: AlertTriangle, color: "#fb7185", label: "Watch out" },
  key: { icon: Sparkles, color: "var(--color-cyan)", label: "Key idea" },
  source: { icon: BookOpen, color: "var(--color-violet)", label: "From the source" },
};

/**
 * A callout, set as a side aside. Cinematic palette: surface background with accent left border.
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
        "my-7 p-5 md:p-6 rounded-lg border-l-2 relative"
      )}
      style={{
        borderLeftColor: color,
        background: "rgba(255, 255, 255, 0.03)",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} style={{ color }} />
        <span
          className="font-mono text-[11px] tracking-widest uppercase"
          style={{ color }}
        >
          {title ?? label}
        </span>
      </div>
      <div className="font-body text-[15px] leading-[1.65] text-[var(--color-text-soft)]">
        {children}
      </div>
    </aside>
  );
}
