"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { encode, decode } from "gpt-tokenizer";

const PALETTE = [
  "#a78bfa",
  "#67e8f9",
  "#fbbf24",
  "#34d399",
  "#fb7185",
  "#c4b5fd",
  "#7dd3fc",
  "#facc15",
  "#86efac",
  "#fda4af",
];

const EXAMPLES = [
  "Hello, world!",
  "The quick brown fox jumps over the lazy dog.",
  "안녕하세요 — multilingual tokens are wildly different.",
  "def hello():\n    print('Hello, world!')",
  "12345 678 9000 100000",
];

export function TokenizerDemo() {
  const [text, setText] = useState(EXAMPLES[0]);

  const tokens = useMemo(() => {
    try {
      const ids = encode(text);
      const decoded = ids.map((id) => {
        try {
          return decode([id]);
        } catch {
          return "�";
        }
      });
      return { ids, decoded };
    } catch {
      return { ids: [] as number[], decoded: [] as string[] };
    }
  }, [text]);

  const charCount = text.length;
  const tokenCount = tokens.ids.length;
  const ratio = tokenCount > 0 ? (charCount / tokenCount).toFixed(2) : "—";

  return (
    <div className="surface-card p-6 md:p-8 my-8">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Live tokenizer</h3>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Type anything. See how GPT actually sees it.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              onClick={() => setText(ex)}
              className="text-xs px-2.5 py-1 rounded-md bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)] transition-colors"
            >
              {i === 0 ? "Hello" : i === 1 ? "English" : i === 2 ? "Korean" : i === 3 ? "Code" : "Numbers"}
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full min-h-[100px] p-4 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] font-mono text-sm leading-relaxed resize-y focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
        spellCheck={false}
      />

      <div className="grid grid-cols-3 gap-3 mt-4 mb-6">
        <div className="surface-card p-3 text-center">
          <div className="text-2xl font-semibold">{charCount}</div>
          <div className="text-xs text-[var(--color-text-muted)] mt-0.5">characters</div>
        </div>
        <div className="surface-card p-3 text-center">
          <div className="text-2xl font-semibold text-[var(--color-accent)]">{tokenCount}</div>
          <div className="text-xs text-[var(--color-text-muted)] mt-0.5">tokens</div>
        </div>
        <div className="surface-card p-3 text-center">
          <div className="text-2xl font-semibold text-[var(--color-cyan)]">{ratio}</div>
          <div className="text-xs text-[var(--color-text-muted)] mt-0.5">chars/token</div>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
          Token visualization
        </p>
        <div className="flex flex-wrap gap-1 p-4 bg-[var(--color-surface-2)] rounded-lg border border-[var(--color-border)] min-h-[80px]">
          {tokens.decoded.map((tok, i) => {
            const color = PALETTE[i % PALETTE.length];
            const display = tok.replace(/ /g, "·").replace(/\n/g, "↵");
            return (
              <motion.span
                key={`${i}-${tok}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: i * 0.005 }}
                className="px-1.5 py-0.5 rounded text-sm font-mono"
                style={{
                  backgroundColor: `${color}20`,
                  color: color,
                  border: `1px solid ${color}40`,
                }}
                title={`token id: ${tokens.ids[i]}`}
              >
                {display}
              </motion.span>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
          Token IDs (what the model actually sees)
        </p>
        <div className="p-3 bg-[var(--color-surface-2)] rounded-lg border border-[var(--color-border)] font-mono text-xs text-[var(--color-text-secondary)] overflow-x-auto">
          [{tokens.ids.join(", ")}]
        </div>
      </div>
    </div>
  );
}
