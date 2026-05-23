"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ROMAN: Record<string, string> = {
  "01": "I",
  "02": "II",
  "03": "III",
  "04": "IV",
  "05": "V",
  "06": "VI",
};

export function TrackHero({
  number,
  title,
  tagline,
}: {
  number: string;
  title: string;
  tagline: string;
  // color prop kept for back-compat with old call sites; unused in manuscript style
  color?: string;
}) {
  const roman = ROMAN[number] ?? number;
  return (
    <header className="px-6 lg:px-10 max-w-[920px] mx-auto pt-28 pb-12">
      <Link
        href="/"
        className="folio hover:text-[var(--color-sienna)] transition-colors inline-block mb-10"
      >
        ‹ frontispiece
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="chapter-number mb-3">Chapter {roman}</p>
        <h1 className="display-xl mb-6">{title}.</h1>
        <p className="font-display italic text-[22px] md:text-[26px] text-[var(--color-ink-soft)] leading-snug max-w-[640px]">
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
    <section className="px-6 lg:px-10 max-w-[920px] mx-auto py-12 relative">
      <p className="chapter-number mb-4">§ {number}</p>
      <h2 className="display-md mb-8">{title}</h2>
      <div className="book-prose no-drop-cap">{children}</div>
    </section>
  );
}
