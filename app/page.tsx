import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/layout/hero";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/primitives";
import { TRACKS } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Tracks */}
      <section className="px-6 lg:px-8 py-24 max-w-7xl mx-auto">
        <FadeUp className="mb-16">
          <p className="text-xs uppercase tracking-wider text-[var(--color-accent)] mb-3">
            Six tracks. Built to be read in order.
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-2xl">
            From your first token to your first agent.
          </h2>
        </FadeUp>

        <Stagger className="grid md:grid-cols-2 gap-5">
          {TRACKS.map((track) => (
            <StaggerItem key={track.slug}>
              <Link
                href={`/${track.slug}`}
                className="group block surface-card surface-card-hover p-7 h-full hover:border-[var(--color-border-strong)] hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="font-mono text-xs" style={{ color: track.color }}>
                    {track.number}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] group-hover:rotate-12 transition-all"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-2 tracking-tight">{track.title}</h3>
                <p className="text-[15px] text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                  {track.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {track.chapters.map((ch) => (
                    <span
                      key={ch}
                      className="text-xs px-2.5 py-1 rounded-md bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* The why */}
      <section className="px-6 lg:px-8 py-24 max-w-4xl mx-auto">
        <FadeUp>
          <p className="text-xs uppercase tracking-wider text-[var(--color-cyan)] mb-3">
            Why this exists
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 leading-tight">
            Most explanations of AI either hand-wave or drown you in math. This one shows
            you the actual machine.
          </h2>
          <div className="space-y-5 text-[var(--color-text-secondary)] text-lg leading-relaxed">
            <p>
              When you type into ChatGPT and hit enter, a 100-billion-parameter neural network
              wakes up and statistically predicts the next word. It does this maybe 200 times
              per response. That&apos;s it. That&apos;s the whole magic trick.
            </p>
            <p>
              But the magic is in the details — in how text becomes tokens, how tokens become
              vectors, how vectors talk to each other through attention, and how a hundred
              billion knobs get tuned by reading half the internet. We&apos;ll go through every
              step.
            </p>
            <p>
              By the end you&apos;ll understand it well enough to build a working agent on your
              own laptop, orchestrate multiple agents in parallel, and have an informed
              opinion on what AGI actually means.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* Big number stats */}
      <section className="px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        <FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { stat: "100B+", label: "Parameters in a frontier model" },
              { stat: "15T", label: "Tokens of pretraining data" },
              { stat: "100K", label: "Vocabulary size (GPT-4)" },
              { stat: "$100M+", label: "Cost to train from scratch" },
            ].map((s, i) => (
              <div key={i} className="surface-card p-6">
                <div className="text-3xl md:text-4xl font-semibold text-gradient mb-2">
                  {s.stat}
                </div>
                <div className="text-sm text-[var(--color-text-secondary)]">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>
    </>
  );
}
