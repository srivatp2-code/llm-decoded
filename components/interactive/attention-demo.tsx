"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

// Pre-computed plausible attention pattern for the sentence
const SENTENCE = ["The", "cat", "sat", "on", "the", "warm", "mat"];

// Build a causal attention matrix where each row sums to ~1
// Higher attention on relevant tokens (e.g. "mat" attends to "cat" and "the" and "warm")
function buildAttention(): number[][] {
  const n = SENTENCE.length;
  const m: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  // Bespoke weights to look plausible
  const patterns: Record<number, Record<number, number>> = {
    0: { 0: 1 }, // "The" → just itself
    1: { 0: 0.3, 1: 0.7 }, // "cat" → "The cat"
    2: { 0: 0.1, 1: 0.6, 2: 0.3 }, // "sat" → "cat" mostly
    3: { 0: 0.05, 1: 0.2, 2: 0.5, 3: 0.25 }, // "on" → "sat"
    4: { 0: 0.4, 4: 0.4, 1: 0.2 }, // "the" → like "The" before
    5: { 1: 0.15, 4: 0.3, 5: 0.55 }, // "warm" → "the"
    6: { 1: 0.4, 4: 0.2, 5: 0.25, 6: 0.15 }, // "mat" → cat (subject), warm (modifier), the
  };
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      m[i][j] = patterns[i]?.[j] ?? 0;
    }
    // Normalize row
    const sum = m[i].reduce((a, b) => a + b, 0) || 1;
    m[i] = m[i].map((v) => v / sum);
  }
  return m;
}

const ATTENTION = buildAttention();

export function AttentionDemo() {
  const [hovered, setHovered] = useState<number | null>(6); // default highlight "mat"

  const activeRow = hovered ?? 6;
  const weights = useMemo(() => ATTENTION[activeRow], [activeRow]);

  return (
    <div className="float-card p-6 md:p-8 my-8">
      <h3 className="text-xl font-semibold mb-1">Attention, visualized</h3>
      <p className="text-sm text-[var(--color-text-soft)] mb-6">
        Hover any token. The highlighted attention shows which past tokens it&apos;s &quot;looking
        at&quot; — the heart of every transformer.
      </p>

      {/* Token row */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {SENTENCE.map((tok, i) => {
          const isActive = i === activeRow;
          const weight = i <= activeRow ? ATTENTION[activeRow][i] : 0;
          return (
            <motion.button
              key={i}
              onHoverStart={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              className="px-4 py-2.5 rounded-lg font-mono text-sm relative cursor-pointer focus:outline-none"
              style={{
                background: isActive
                  ? "var(--color-blue-3)"
                  : weight > 0.01
                    ? `rgba(77, 141, 255, ${0.1 + weight * 0.8})`
                    : "var(--color-surface-2)",
                color: isActive ? "var(--color-bg)" : "var(--color-text)",
                border: `1px solid ${isActive ? "var(--color-blue-3)" : "var(--color-line)"}`,
              }}
              animate={{ scale: isActive ? 1.05 : 1 }}
            >
              {tok}
              {weight > 0.01 && !isActive && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[var(--color-text-muted)]">
                  {(weight * 100).toFixed(0)}%
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="text-center text-sm text-[var(--color-text-soft)]">
        Token <span className="font-mono text-[var(--color-blue-3)]">&quot;{SENTENCE[activeRow]}&quot;</span>{" "}
        is attending to{" "}
        {weights
          .map((w, i) => ({ tok: SENTENCE[i], w }))
          .filter((x) => x.w > 0.05 && SENTENCE[activeRow] !== x.tok)
          .sort((a, b) => b.w - a.w)
          .slice(0, 3)
          .map((x, i, arr) => (
            <span key={x.tok}>
              <span className="font-mono text-[var(--color-cyan)]">&quot;{x.tok}&quot;</span>
              {i < arr.length - 1 ? ", " : "."}
            </span>
          ))}
      </div>

      {/* Heatmap */}
      <div className="mt-8">
        <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
          Full causal attention matrix (rows = query, cols = key)
        </p>
        <div className="overflow-x-auto">
          <table className="font-mono text-xs">
            <thead>
              <tr>
                <th></th>
                {SENTENCE.map((t) => (
                  <th
                    key={t}
                    className="px-2 py-1 text-[var(--color-text-muted)] font-normal"
                  >
                    {t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ATTENTION.map((row, i) => (
                <tr key={i}>
                  <td className="pr-2 text-[var(--color-text-muted)] text-right">{SENTENCE[i]}</td>
                  {row.map((v, j) => (
                    <td key={j} className="p-0.5">
                      <div
                        className="w-9 h-9 rounded flex items-center justify-center text-[10px]"
                        style={{
                          background:
                            j > i
                              ? "transparent"
                              : `rgba(77, 141, 255, ${0.08 + v * 0.92})`,
                          color: v > 0.4 ? "white" : "var(--color-text-muted)",
                          border:
                            j > i ? "1px dashed var(--color-line)" : "1px solid var(--color-line)",
                        }}
                      >
                        {j > i ? "—" : v.toFixed(2)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--color-text-muted)] mt-2">
          Dashed cells are masked — a token can&apos;t attend to the future.
        </p>
      </div>
    </div>
  );
}
