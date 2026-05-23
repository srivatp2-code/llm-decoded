"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { TRACKS } from "@/lib/content";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="LLM Decoded home"
        >
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-cyan)] opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-[2px] rounded-[5px] bg-[var(--color-canvas)] flex items-center justify-center">
              <span className="text-[10px] font-mono font-bold text-gradient">LD</span>
            </div>
          </div>
          <span className="font-semibold tracking-tight">LLM Decoded</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {TRACKS.map((t) => {
            const active = pathname.startsWith(`/${t.slug}`);
            return (
              <Link
                key={t.slug}
                href={`/${t.slug}`}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-md transition-colors relative",
                  active
                    ? "text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                )}
              >
                {active && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-[var(--color-surface-2)] rounded-md"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{t.title}</span>
              </Link>
            );
          })}
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="md:hidden p-2 -mr-2 text-[var(--color-text-primary)]"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass overflow-hidden border-t border-[var(--color-border)]"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {TRACKS.map((t) => (
                <Link
                  key={t.slug}
                  href={`/${t.slug}`}
                  className="py-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  <span className="font-mono text-xs text-[var(--color-text-muted)] mr-3">
                    {t.number}
                  </span>
                  {t.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
