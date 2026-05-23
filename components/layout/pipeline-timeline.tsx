"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const SphereSolo = dynamic(
  () => import("@/components/3d/sphere-solo").then((m) => m.SphereSolo),
  { ssr: false, loading: () => null }
);

const STAGES = [
  {
    name: "Tokenization",
    desc: "Your text becomes a sequence of integers from a vocabulary of ~100,000 subword chunks.",
  },
  {
    name: "Embeddings",
    desc: "Each integer is looked up in a giant table and replaced with a learned 4,096-dim vector.",
  },
  {
    name: "Attention",
    desc: "Vectors talk to each other through queries, keys, and values — the core of every transformer.",
  },
  {
    name: "Sampling",
    desc: "The final vector becomes a probability over the vocabulary. Pick one. Repeat.",
  },
];

export function PipelineTimeline() {
  return (
    <section className="relative cinematic-bg-section overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-32 grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
        {/* Left: text features in a clean grid */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-4"
          >
            See the machine
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="display-lg mb-6"
          >
            The pipeline.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[16px] text-[var(--color-text-soft)] max-w-[460px] mb-12 leading-relaxed"
          >
            Every modern LLM — GPT-4, Claude, Llama, Gemini, DeepSeek — runs the
            same four-stage pipeline. We&apos;ll spend a chapter on each.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {STAGES.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <h3 className="font-display font-semibold text-[19px] text-[var(--color-text)] mb-2 tracking-tight">
                  {s.name}
                </h3>
                <p className="text-[14px] text-[var(--color-text-muted)] leading-relaxed max-w-[260px]">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: 3D sphere + floating data card */}
        <div className="relative h-[520px] hidden lg:block">
          {/* Sphere fills the column */}
          <SphereSolo className="absolute inset-0 z-0" />

          {/* Floating transformer step card, overlapping the sphere */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-8 -right-2 z-10 float-card p-5 w-[360px]"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] text-[var(--color-text-muted)] tracking-widest uppercase">
                inference · token 47
              </span>
              <span className="font-mono text-[11px] text-[var(--color-cyan)]">
                computing
              </span>
            </div>
            <div className="space-y-2.5 font-mono text-[12px]">
              {[
                ["the", 0.42, "var(--color-blue-3)"],
                ["a", 0.21, "var(--color-blue-2)"],
                ["my", 0.13, "var(--color-line-strong)"],
                ["our", 0.08, "var(--color-line-strong)"],
                ["this", 0.06, "var(--color-line-strong)"],
              ].map(([tok, p, color]) => (
                <div key={tok as string} className="flex items-center gap-3">
                  <span className="w-12 text-[var(--color-text-soft)]">{tok}</span>
                  <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(p as number) * 100}%`,
                        background: color as string,
                      }}
                    />
                  </div>
                  <span className="w-12 text-right text-[var(--color-text-muted)]">
                    {((p as number) * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--color-line)] flex items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)]">
              <span>next pick</span>
              <span className="text-[var(--color-text)] font-semibold">→ the</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
