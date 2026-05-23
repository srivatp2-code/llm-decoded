"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Foundations", href: "/foundations" },
  { label: "Transformer", href: "/transformer" },
  { label: "Training", href: "/training" },
  { label: "Agents", href: "/agents" },
];

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--color-bg-deep)]/70 backdrop-blur-xl border-b border-[var(--color-line)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">
        <Link
          href="/"
          className="display-md font-display tracking-tight text-[var(--color-text)] hover:opacity-90 transition-opacity"
          aria-label="LLM Decoded home"
        >
          DECODED
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-[14px] text-[var(--color-text-soft)] hover:text-[var(--color-text)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/foundations"
            className="hidden md:inline-flex pill pill-light !py-2.5 !px-5 !text-[13px]"
          >
            Begin reading
          </Link>
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 -mr-2"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-[var(--color-line)] bg-[var(--color-bg-deep)]/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-3 text-[15px] text-[var(--color-text-soft)] hover:text-[var(--color-text)]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/foundations"
                className="mt-3 pill pill-light"
              >
                Begin reading
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
