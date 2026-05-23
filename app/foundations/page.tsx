import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { LiveTokenStream } from "@/components/interactive/live-token-stream";
import { BpeMerge } from "@/components/interactive/bpe-merge";
import { CinematicFooter } from "@/components/layout/cinematic-footer";

export const metadata = { title: "Foundations — LLM Decoded" };

export default function FoundationsPage() {
  return (
    <article>
      {/* Chapter hero with subtle blue radial */}
      <header className="relative cinematic-bg-section overflow-hidden pt-32 pb-20">
        <div className="max-w-[920px] mx-auto px-6 lg:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-10"
          >
            <ArrowLeft size={14} /> back to frontispiece
          </Link>
          <p className="eyebrow mb-4">Chapter 01</p>
          <h1 className="display-xl mb-6">Foundations.</h1>
          <p className="text-[19px] md:text-[22px] text-[var(--color-text-soft)] max-w-[640px] leading-snug">
            Before transformers, before attention — the four ideas every model
            is built upon. Tokens, embeddings, networks, and the simple act of
            adjusting a knob.
          </p>
        </div>
      </header>

      {/* §1 */}
      <Section number="1.1" title="A giant function that predicts one word at a time.">
        <p>
          A large language model is, at its heart, a single mathematical
          function. You give it some text; it returns a <strong>probability</strong>{" "}
          for every possible next word. That is the entire job description.
          Everything else — the personality, the helpfulness, the apparent
          reasoning — emerges from doing this very well, on a great deal of
          text.
        </p>
        <p>
          When you chat with ChatGPT, what is actually happening is this: your
          message is chopped into chunks called <em>tokens</em>, those tokens
          are looked up in a giant table of vectors, those vectors flow through
          a hundred-layer neural network with about a hundred billion knobs,
          and out the other end comes a probability distribution. The system
          picks one — usually at random, weighted by probability — and writes
          it down. Then it does the whole thing again. A response of 200 words
          means 200 trips through the network.
        </p>
        <p>
          The model has <strong>no memory</strong> between sessions. It is a
          stateless function. What feels like memory is just the conversation
          being re-fed each time you press enter.
        </p>
      </Section>

      {/* §2 — Tokens — with live demo */}
      <Section number="1.2" title="A token is not a word. It is something stranger.">
        <p>
          Neural networks operate on numbers. So the first step in any language
          model is to chop your text into discrete units, and map each unit to
          an integer. These units are <strong>tokens</strong>. You might guess
          they are words. They are not.
        </p>
        <p>
          They are sub-word fragments, learned from data. The word{" "}
          <code>tokenization</code>, in GPT-4&apos;s vocabulary, is two tokens:{" "}
          <code>token</code> and <code>ization</code>. The word <code>egg</code>{" "}
          at the start of a sentence is two tokens, but <code> egg</code> with a
          leading space is one. Capitalization matters. Punctuation matters.
        </p>

        <Figure label="Figure 1.1" caption="Type to tokenize — runs entirely in your browser.">
          <LiveTokenStream initial="Tokenization, surprisingly, is most of the magic." />
        </Figure>

        <p>
          Almost every weird behavior of an LLM —{" "}
          <strong>bad at spelling, bad at counting letters, worse at non-English languages,
          terrible at simple arithmetic</strong> — traces back to this. The model
          never sees characters. It sees these chunks.
        </p>
        <p>
          The algorithm that produces these tokens is called <em>byte-pair encoding</em>.
          You start with raw characters and repeatedly find the most frequent
          adjacent pair, merging them into a new symbol. After about a hundred
          thousand merges, you have a vocabulary tuned densely to whatever data
          you trained on.
        </p>

        <BpeMerge />
      </Section>

      {/* §3 — Embeddings */}
      <Section number="1.3" title="Meaning is geometry.">
        <p>
          A tokenizer turns text into integers. Integers, by themselves, mean
          nothing to a neural network. So the very next thing every model does
          is look each token up in a giant table called the{" "}
          <strong>embedding table</strong>, and replace it with a vector — a list
          of about four thousand numbers.
        </p>
        <p>
          Each row of this table is learned during training. After enough
          training, an extraordinary thing emerges: similar concepts end up with
          similar vectors. <code>king</code>, <code>queen</code>, and{" "}
          <code>monarch</code> cluster together. The famous result —
        </p>
        <blockquote>vec(king) − vec(man) + vec(woman) ≈ vec(queen)</blockquote>
        <p>
          This is not magic. It is the consequence of a single fact: words used
          in similar contexts get pushed toward similar regions of space during
          training. The model does not know what <em>king</em> means. It knows
          that king-shaped vectors tend to appear near queen-shaped vectors.
          Meaning, in an LLM, is geometry.
        </p>
      </Section>

      {/* §4 — Neural net */}
      <Section number="1.4" title="A long chain of multiplications.">
        <p>
          Forget the term <em>deep learning</em> for a moment. A neural network
          is, at its core, a very long chain of additions and multiplications.
          Take numbers in. Multiply by weights. Add a bias. Pass through a
          non-linear squashing function. Repeat. Stack a hundred of these
          layers, and you have a transformer. Stack a hundred billion knobs
          across those layers, and you have GPT-4.
        </p>
        <p>
          The trick is not the architecture. The trick is{" "}
          <strong>finding the right values</strong> for those billions of knobs.
          That is what training is: a procedure for discovering, by trial and
          error, which settings make the network&apos;s outputs agree with the
          patterns in its training data.
        </p>
        <p>
          The math is simple — chain rule, basic calculus. What is astonishing
          is the <strong>scale</strong>. Training a frontier model requires
          about 10²³ arithmetic operations. If you could do a billion per
          second, it would take you a hundred million years. We use tens of
          thousands of GPUs working in parallel to bring that down to weeks.
        </p>
        <blockquote>
          &ldquo;Neural networks are just mathematical expressions. Training is
          just finding good settings of those knobs.&rdquo;
        </blockquote>
      </Section>

      {/* Closing nav */}
      <section className="max-w-[920px] mx-auto px-6 lg:px-10 py-20">
        <div className="pt-10 border-t border-[var(--color-line)] flex justify-between items-baseline">
          <Link
            href="/"
            className="text-[14px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            ← frontispiece
          </Link>
          <Link
            href="/transformer"
            className="inline-flex items-center gap-2 text-[14px] text-[var(--color-blue-3)] hover:text-[var(--color-text)] transition-colors"
          >
            Chapter 02 — The Transformer
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <CinematicFooter />
    </article>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-[920px] mx-auto px-6 lg:px-10 py-16">
      <p className="eyebrow mb-4">§ {number}</p>
      <h2 className="display-md mb-8 max-w-[700px]">{title}</h2>
      <div className="body-prose">{children}</div>
    </section>
  );
}

function Figure({
  label,
  caption,
  children,
}: {
  label: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-12 float-card p-6 md:p-8">
      <div className="flex items-baseline gap-3 mb-5">
        <span className="font-mono text-[11px] text-[var(--color-blue-3)] tracking-widest uppercase">
          {label}
        </span>
        <span className="eyebrow">interactive</span>
      </div>
      {children}
      <figcaption className="mt-5 text-[13px] text-[var(--color-text-muted)] leading-snug italic">
        {caption}
      </figcaption>
    </figure>
  );
}
