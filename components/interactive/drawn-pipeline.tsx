"use client";

import { motion } from "framer-motion";

/**
 * A hand-drawn-style SVG diagram of the full LLM pipeline,
 * with paths that draw themselves on scroll-into-view.
 * Designed to look like a textbook figure, not a flowchart.
 */
export function DrawnPipeline() {
  return (
    <figure className="my-16">
      <div className="flex items-baseline gap-3 mb-5">
        <span className="folio">Figure 3</span>
        <span className="chapter-number">the whole apparatus, at a glance</span>
      </div>

      <div className="border border-[var(--color-rule-strong)] bg-[var(--color-paper-margin)] p-6 md:p-10 overflow-x-auto">
        <svg
          viewBox="0 0 800 280"
          width="100%"
          className="block min-w-[700px]"
          aria-label="LLM pipeline diagram: text → tokens → embeddings → transformer → logits → sample"
        >
          <defs>
            {/* arrowhead */}
            <marker
              id="arrow-ink"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 L3,5 z" fill="var(--color-ink)" />
            </marker>
          </defs>

          {/* === Boxes (drawn in casual hand) === */}
          {[
            { x: 20, y: 110, w: 120, h: 60, label: "your text", sub: "“hello world”" },
            { x: 180, y: 110, w: 120, h: 60, label: "tokens", sub: "[15339, 1917]" },
            { x: 340, y: 110, w: 120, h: 60, label: "embeddings", sub: "vectors ∈ ℝ⁴⁰⁹⁶" },
            { x: 500, y: 110, w: 130, h: 60, label: "transformer", sub: "96 × (attn + MLP)" },
            { x: 670, y: 110, w: 120, h: 60, label: "next token", sub: "softmax → sample" },
          ].map((b, i) => (
            <g key={i}>
              <motion.rect
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                fill="var(--color-paper)"
                stroke="var(--color-ink)"
                strokeWidth={1.5}
                initial={{ opacity: 0, y: b.y - 6 }}
                whileInView={{ opacity: 1, y: b.y }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.18, ease: "easeOut" }}
              />
              <motion.text
                x={b.x + b.w / 2}
                y={b.y + 26}
                textAnchor="middle"
                fontFamily="var(--font-display)"
                fontSize="17"
                fontStyle="italic"
                fill="var(--color-ink)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.18 + 0.3 }}
              >
                {b.label}
              </motion.text>
              <motion.text
                x={b.x + b.w / 2}
                y={b.y + 46}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="10"
                fill="var(--color-ink-faded)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.18 + 0.45 }}
              >
                {b.sub}
              </motion.text>
            </g>
          ))}

          {/* === Connector arrows, drawn in marker style === */}
          {[
            { from: 140, to: 180 },
            { from: 300, to: 340 },
            { from: 460, to: 500 },
            { from: 630, to: 670 },
          ].map((line, i) => (
            <motion.path
              key={i}
              d={`M${line.from} 140 Q${(line.from + line.to) / 2} ${140 + (i % 2 === 0 ? -4 : 4)} ${line.to} 140`}
              stroke="var(--color-ink)"
              strokeWidth={1.5}
              fill="none"
              strokeLinecap="round"
              markerEnd="url(#arrow-ink)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.18 }}
            />
          ))}

          {/* === Loop arrow at the end: "and the output is fed back in" === */}
          <motion.path
            d="M 730 110 Q 730 30, 400 30 Q 80 30, 80 110"
            stroke="var(--color-sienna)"
            strokeWidth={1.5}
            fill="none"
            strokeDasharray="5 4"
            strokeLinecap="round"
            markerEnd="url(#arrow-ink)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, delay: 1.6, ease: "easeInOut" }}
          />
          <motion.text
            x="400"
            y="22"
            textAnchor="middle"
            fontFamily="var(--font-hand)"
            fontSize="20"
            fill="var(--color-sienna)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2.6 }}
          >
            and again, one token at a time
          </motion.text>

          {/* === Bottom annotation === */}
          <motion.text
            x="400"
            y="220"
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontStyle="italic"
            fontSize="16"
            fill="var(--color-ink-soft)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4 }}
          >
            one forward pass = one token of output
          </motion.text>
          <motion.line
            x1="200"
            y1="195"
            x2="600"
            y2="195"
            stroke="var(--color-ink-faded)"
            strokeWidth="0.6"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.6 }}
          />
          {/* tick marks */}
          {[200, 350, 500, 600].map((x, i) => (
            <motion.line
              key={i}
              x1={x}
              y1="190"
              x2={x}
              y2="200"
              stroke="var(--color-ink-faded)"
              strokeWidth="0.6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.3 + i * 0.05 }}
            />
          ))}
        </svg>
      </div>

      <figcaption className="font-display italic text-[15px] text-[var(--color-ink-faded)] mt-4 leading-snug max-w-[640px]">
        Each block in this diagram corresponds to a chapter of the book. We
        will descend into every one — and you will see, by the end, that there
        is no magic. Only mathematics, gracefully applied.
      </figcaption>
    </figure>
  );
}
