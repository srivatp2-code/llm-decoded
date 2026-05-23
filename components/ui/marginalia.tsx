"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A handwritten margin note — appears to the left of body prose,
 * with a sketched arrow pointing back to the text it references.
 * On small screens it inlines beneath the paragraph in italic.
 */
export function Margin({
  children,
  side = "left",
  arrow = true,
  className,
}: {
  children: ReactNode;
  side?: "left" | "right";
  arrow?: boolean;
  className?: string;
}) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: side === "left" ? -8 : 8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      aria-label="margin note"
      className={cn(
        "block xl:absolute xl:w-[200px]",
        side === "left" ? "xl:-left-[230px]" : "xl:-right-[230px]",
        "xl:top-0",
        "my-3 xl:my-0",
        "font-hand text-[20px] leading-[1.2] text-[var(--color-marker)]",
        className
      )}
    >
      <span className="block">{children}</span>
      {arrow && (
        <svg
          className={cn(
            "hidden xl:block mt-1 text-[var(--color-marker)]",
            side === "right" && "-scale-x-100"
          )}
          width={70}
          height={22}
          viewBox="0 0 70 22"
          fill="none"
          aria-hidden="true"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            d="M2 11 C 15 4, 35 18, 55 11"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            fill="none"
          />
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.9 }}
            d="M55 11 L 48 6 M 55 11 L 50 16"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      )}
    </motion.aside>
  );
}

/**
 * A highlighter pen mark — wraps inline text with a translucent yellow underlay.
 */
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        background:
          "linear-gradient(180deg, transparent 60%, var(--color-highlight) 60%)",
        padding: "0 2px",
      }}
    >
      {children}
    </span>
  );
}

/**
 * A "drawn" sienna underline that draws itself on scroll-into-view.
 */
export function DrawnUnderline({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <motion.svg
        className="absolute -bottom-1 left-0 w-full"
        viewBox="0 0 100 6"
        preserveAspectRatio="none"
        height={6}
        aria-hidden="true"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          d="M1 3 Q 25 0, 50 3 T 99 3"
          stroke="var(--color-sienna)"
          strokeWidth={1.8}
          strokeLinecap="round"
          fill="none"
        />
      </motion.svg>
    </span>
  );
}
