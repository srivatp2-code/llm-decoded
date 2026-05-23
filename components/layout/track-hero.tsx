"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function TrackHero({
  number,
  title,
  tagline,
  color,
}: {
  number: string;
  title: string;
  tagline: string;
  color: string;
}) {
  return (
    <header className="px-6 lg:px-8 pt-16 pb-12 max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-8"
      >
        <ArrowLeft size={14} /> All tracks
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-mono text-sm mb-3" style={{ color }}>
          {number} — Track
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-5">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] max-w-2xl leading-snug">
          {tagline}
        </p>
      </motion.div>
    </header>
  );
}

export function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-6 lg:px-8 py-16 max-w-4xl mx-auto">
      <div className="mb-8">
        <p className="font-mono text-xs text-[var(--color-accent)] mb-2">§ {number}</p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="prose">{children}</div>
    </section>
  );
}
