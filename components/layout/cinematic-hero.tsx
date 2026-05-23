"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LightArcs } from "@/components/layout/light-arcs";

// 3D scene is client-only + heavy; lazy load it so SSR/static-export works
const SphereScene = dynamic(
  () => import("@/components/3d/sphere-scene").then((m) => m.SphereScene),
  { ssr: false, loading: () => null }
);

export function CinematicHero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center cinematic-bg overflow-hidden">
      {/* 3D layer — sits behind everything */}
      <SphereScene className="absolute inset-0 z-0" />

      {/* Light arcs layer */}
      <LightArcs />

      {/* Subtle starfield overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 80% 40%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1.5px 1.5px at 35% 70%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 65% 80%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 50% 15%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 10% 60%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1.5px 1.5px at 90% 70%, rgba(255,255,255,0.5), transparent)
          `,
        }}
      />

      {/* === Foreground content === */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-10 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex mb-8"
        >
          <span className="badge">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--color-blue-3)", boxShadow: "0 0 8px var(--color-blue-3)" }}
            />
            LLM Decoded · v2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="display-hero mb-8"
        >
          Inside the machine
          <br />
          that learned to read.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-[18px] md:text-[20px] text-[var(--color-text-soft)] max-w-[640px] mx-auto mb-12 leading-relaxed"
        >
          A cinematic walk through the hidden machinery of large language
          models — tokens, attention, training, agents. Built for the
          intellectually curious. No PhD required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link href="/foundations" className="pill pill-light group">
            Begin reading
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <Link href="/agents" className="pill pill-ghost">
            Skip to agents
          </Link>
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, var(--color-bg-deep) 100%)",
        }}
      />
    </section>
  );
}
