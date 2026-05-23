"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const CHAPTERS = [
  { num: "01", title: "Foundations", slug: "foundations", desc: "Tokens, embeddings, neural networks from scratch." },
  { num: "02", title: "The Transformer", slug: "transformer", desc: "Attention, multi-head, the architecture itself." },
  { num: "03", title: "Training", slug: "training", desc: "Pretraining, SFT, RLHF, reasoning models." },
  { num: "04", title: "Using LLMs", slug: "using-llms", desc: "Hallucinations, tools, prompt architecture." },
  { num: "05", title: "Building Agents", slug: "agents", desc: "Local agents, multi-agent, toward AGI." },
  { num: "06", title: "The PM lens", slug: "pm", desc: "Ten frontier concepts for AI product work." },
];

export function ChapterIndex() {
  return (
    <section className="relative cinematic-bg-section overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-32">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.5 }}
          className="eyebrow mb-4"
        >
          The journey
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="display-xl mb-16 max-w-[760px]"
        >
          Six chapters. Read them in order.
        </motion.h2>

        <ol className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
          {CHAPTERS.map((ch, i) => (
            <motion.li
              key={ch.slug}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link
                href={`/${ch.slug}`}
                className="group grid grid-cols-[60px_1fr_auto] md:grid-cols-[100px_1fr_auto] gap-6 items-center py-8 hover:bg-white/[0.02] -mx-6 px-6 transition-colors"
              >
                <span className="font-mono text-[14px] text-[var(--color-text-muted)] group-hover:text-[var(--color-blue-3)] transition-colors">
                  {ch.num}
                </span>
                <div>
                  <h3 className="display-md mb-1 group-hover:text-[var(--color-blue-3)] transition-colors">
                    {ch.title}
                  </h3>
                  <p className="text-[15px] text-[var(--color-text-muted)] leading-snug">
                    {ch.desc}
                  </p>
                </div>
                <ArrowUpRight
                  size={22}
                  className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] group-hover:rotate-12 transition-all"
                />
              </Link>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
