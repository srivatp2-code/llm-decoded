import Link from "next/link";
import { ManuscriptHero } from "@/components/layout/manuscript-hero";
import { BpeMerge } from "@/components/interactive/bpe-merge";
import { DrawnPipeline } from "@/components/interactive/drawn-pipeline";
import { Margin, Highlight, DrawnUnderline } from "@/components/ui/marginalia";

const CHAPTERS = [
  { num: "I", title: "Foundations", slug: "foundations", desc: "Tokens, embeddings, neural networks from scratch." },
  { num: "II", title: "The Transformer", slug: "transformer", desc: "Attention, multi-head, the architecture itself." },
  { num: "III", title: "Training", slug: "training", desc: "Pretraining, SFT, RLHF, reasoning models." },
  { num: "IV", title: "Using LLMs", slug: "using-llms", desc: "Hallucinations, tools, prompt architecture." },
  { num: "V", title: "Building Agents", slug: "agents", desc: "Local agents, multi-agent, toward AGI." },
  { num: "VI", title: "The PM lens", slug: "pm", desc: "Ten frontier concepts for AI product work." },
];

export default function Home() {
  return (
    <article>
      <ManuscriptHero />

      <hr className="rule" />

      {/* === The book's argument — the long-form pitch === */}
      <section className="px-6 lg:px-10 max-w-[920px] mx-auto py-16 relative">
        <p className="chapter-number mb-6">A note from the author</p>

        <div className="book-prose">
          <p>
            Most explanations of artificial intelligence are either{" "}
            <strong>hand-waving</strong> or <em>impenetrable mathematics</em>. This
            manuscript attempts a third path. We will look at the actual machine — at the
            data that flows through it, the operations it performs, the reasons each piece
            is there — and we will do so with the patience of a textbook and the rhythm
            of a long essay.
          </p>
          <p>
            You will not need to know calculus to begin. You will, by the end, understand
            <Highlight> why ChatGPT confuses 9.11 and 9.9, why it counts the </Highlight>
            <code>r</code>
            <Highlight>s in &ldquo;strawberry&rdquo; wrong, and why all of this is in some sense
            inevitable.</Highlight>
          </p>
          <p>
            The interactive figures throughout are not decorations. They are arguments.
            Type into them. Drag them. Step through them. You learn how a thing works by
            handling it.
          </p>
        </div>

        <Margin side="left">
          The first interactive
          <br /> is up above —
          <br />
          start there.
        </Margin>
      </section>

      <DrawnPipeline />

      {/* === Chapter 1 preview: the BPE animation === */}
      <section className="px-6 lg:px-10 max-w-[920px] mx-auto py-12 relative">
        <p className="chapter-number mb-4">Chapter I, §2 — a preview</p>
        <h2 className="display-lg mb-6">
          A token is not a word.{" "}
          <em className="text-[var(--color-ink-soft)]">It is something stranger.</em>
        </h2>

        <div className="book-prose no-drop-cap">
          <p>
            Before any neural network can read your text, it has to be chopped up. Not
            into words — into <strong>subword fragments</strong>, learned from data by an
            algorithm called <em>byte-pair encoding</em>. The vocabulary of GPT-4 has
            about <DrawnUnderline>one hundred thousand</DrawnUnderline> of these
            fragments, and not one of them was chosen by a human.
          </p>
          <p>
            Below, the algorithm runs on a tiny corpus, in front of you. Step through it.
            Notice how the vocabulary builds itself from nothing.
          </p>
        </div>

        <BpeMerge />

        <div className="book-prose no-drop-cap">
          <blockquote>
            &ldquo;Tokenization is at the heart of much weirdness in LLMs. Don&apos;t
            brush it off.&rdquo;
            <footer className="font-body not-italic text-sm text-[var(--color-ink-faded)] mt-2">
              — Andrej Karpathy
            </footer>
          </blockquote>
        </div>
      </section>

      <hr className="rule" />

      {/* === Table of contents — like a real book === */}
      <section className="px-6 lg:px-10 max-w-[920px] mx-auto py-16">
        <p className="chapter-number mb-3">Contents</p>
        <h2 className="display-lg mb-12">Six chapters, in reading order.</h2>

        <ol className="space-y-0 border-t border-[var(--color-rule-strong)]">
          {CHAPTERS.map((ch) => (
            <li key={ch.slug} className="border-b border-[var(--color-rule)] group">
              <Link
                href={`/${ch.slug}`}
                className="grid grid-cols-[60px_1fr_auto] md:grid-cols-[80px_1fr_auto] gap-4 md:gap-8 items-baseline py-6 hover:bg-[var(--color-paper-margin)] -mx-4 px-4 transition-colors"
              >
                <span className="font-display italic text-[28px] text-[var(--color-sienna)] leading-none">
                  {ch.num}
                </span>
                <div>
                  <h3 className="font-display text-[24px] md:text-[28px] leading-tight mb-1">
                    {ch.title}
                  </h3>
                  <p className="text-[15px] text-[var(--color-ink-soft)] leading-snug">
                    {ch.desc}
                  </p>
                </div>
                <span className="font-display italic text-[15px] text-[var(--color-ink-faded)] group-hover:text-[var(--color-sienna)] transition-colors whitespace-nowrap">
                  read →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <hr className="rule" />

      {/* === Colophon === */}
      <section className="px-6 lg:px-10 max-w-[920px] mx-auto py-16 pb-32">
        <p className="chapter-number mb-3">Colophon</p>
        <div className="book-prose no-drop-cap text-[var(--color-ink-soft)]">
          <p>
            Adapted, with deep gratitude, from{" "}
            <a href="https://www.youtube.com/c/AndrejKarpathy">Andrej Karpathy&apos;s</a>{" "}
            lectures on building neural networks from scratch, and from{" "}
            <a href="https://www.3blue1brown.com">3Blue1Brown&apos;s</a> visualizations
            of the transformer.
          </p>
          <p>
            Set in <em>Instrument Serif</em> (display), <em>Inter</em> (body),{" "}
            <em>JetBrains Mono</em> (code), and <em>Caveat</em> (the marginalia).
            Built with <a href="https://nextjs.org">Next.js</a> and{" "}
            <a href="https://motion.dev">Framer Motion</a>. Set on a warm paper
            background, by deliberate choice. The author was tired of dark gradients.
          </p>
        </div>
      </section>
    </article>
  );
}
