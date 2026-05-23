import { type ReactNode } from "react";
import { Lightbulb, AlertTriangle, Sparkles, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type Kind = "insight" | "warning" | "key" | "source";

const config: Record<Kind, { icon: typeof Lightbulb; color: string; label: string }> = {
  insight: { icon: Lightbulb, color: "var(--color-amber)", label: "Insight" },
  warning: { icon: AlertTriangle, color: "var(--color-rose)", label: "Watch out" },
  key: { icon: Sparkles, color: "var(--color-accent)", label: "Key idea" },
  source: { icon: BookOpen, color: "var(--color-cyan)", label: "From the source" },
};

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
        "my-6 p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] relative overflow-hidden"
      )}
      style={{ borderLeftWidth: 3, borderLeftColor: color }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon size={16} style={{ color }} />
        <span className="text-xs uppercase tracking-wider font-medium" style={{ color }}>
          {title ?? label}
        </span>
      </div>
      <div className="text-[var(--color-text-secondary)] leading-relaxed text-[15px]">{children}</div>
    </aside>
  );
}
