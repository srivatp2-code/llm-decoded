"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const SphereSolo = dynamic(
  () => import("@/components/3d/sphere-solo").then((m) => m.SphereSolo),
  { ssr: false, loading: () => null }
);

/**
 * The "Enter a new era of Web 4.0"-style section.
 * One enormous 3D sphere as the backdrop, badge + headline + subhead.
 */
export function EraSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden cinematic-bg-vignette">
      {/* Big solo sphere as ambient backdrop */}
      <SphereSolo className="absolute inset-0 z-0" />

      <div className="relative z-10 max-w-[920px] mx-auto px-6 lg:px-10 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.6 }}
          className="inline-flex mb-8"
        >
          <span className="badge">Why this book exists</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="display-xl mb-8"
        >
          The most consequential
          <br />
          machine of our lifetime.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-[17px] md:text-[19px] text-[var(--color-text-soft)] max-w-[620px] mx-auto leading-relaxed"
        >
          Most explanations of AI either hand-wave or drown you in math. This
          one shows you the actual apparatus — what tokens become, how
          attention works, why training costs a hundred million dollars, and
          how to build an agent on your laptop in thirty lines of code.
        </motion.p>
      </div>
    </section>
  );
}
