"use client";

import { motion } from "framer-motion";

/**
 * Constellation-style flowing light arcs that trace across the hero.
 * Each path self-draws on mount, with a soft glow filter.
 */
export function LightArcs() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none svg-glow"
      viewBox="0 0 1280 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6ad9ff" stopOpacity="0" />
          <stop offset="30%" stopColor="#9ebcff" stopOpacity="1" />
          <stop offset="70%" stopColor="#cfdfff" stopOpacity="1" />
          <stop offset="100%" stopColor="#6ad9ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="arc-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4d8dff" stopOpacity="0" />
          <stop offset="50%" stopColor="#a8c7ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#4d8dff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Long arching path across the top */}
      <motion.path
        d="M -50 320 Q 280 80, 640 220 Q 1000 360, 1330 140"
        stroke="url(#arc-gradient)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />

      {/* Counter-arc, looser, dipping below */}
      <motion.path
        d="M 1330 480 Q 980 720, 640 560 Q 280 400, -50 640"
        stroke="url(#arc-gradient-2)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      />

      {/* Short flicker arcs */}
      <motion.path
        d="M 120 540 Q 240 480, 380 540"
        stroke="#a8c7ff"
        strokeWidth="0.8"
        fill="none"
        strokeOpacity="0.55"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay: 1.2, ease: "easeOut" }}
      />
      <motion.path
        d="M 940 200 Q 1050 240, 1140 180"
        stroke="#a8c7ff"
        strokeWidth="0.8"
        fill="none"
        strokeOpacity="0.55"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay: 1.4, ease: "easeOut" }}
      />
    </svg>
  );
}
