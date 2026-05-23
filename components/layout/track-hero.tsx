"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export function TrackHero({
  number,
  title,
  tagline,
}: {
  number: string;
  title: string;
  tagline: string;
  color?: string;
}) {
  return (
    <header className="relative cinematic-bg-section overflow-hidden pt-32 pb-20">
      <div className="max-w-[920px] mx-auto px-6 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-10"
        >
          <ArrowLeft size={14} /> back to frontispiece
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow mb-4">Chapter {number}</p>
          <h1 className="display-xl mb-6">{title}.</h1>
          <p className="text-[19px] md:text-[22px] text-[var(--color-text-soft)] max-w-[640px] leading-snug">
            {tagline}
          </p>
        </motion.div>
      </div>
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
    <section className="max-w-[920px] mx-auto px-6 lg:px-10 py-16">
      <p className="eyebrow mb-4">§ {number}</p>
      <h2 className="display-md mb-8 max-w-[700px]">{title}</h2>
      <div className="body-prose">{children}</div>
    </section>
  );
}
