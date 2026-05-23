"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

// Toy next-token distribution after "The cat sat on the ___"
const RAW_LOGITS = [
  { token: "mat", logit: 4.2 },
  { token: "chair", logit: 3.1 },
  { token: "floor", logit: 2.8 },
  { token: "couch", logit: 2.3 },
  { token: "table", logit: 1.9 },
  { token: "fence", logit: 1.4 },
  { token: "moon", logit: 0.6 },
  { token: "philosophy", logit: -0.3 },
];

function softmax(logits: number[], temp: number) {
  const t = Math.max(temp, 0.01);
  const scaled = logits.map((l) => l / t);
  const max = Math.max(...scaled);
  const exps = scaled.map((s) => Math.exp(s - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

export function TemperatureDemo() {
  const [temp, setTemp] = useState(1.0);

  const probs = useMemo(() => {
    const ps = softmax(
      RAW_LOGITS.map((l) => l.logit),
      temp
    );
    return RAW_LOGITS.map((r, i) => ({ ...r, prob: ps[i] }));
  }, [temp]);

  const maxProb = Math.max(...probs.map((p) => p.prob));

  return (
    <div className="surface-card p-6 md:p-8 my-8">
      <h3 className="text-xl font-semibold mb-1">Sampling temperature</h3>
      <p className="text-sm text-[var(--color-text-secondary)] mb-6">
        Drag the slider. Low temperature → confident, repetitive. High temperature → creative,
        unhinged.
      </p>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
            Temperature
          </label>
          <span className="font-mono text-sm text-[var(--color-accent)]">{temp.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min={0.05}
          max={3}
          step={0.05}
          value={temp}
          onChange={(e) => setTemp(parseFloat(e.target.value))}
          className="w-full accent-[var(--color-accent)]"
          aria-label="Temperature"
        />
        <div className="flex justify-between text-xs text-[var(--color-text-muted)] mt-1">
          <span>0.05 (greedy)</span>
          <span>1.0 (default)</span>
          <span>3.0 (chaos)</span>
        </div>
      </div>

      <div className="mb-2 text-sm text-[var(--color-text-secondary)] font-mono">
        Prompt: <span className="text-[var(--color-text-primary)]">&quot;The cat sat on the ___&quot;</span>
      </div>

      <div className="space-y-2 mt-4">
        {probs.map((p) => (
          <div key={p.token} className="flex items-center gap-3">
            <div className="w-24 text-sm font-mono text-[var(--color-text-secondary)] text-right shrink-0">
              {p.token}
            </div>
            <div className="flex-1 h-7 bg-[var(--color-surface-2)] rounded-md overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-md"
                style={{
                  background:
                    p.prob === maxProb
                      ? "linear-gradient(90deg, var(--color-accent-deep), var(--color-accent))"
                      : "var(--color-surface-3)",
                }}
                animate={{ width: `${p.prob * 100}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
              />
            </div>
            <div className="w-16 text-sm font-mono text-[var(--color-text-muted)] text-right shrink-0">
              {(p.prob * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
