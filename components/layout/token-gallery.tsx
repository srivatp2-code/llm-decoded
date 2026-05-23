"use client";

import { motion } from "framer-motion";

const TILES = [
  { text: "the", id: "262", color: "var(--tile-cyan)", pos: { top: "10%", left: "8%" }, size: 86, rot: -6 },
  { text: "GPT", id: "63", color: "var(--tile-pink)", pos: { top: "4%", left: "32%" }, size: 110, rot: 4 },
  { text: "ize", id: "1096", color: "var(--tile-violet)", pos: { top: "22%", left: "62%" }, size: 96, rot: -3 },
  { text: "•world", id: "1917", color: "var(--tile-orange)", pos: { top: "38%", left: "16%" }, size: 100, rot: 8 },
  { text: "•was", id: "574", color: "var(--tile-green)", pos: { top: "44%", left: "44%" }, size: 92, rot: -5 },
  { text: "•run", id: "1057", color: "var(--tile-yellow)", pos: { top: "32%", left: "74%" }, size: 80, rot: 7 },
  { text: "ing", id: "278", color: "var(--tile-cyan)", pos: { top: "62%", left: "10%" }, size: 72, rot: -10 },
  { text: ".", id: "13", color: "var(--tile-pink)", pos: { top: "68%", left: "36%" }, size: 84, rot: 3 },
  { text: "256", id: "256", color: "var(--tile-violet)", pos: { top: "60%", left: "58%" }, size: 92, rot: 6 },
  { text: "↵", id: "198", color: "var(--tile-orange)", pos: { top: "70%", left: "78%" }, size: 76, rot: -4 },
];

export function TokenGallery() {
  return (
    <section className="relative cinematic-bg-section overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-32 grid lg:grid-cols-[1.05fr_1fr] gap-16 items-center">
        {/* Left: floating tile collage */}
        <div className="relative h-[560px] order-2 lg:order-1">
          {/* Black backdrop "device" with subtle inner glow */}
          <div className="absolute inset-0 rounded-[28px] border border-[var(--color-line)]"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(30, 58, 255, 0.18), transparent), #0a0c1c",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 40px 80px -20px rgba(0,0,0,0.7)",
            }}
          />
          {TILES.map((tile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 22,
                delay: i * 0.06,
              }}
              whileHover={{ scale: 1.06, rotate: 0, zIndex: 20 }}
              className="absolute tile"
              style={{
                top: tile.pos.top,
                left: tile.pos.left,
                width: tile.size,
                height: tile.size,
                background: tile.color,
                transform: `rotate(${tile.rot}deg)`,
                color: "#0a0c1c",
              }}
            >
              <div className="flex flex-col items-center justify-center text-center px-2">
                <span className="text-[15px] leading-none">{tile.text}</span>
                <span className="font-mono text-[9px] opacity-50 mt-1">
                  #{tile.id}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: copy */}
        <div className="order-1 lg:order-2">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-4"
          >
            Inside the vocabulary
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="display-lg mb-6"
          >
            The token shelf.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[16px] text-[var(--color-text-soft)] max-w-[480px] mb-8 leading-relaxed"
          >
            GPT-4 has a hundred thousand of these. Each was discovered, not
            designed — built up from raw bytes by an algorithm that found the
            most common pairs and merged them, over and over. The result is a
            shelf of strange little fragments. Some are words. Some are
            prefixes. Some are punctuation. All have an integer ID, and that
            integer is everything the model ever sees of your text.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-3 gap-6 max-w-[460px]"
          >
            {[
              { stat: "100,277", label: "vocabulary size" },
              { stat: "1.34", label: "tokens per word" },
              { stat: "15T", label: "tokens in training" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display font-bold text-[28px] text-[var(--color-text)] leading-none mb-1.5">
                  {s.stat}
                </div>
                <div className="eyebrow !text-[10px]">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
