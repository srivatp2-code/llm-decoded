"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Animated byte-pair encoding demonstration.
 * Shows a real BPE merge process on a small toy corpus, step by step.
 * The user can step through merges manually or auto-play.
 */
const CORPUS = "the cat sat on the mat the cat the mat the cat";

type Step = {
  pair: [string, string];
  merged: string;
  count: number;
  tokens: string[];
  vocab: string[];
};

function pairsOf(tokens: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (let i = 0; i < tokens.length - 1; i++) {
    const key = tokens[i] + "​" + tokens[i + 1];
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

function bestPair(tokens: string[]): [string, string, number] | null {
  const counts = pairsOf(tokens);
  if (counts.size === 0) return null;
  let bestKey = "";
  let bestCount = 0;
  for (const [k, c] of counts) {
    if (c > bestCount) {
      bestCount = c;
      bestKey = k;
    }
  }
  if (bestCount < 2) return null;
  const [a, b] = bestKey.split("​");
  return [a, b, bestCount];
}

function applyMerge(tokens: string[], a: string, b: string, merged: string): string[] {
  const out: string[] = [];
  let i = 0;
  while (i < tokens.length) {
    if (tokens[i] === a && tokens[i + 1] === b) {
      out.push(merged);
      i += 2;
    } else {
      out.push(tokens[i]);
      i += 1;
    }
  }
  return out;
}

function computeSteps(initial: string[], maxSteps = 8): Step[] {
  const steps: Step[] = [];
  let tokens = [...initial];
  let vocab = Array.from(new Set(initial));
  for (let s = 0; s < maxSteps; s++) {
    const best = bestPair(tokens);
    if (!best) break;
    const [a, b, count] = best;
    const merged = a + b;
    const newTokens = applyMerge(tokens, a, b, merged);
    const newVocab = [...vocab, merged];
    steps.push({
      pair: [a, b],
      merged,
      count,
      tokens: newTokens,
      vocab: newVocab,
    });
    tokens = newTokens;
    vocab = newVocab;
  }
  return steps;
}

export function BpeMerge() {
  // Start at character level
  const initialTokens = useMemo(() => Array.from(CORPUS.replace(/ /g, "·")), []);
  const steps = useMemo(() => computeSteps(initialTokens, 7), [initialTokens]);

  const [step, setStep] = useState(0); // 0 = before any merge
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    if (step >= steps.length) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), 1400);
    return () => clearTimeout(t);
  }, [playing, step, steps.length]);

  const currentTokens =
    step === 0 ? initialTokens : steps[step - 1].tokens;
  const lastMerge = step > 0 ? steps[step - 1] : null;
  const isLast = step >= steps.length;

  return (
    <figure className="border border-[var(--color-rule-strong)] bg-[var(--color-paper-margin)] p-7 md:p-9 relative my-12">
      <div className="flex items-baseline justify-between gap-4 mb-6 flex-wrap">
        <div>
          <p className="folio mb-1">Figure 2</p>
          <p className="chapter-number">how a vocabulary builds itself — byte-pair encoding</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="px-3 py-1.5 font-mono text-xs border border-[var(--color-rule-strong)] bg-[var(--color-paper)] hover:bg-[var(--color-paper-deep)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous merge"
          >
            ‹ back
          </button>
          <button
            onClick={() => {
              if (isLast) {
                setStep(0);
                setPlaying(true);
              } else {
                setPlaying((p) => !p);
              }
            }}
            className="px-3 py-1.5 font-mono text-xs border border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-ink-soft)] transition-colors"
          >
            {isLast ? "↺ replay" : playing ? "❚❚ pause" : "▶ play"}
          </button>
          <button
            onClick={() => setStep((s) => Math.min(steps.length, s + 1))}
            disabled={step >= steps.length}
            className="px-3 py-1.5 font-mono text-xs border border-[var(--color-rule-strong)] bg-[var(--color-paper)] hover:bg-[var(--color-paper-deep)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next merge"
          >
            next ›
          </button>
        </div>
      </div>

      <div className="mb-5">
        <p className="font-display italic text-[18px] text-[var(--color-ink-soft)] mb-1">
          {step === 0 ? (
            <>Start with characters. Spaces shown as <code className="font-mono">·</code></>
          ) : isLast ? (
            <>No more pairs occur twice. The vocabulary stops growing.</>
          ) : (
            <>
              Merge{" "}
              <code className="font-mono text-[var(--color-marker)]">
                {lastMerge!.pair[0]} + {lastMerge!.pair[1]}
              </code>{" "}
              into{" "}
              <code className="font-mono text-[var(--color-sienna)]">
                {lastMerge!.merged}
              </code>{" "}
              — it occurred <strong>{lastMerge!.count}</strong> times.
            </>
          )}
        </p>
      </div>

      {/* Token sequence */}
      <div className="bg-[var(--color-paper)] border border-[var(--color-rule)] p-5 mb-6">
        <p className="chapter-number mb-3">sequence — {currentTokens.length} tokens</p>
        <div className="flex flex-wrap gap-1.5">
          <AnimatePresence mode="popLayout" initial={false}>
            {currentTokens.map((t, i) => (
              <motion.span
                key={`${step}-${i}-${t}`}
                layout
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                className="font-mono text-sm px-2 py-1 border border-[var(--color-rule-strong)] bg-[var(--color-paper-deep)]"
                style={{
                  color:
                    lastMerge && t === lastMerge.merged
                      ? "var(--color-sienna)"
                      : "var(--color-ink)",
                  borderColor:
                    lastMerge && t === lastMerge.merged
                      ? "var(--color-sienna)"
                      : "var(--color-rule-strong)",
                  fontWeight: lastMerge && t === lastMerge.merged ? 600 : 400,
                }}
              >
                {t}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Vocab grows below — like a glossary at the bottom of a manuscript page */}
      <div>
        <p className="chapter-number mb-3">
          vocabulary — {step === 0 ? new Set(initialTokens).size : steps[step - 1].vocab.length} entries
        </p>
        <div className="flex flex-wrap gap-1.5">
          {(step === 0
            ? Array.from(new Set(initialTokens))
            : steps[step - 1].vocab
          ).map((t, i) => (
            <motion.span
              key={`v-${i}-${t}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-xs px-1.5 py-0.5 text-[var(--color-ink-soft)]"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>

      <figcaption className="font-display italic text-[15px] text-[var(--color-ink-faded)] mt-6 leading-snug">
        GPT-4&apos;s real vocabulary is built this same way — just on a few hundred
        billion characters of internet text, run for ≈ 100,000 merges instead of seven.
      </figcaption>
    </figure>
  );
}
