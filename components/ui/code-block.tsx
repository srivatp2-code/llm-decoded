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
    <div
      className={cn(
        "my-6 relative bg-[#1a1814] text-[#ede5d4] border border-[var(--color-ink)]",
        className
      )}
      style={{ boxShadow: "4px 4px 0 var(--color-paper-deep)" }}
    >
      {(filename || lang) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#3a342c] bg-[#221f1a]">
          <span className="font-mono text-[11px] text-[#a8a094] tracking-wider">
            {filename ?? lang}
          </span>
          <button
            onClick={onCopy}
            className="font-mono text-[11px] text-[#a8a094] hover:text-[#ede5d4] flex items-center gap-1.5 transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check size={11} /> copied
              </>
            ) : (
              <>
                <Copy size={11} /> copy
              </>
            )}
          </button>
        </div>
      )}
      <pre className="!my-0 !border-0 !shadow-none !rounded-none !bg-transparent">
        <code className="!bg-transparent !p-0 !border-0">
          {children}
        </code>
      </pre>
    </div>
  );
}
