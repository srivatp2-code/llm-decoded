"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-canvas)]";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-[var(--color-canvas)] hover:bg-[var(--color-accent-soft)]",
  secondary:
    "bg-[var(--color-surface-2)] text-[var(--color-text-primary)] border border-[var(--color-border-strong)] hover:bg-[var(--color-surface-3)]",
  ghost:
    "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)]",
};

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className,
}: CommonProps & { href: string }) {
  return (
    <motion.span whileHover={{ y: -1 }} whileTap={{ y: 0, scale: 0.98 }}>
      <Link href={href} className={cn(base, variants[variant], className)}>
        {children}
      </Link>
    </motion.span>
  );
}

export function Button({
  variant = "primary",
  children,
  className,
  onClick,
  type = "button",
  disabled,
}: CommonProps & {
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ y: -1 }}
      whileTap={{ y: 0, scale: 0.98 }}
      className={cn(base, variants[variant], disabled && "opacity-50 cursor-not-allowed", className)}
    >
      {children}
    </motion.button>
  );
}
