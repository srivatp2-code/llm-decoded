"use client";

import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 26, mass: 0.6 },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export const stagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 24 },
  },
};

type FadeUpProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
};

export function FadeUp({ children, delay = 0, ...rest }: FadeUpProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={fadeUp}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}
