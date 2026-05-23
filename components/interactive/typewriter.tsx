"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Single-line typewriter effect with a blinking cursor.
 * Honors prefers-reduced-motion (shows full text instantly).
 */
export function Typewriter({
  text,
  speed = 38,
  startDelay = 250,
  onComplete,
  className,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  onComplete?: () => void;
  className?: string;
}) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setOut(text);
      setDone(true);
      onComplete?.();
      return;
    }

    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      i += 1;
      setOut(text.slice(0, i));
      if (i < text.length) {
        // Slight variance per char so it feels typed, not metered
        const jitter = (Math.random() - 0.5) * 30;
        const ch = text[i - 1];
        const pause = ch === "?" || ch === "." ? 280 : ch === "," ? 140 : speed + jitter;
        timer = setTimeout(tick, Math.max(15, pause));
      } else {
        setDone(true);
        onComplete?.();
      }
    };

    const start = setTimeout(tick, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [text, speed, startDelay, onComplete]);

  return (
    <span className={className}>
      {out}
      <motion.span
        aria-hidden
        className="inline-block w-[3px] h-[0.85em] ml-1 -mb-1 align-baseline"
        style={{ background: "var(--color-sienna)" }}
        animate={done ? { opacity: [1, 0, 1] } : { opacity: 1 }}
        transition={
          done
            ? { duration: 1, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0 }
        }
      />
    </span>
  );
}
