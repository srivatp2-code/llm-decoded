"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CodeBlock({
  children,
  lang,
  filename,
  className,
}: {
  children: string;
  lang?: string;
  filename?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={cn("my-6 rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]", className)}>
      {(filename || lang) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
          <span className="text-xs text-[var(--color-text-muted)] font-mono">
            {filename ?? lang}
          </span>
          <button
            onClick={onCopy}
            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] flex items-center gap-1.5 transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check size={12} /> Copied
              </>
            ) : (
              <>
                <Copy size={12} /> Copy
              </>
            )}
          </button>
        </div>
      )}
      <pre className="!border-0 !rounded-none !my-0">
        <code className="!bg-transparent !p-0 !border-0 !text-[var(--color-text-primary)]">
          {children}
        </code>
      </pre>
    </div>
  );
}
