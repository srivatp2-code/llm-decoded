"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const tokens = [
  "Tokens",
  "→",
  "Embed",
  "→",
  "Attention",
  "→",
  "MLP",
  "→",
  "Logits",
  "→",
  "Sample",
];

export function Hero() {
  return (
    <section className="relative pt-24 pb-32 px-6 lg:px-8 overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 -left-20 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(167, 139, 250, 0.25) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 -right-20 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(103, 232, 249, 0.15) 0%, transparent 70%)",
        }}
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] mb-8"
        >
          <Sparkles size={12} className="text-[var(--color-accent)]" />
          <span className="text-xs text-[var(--color-text-secondary)]">
            From zero AI knowledge → building agents
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95] mb-8 max-w-4xl"
        >
          Large language models,{" "}
          <span className="text-gradient">decoded.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mb-10 leading-relaxed"
        >
          An interactive course on what really happens inside ChatGPT — tokenization,
          transformers, training, and agents. Visualized, animated, and explained from first
          principles.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-20"
        >
          <Link
            href="/foundations"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-accent)] text-[var(--color-canvas)] font-medium hover:bg-[var(--color-accent-soft)] transition-colors"
          >
            Start with Foundations
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border-strong)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-surface-3)] transition-colors"
          >
            Jump to Building Agents
          </Link>
        </motion.div>

        {/* Token flow visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="surface-card p-6 md:p-8"
        >
          <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-5">
            The full pipeline, in one sentence
          </p>
          <div className="flex flex-wrap items-center gap-2 md:gap-3 font-mono text-sm md:text-base">
            {tokens.map((tok, i) => {
              const isArrow = tok === "→";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.6 + i * 0.08,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={
                    isArrow
                      ? "text-[var(--color-text-muted)] text-xl"
                      : "px-3 py-1.5 rounded-md bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-accent-soft)]"
                  }
                >
                  {tok}
                </motion.div>
              );
            })}
          </div>
          <p className="text-[var(--color-text-secondary)] text-sm mt-5 leading-relaxed">
            Every chatbot you&apos;ve ever used does exactly this — chops your text into tokens,
            looks them up in a giant table, lets them talk to each other through attention, and
            samples the next one. We&apos;ll unpack every step.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
