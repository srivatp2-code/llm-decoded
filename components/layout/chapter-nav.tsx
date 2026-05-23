"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

const CHAPTERS = [
  { num: "I", title: "Foundations", slug: "foundations" },
  { num: "II", title: "The Transformer", slug: "transformer" },
  { num: "III", title: "Training", slug: "training" },
  { num: "IV", title: "Using LLMs", slug: "using-llms" },
  { num: "V", title: "Building Agents", slug: "agents" },
  { num: "VI", title: "The PM lens", slug: "pm" },
];

export function ChapterNav() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentSlug = pathname.split("/")[1] || "";

  return (
    <>
      {/* Top masthead — minimal, like a book's running head */}
      <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-5 flex items-baseline justify-between">
          <Link
            href="/"
            className="pointer-events-auto group inline-flex items-baseline gap-2 hover:opacity-80 transition-opacity"
            aria-label="LLM Decoded — home"
          >
            <span className="font-display text-[22px] text-[var(--color-ink)] leading-none">
              LLM Decoded
            </span>
            <span className="chapter-number opacity-60">a manuscript</span>
          </Link>
          <div className="hidden md:block folio pointer-events-auto">
            {pathname === "/" ? (
              <span>frontispiece</span>
            ) : (
              <span>
                ch.{" "}
                {CHAPTERS.find((c) => c.slug === currentSlug)?.num ?? "?"}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Vertical chapter rail — only on inner pages, hidden on small screens */}
      {pathname !== "/" && (
        <aside
          aria-label="Chapter navigation"
          className="hidden xl:flex flex-col fixed left-8 top-1/2 -translate-y-1/2 z-30 gap-3 pointer-events-auto"
        >
          {CHAPTERS.map((ch) => {
            const active = ch.slug === currentSlug;
            return (
              <Link
                key={ch.slug}
                href={`/${ch.slug}`}
                className="group flex items-center gap-3"
              >
                <span
                  className="font-mono text-[10px] tracking-widest w-8 transition-colors"
                  style={{
                    color: active
                      ? "var(--color-sienna)"
                      : "var(--color-ink-faded)",
                  }}
                >
                  {ch.num.padEnd(3, "·")}
                </span>
                <span
                  className="font-display text-[15px] italic transition-all"
                  style={{
                    color: active
                      ? "var(--color-ink)"
                      : "var(--color-ink-faded)",
                  }}
                >
                  {ch.title}
                </span>
              </Link>
            );
          })}
        </aside>
      )}

      {/* Bottom reading progress bar */}
      {mounted && pathname !== "/" && (
        <motion.div
          className="fixed bottom-0 left-0 h-[2px] z-40 origin-left"
          style={{
            scaleX: progress,
            width: "100%",
            background: "var(--color-sienna)",
          }}
        />
      )}
    </>
  );
}
