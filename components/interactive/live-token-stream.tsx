"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { encode, decode } from "gpt-tokenizer";

/**
 * Live tokenizer that runs as you type.
 * Tokens appear as letterpress-style chips, falling into a horizontal sequence.
 * Each chip shows the token text + its id beneath.
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

  // Auto-resize textarea
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
      {/* Input — looks like writing in a paper margin */}
      <div className="relative">
        <span
          aria-hidden
          className="absolute -left-6 top-0 font-display italic text-[var(--color-ink-faded)] text-[18px] leading-[1.5] select-none"
        >
          ›
        </span>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Type to tokenize"
          rows={1}
          className="w-full block resize-none bg-transparent border-0 border-b border-[var(--color-rule-strong)] focus:border-[var(--color-sienna)] focus:outline-none transition-colors py-2 font-display italic text-[28px] md:text-[36px] leading-[1.3] text-[var(--color-ink)] placeholder:text-[var(--color-ink-ghost)]"
          spellCheck={false}
          placeholder="Type anything…"
        />
      </div>

      {/* The token stream itself */}
      <div className="min-h-[60px]">
        <p className="chapter-number mb-3">tokens — what the model sees</p>
        <div className="flex flex-wrap gap-1.5">
          <AnimatePresence mode="popLayout" initial={false}>
            {tokens.map((tok, i) => {
              const display = tok.text
                .replace(/ /g, "·")
                .replace(/\n/g, "↵")
                .replace(/\t/g, "→");
              return (
                <motion.span
                  key={`${i}-${tok.id}`}
                  layout
                  initial={{ opacity: 0, y: -8, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.12 } }}
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 30,
                    mass: 0.4,
                  }}
                  className="chip"
                  title={`token id ${tok.id}`}
                >
                  <span>{display}</span>
                  <span className="chip-id">{tok.id}</span>
                </motion.span>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {showStats && (
        <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[var(--color-rule)]">
          <Stat label="characters" value={charCount.toString()} />
          <Stat label="tokens" value={tokenCount.toString()} accent />
          <Stat label="chars per token" value={ratio} />
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div
        className="font-display text-[36px] leading-none"
        style={{
          color: accent ? "var(--color-sienna)" : "var(--color-ink)",
        }}
      >
        {value}
      </div>
      <div className="chapter-number mt-1">{label}</div>
    </div>
  );
}
