"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "@/components/interactive/typewriter";
import { LiveTokenStream } from "@/components/interactive/live-token-stream";

const QUESTION = "What actually happens when you press enter on ChatGPT?";

export function ManuscriptHero() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="relative px-6 lg:px-10 pt-32 md:pt-44 pb-20 max-w-[920px] mx-auto">
      {/* Chapter marker — like a real book */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="chapter-number">Frontispiece · Anno MMXXVI</p>
      </motion.div>

      {/* The opening question — typed out */}
      <h1 className="display-xl mb-12">
        <Typewriter
          text={QUESTION}
          speed={40}
          startDelay={400}
          onComplete={() => setRevealed(true)}
        />
      </h1>

      {/* Below the fold of the question — fades in when typing finishes */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: revealed ? 1 : 0,
          y: revealed ? 0 : 8,
        }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-display italic text-[22px] md:text-[26px] text-[var(--color-ink-soft)] mb-16 max-w-[640px] leading-snug">
          A short, illustrated manuscript on the machinery of large language models —
          from the tokens your words become, to the agents they run as.
        </p>

        {/* The live interactive — placed exactly where you'd put a figure in a book */}
        <figure className="relative">
          <div className="flex items-baseline gap-3 mb-5">
            <span className="folio">Figure 1</span>
            <span className="chapter-number">type below — see your text as the model does</span>
          </div>

          <div className="border border-[var(--color-rule-strong)] bg-[var(--color-paper-margin)] p-7 md:p-9 relative">
            {/* Decorative corner marks — like a printed plate */}
            <Corner pos="tl" />
            <Corner pos="tr" />
            <Corner pos="bl" />
            <Corner pos="br" />

            <LiveTokenStream />
          </div>

          <figcaption className="font-display italic text-[15px] text-[var(--color-ink-faded)] mt-4 leading-snug">
            Every model in this book — GPT-4, Claude, Llama, DeepSeek — begins
            with the same first step. Text becomes a sequence of integers. Nothing
            else makes sense until this does.
          </figcaption>
        </figure>

        {/* Scroll cue */}
        <div className="mt-24 flex items-center gap-4 text-[var(--color-ink-faded)]">
          <span className="folio">turn the page</span>
          <motion.svg
            width={40}
            height={14}
            viewBox="0 0 40 14"
            fill="none"
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <path
              d="M2 7 L 35 7 M 28 2 L 35 7 L 28 12"
              stroke="currentColor"
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </motion.svg>
        </div>
      </motion.div>
    </section>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const positions = {
    tl: "top-2 left-2 rotate-0",
    tr: "top-2 right-2 rotate-90",
    bl: "bottom-2 left-2 -rotate-90",
    br: "bottom-2 right-2 rotate-180",
  };
  return (
    <span
      aria-hidden
      className={`absolute pointer-events-none ${positions[pos]}`}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path
          d="M0 3 L 0 0 L 3 0 M 7 0 L 10 0 L 10 3"
          stroke="var(--color-ink-faded)"
          strokeWidth="1"
        />
      </svg>
    </span>
  );
}
