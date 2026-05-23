"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { encode, decode } from "gpt-tokenizer";

const PALETTE = [
  "var(--tile-cyan)",
  "var(--tile-pink)",
  "var(--tile-orange)",
  "var(--tile-green)",
  "var(--tile-violet)",
  "var(--tile-yellow)",
];

/**
 * Live tokenizer — letterpress chips that update as you type.
 * Dark cinematic styling.
 */
export function LiveTokenStream({
  initial = "What does ChatGPT actually do?",
  showStats = true,
}: {
  initial?: string;
  showStats?: boolean;
}) {
  const [text, setText] = useState(initial);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const tokens = useMemo(() => {
    try {
      const ids = encode(text);
      return ids.map((id) => {
        let decoded = "";
        try {
          decoded = decode([id]);
        } catch {
          decoded = "·";
        }
        return { id, text: decoded };
      });
    } catch {
      return [];
    }
  }, [text]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = ta.scrollHeight + "px";
  }, [text]);

  const charCount = text.length;
  const tokenCount = tokens.length;
  const ratio = tokenCount > 0 ? (charCount / tokenCount).toFixed(2) : "—";

  return (
    <div className="space-y-6">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Type to tokenize"
          rows={1}
          className="w-full block resize-none bg-transparent border-0 border-b border-[var(--color-line)] focus:border-[var(--color-blue-3)] focus:outline-none transition-colors py-3 font-display text-[22px] md:text-[28px] leading-[1.3] text-[var(--color-text)] placeholder:text-[var(--color-text-faint)]"
          spellCheck={false}
          placeholder="Type anything…"
        />
      </div>

      <div className="min-h-[60px]">
        <p className="eyebrow mb-3">tokens — what the model sees</p>
        <div className="flex flex-wrap gap-1.5">
          <AnimatePresence mode="popLayout" initial={false}>
            {tokens.map((tok, i) => {
              const display = tok.text
                .replace(/ /g, "·")
                .replace(/\n/g, "↵")
                .replace(/\t/g, "→");
              const color = PALETTE[i % PALETTE.length];
              return (
                <motion.span
                  key={`${i}-${tok.id}`}
                  layout
                  initial={{ opacity: 0, y: -6, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.12 } }}
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 30,
                    mass: 0.4,
                  }}
                  className="inline-flex items-baseline gap-1.5 px-2 py-1 rounded-md font-mono text-[13px]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${color}`,
                    color: color,
                  }}
                  title={`token id ${tok.id}`}
                >
                  <span>{display}</span>
                  <span className="font-mono text-[9px] opacity-50">{tok.id}</span>
                </motion.span>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {showStats && (
        <div className="grid grid-cols-3 gap-6 pt-5 border-t border-[var(--color-line)]">
          {[
            { label: "characters", value: charCount.toString() },
            { label: "tokens", value: tokenCount.toString(), accent: true },
            { label: "chars per token", value: ratio },
          ].map((s) => (
            <div key={s.label}>
              <div
                className="font-display font-semibold text-[32px] leading-none mb-1.5"
                style={{ color: s.accent ? "var(--color-blue-3)" : "var(--color-text)" }}
              >
                {s.value}
              </div>
              <div className="eyebrow">{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
