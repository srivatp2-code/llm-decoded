import Link from "next/link";
import { LiveTokenStream } from "@/components/interactive/live-token-stream";
import { BpeMerge } from "@/components/interactive/bpe-merge";
import { Margin, Highlight, DrawnUnderline } from "@/components/ui/marginalia";

export const metadata = { title: "Foundations — LLM Decoded" };

export default function FoundationsPage() {
  return (
    <article className="pt-28 pb-32">
      {/* Chapter heading */}
      <header className="px-6 lg:px-10 max-w-[920px] mx-auto mb-16">
        <Link
          href="/"
          className="folio hover:text-[var(--color-sienna)] transition-colors inline-block mb-10"
        >
          ‹ frontispiece
        </Link>
        <p className="chapter-number mb-3">Chapter I</p>
        <h1 className="display-xl mb-6">Foundations.</h1>
        <p className="font-display italic text-[22px] md:text-[26px] text-[var(--color-ink-soft)] leading-snug max-w-[640px]">
          Before transformers, before attention — the four ideas every model is
          built upon. Tokens, embeddings, networks, and the simple act of
          adjusting a knob.
        </p>
      </header>

      {/* === §1: What is an LLM === */}
      <section className="px-6 lg:px-10 max-w-[920px] mx-auto py-12 relative">
        <p className="chapter-number mb-4">§ 1 — what is a large language model?</p>
        <h2 className="display-md mb-8">A giant function that predicts one word at a time.</h2>

        <div className="book-prose">
          <p>
            A large language model is, at its heart, a single mathematical
            function. You give it some text, and it returns a{" "}
            <strong>probability</strong> for every possible next word. That is
            the entire job description. Everything else — the personality, the
            helpfulness, the apparent reasoning — emerges from doing this very
            well, on a great deal of text.
          </p>
          <Margin side="left">
            <em>200 words ≈</em>
            <br />
            <em>200 trips</em>
            <br />
            through the network.
          </Margin>
          <p>
            When you chat with ChatGPT, what is actually happening is this:
            your message is chopped into chunks called <em>tokens</em>, those
            tokens are looked up in a giant table of vectors, those vectors
            flow through a hundred-layer neural network with about a hundred
            billion knobs, and out the other end comes a probability
            distribution. The system picks one — usually at random, weighted
            by probability — and writes it down. Then it does the whole thing
            again, with the new word appended.
          </p>
          <p>
            The model has no memory between sessions. It is a stateless
            function. What feels like memory is just the conversation being
            re-fed each time you press enter. You could think of it as a
            savant that wakes up, reads everything in one gulp, speaks one
            word, and goes back to sleep. <Highlight>Over and over, two hundred times.</Highlight>
          </p>
        </div>
      </section>

      <hr className="rule" />

      {/* === §2: Tokens === */}
      <section className="px-6 lg:px-10 max-w-[920px] mx-auto py-12 relative">
        <p className="chapter-number mb-4">§ 2 — tokens</p>
        <h2 className="display-md mb-8">
          A token is not a word.{" "}
          <em className="text-[var(--color-ink-soft)]">It is something stranger.</em>
        </h2>

        <div className="book-prose">
          <p>
            Neural networks operate on numbers. So the first step in any
            language model is to chop your text into discrete units, and map
            each unit to an integer. These units are{" "}
            <DrawnUnderline>tokens</DrawnUnderline>. You might guess they are
            words. They are not.
          </p>
          <p>
            They are <strong>sub-word fragments</strong>, learned from data.
            The word <code>tokenization</code>, in GPT-4&apos;s vocabulary,
            is two tokens: <code>token</code> and <code>ization</code>. The
            word <code>egg</code> at the start of a sentence is two tokens, but{" "}
            <code> egg</code> with a leading space is one. Capitalization
            matters. Punctuation matters. The surrounding context can change
            the tokenization.
          </p>
        </div>

        {/* Live demo, framed as a figure */}
        <figure className="border border-[var(--color-rule-strong)] bg-[var(--color-paper-margin)] p-7 md:p-9 my-12 relative">
          <div className="flex items-baseline gap-3 mb-5">
            <span className="folio">Figure 1.1</span>
            <span className="chapter-number">type to tokenize — runs entirely in your browser</span>
          </div>
          <LiveTokenStream initial="Tokenization, surprisingly, is most of the magic." />
        </figure>

        <div className="book-prose no-drop-cap">
          <p>
            Almost every weird behavior of an LLM —
            <strong> bad at spelling, bad at counting letters, worse at
            non-English languages, terrible at simple arithmetic </strong>—
            traces back to this. The model never sees characters. It sees
            chunks. There is no inner monologue saying &ldquo;s, t, r, a, w,
            b, e, r, r, y&rdquo;; there is just <code>straw</code> and{" "}
            <code>berry</code>, and an attempt to count from those.
          </p>
          <Margin side="left" arrow>
            ask GPT-4
            <br />
            how many r&apos;s
            <br /> are in <em>strawberry</em>.
            <br />
            it does not go well.
          </Margin>
          <p>
            The algorithm that produces these tokens is called{" "}
            <em>byte-pair encoding</em>. You start with raw characters (or
            bytes, in the modern version) and repeatedly find the most
            frequent adjacent pair, and merge them into a new symbol. After
            about a hundred thousand merges, you have a vocabulary tuned
            densely to whatever data you trained on.
          </p>
        </div>

        <BpeMerge />

        <div className="book-prose no-drop-cap">
          <p>
            The corpus above is six lines of nonsense. The real vocabularies —
            for GPT-4, Claude, Llama, Gemini — are trained on hundreds of
            billions of characters of internet text, and run for roughly a
            hundred thousand merges instead of seven. The principle is
            identical. The scale is the difference.
          </p>
        </div>
      </section>

      <hr className="rule" />

      {/* === §3: Embeddings === */}
      <section className="px-6 lg:px-10 max-w-[920px] mx-auto py-12 relative">
        <p className="chapter-number mb-4">§ 3 — embeddings</p>
        <h2 className="display-md mb-8">
          Meaning is geometry.{" "}
          <em className="text-[var(--color-ink-soft)]">Words live in a high-dimensional space.</em>
        </h2>

        <div className="book-prose">
          <p>
            A tokenizer turns text into integers. But integers, by themselves,
            mean nothing to a neural network. So the very next thing every
            model does is look each token up in a giant table called the{" "}
            <strong>embedding table</strong>, and replace it with a{" "}
            <em>vector</em> — a list of about four thousand numbers.
          </p>
          <p>
            Each row of this table is learned during training. After enough
            training, an extraordinary thing emerges: similar concepts end up
            with similar vectors. <code>king</code>, <code>queen</code>, and{" "}
            <code>monarch</code> cluster together. <code>Paris</code> and{" "}
            <code>France</code> sit in a particular geometric relationship.
            And the famous result —
          </p>
          <blockquote>
            vec(king) − vec(man) + vec(woman) ≈ vec(queen)
          </blockquote>
          <Margin side="left">
            this is not a trick.
            <br />
            it is real geometry,
            <br />
            in a real vector space.
          </Margin>
          <p>
            This is not magic. It is the consequence of a single fact: words
            used in similar contexts get pushed toward similar regions of
            space during training. The model does not know what{" "}
            <em>king</em> means. It knows that king-shaped vectors tend to
            appear near queen-shaped vectors, near country-shaped vectors,
            near throne-shaped vectors. <Highlight>Meaning, in an LLM,
            is geometry.</Highlight>
          </p>
        </div>
      </section>

      <hr className="rule" />

      {/* === §4: The neural network === */}
      <section className="px-6 lg:px-10 max-w-[920px] mx-auto py-12 relative">
        <p className="chapter-number mb-4">§ 4 — the neural network itself</p>
        <h2 className="display-md mb-8">
          A long chain of multiplications.{" "}
          <em className="text-[var(--color-ink-soft)]">That is all it is.</em>
        </h2>

        <div className="book-prose">
          <p>
            Forget the term <em>deep learning</em> for a moment. A neural
            network is, at its core, a very long chain of additions and
            multiplications. Take numbers in. Multiply by weights. Add a
            bias. Pass through a non-linear squashing function. Repeat. Stack
            a hundred of these layers, and you have a transformer. Stack a
            hundred billion knobs across those layers, and you have GPT-4.
          </p>
          <p>
            The trick is not the architecture. The trick is{" "}
            <strong>finding the right values</strong> for those billions of
            knobs. That is what training is: a procedure for discovering, by
            trial and error, which settings make the network&apos;s outputs
            agree with the patterns in its training data.
          </p>
          <Margin side="left">
            <em>10²³ operations</em>
            <br />
            ≈ 100 million years
            <br />
            at one billion/sec
          </Margin>
          <p>
            The math is simple — chain rule, basic calculus. What is
            astonishing is the <strong>scale</strong>. Training a frontier
            model requires about a hundred billion-trillion arithmetic
            operations. If you could do a billion of them every second, it
            would take you a hundred million years. We use tens of thousands
            of GPUs working in parallel to bring that down to weeks.
          </p>
        </div>

        <blockquote className="book-prose no-drop-cap">
          &ldquo;Neural networks are just mathematical expressions. Training
          is just finding good settings of those knobs.&rdquo;
          <footer className="font-body not-italic text-sm text-[var(--color-ink-faded)] mt-2">
            — Andrej Karpathy
          </footer>
        </blockquote>
      </section>

      <hr className="rule" />

      {/* === Closing === */}
      <section className="px-6 lg:px-10 max-w-[920px] mx-auto py-12">
        <p className="chapter-number mb-4">end of chapter I</p>
        <h2 className="display-md mb-8">What you should carry forward.</h2>
        <div className="book-prose no-drop-cap">
          <p>You now understand the four pillars:</p>
          <ul className="list-none space-y-3 my-6 pl-0">
            {[
              ["Tokens", "subword chunks, the atoms a model sees"],
              ["Embeddings", "each token ID becomes a learned vector in high-dimensional space"],
              ["Neural network", "a giant chain of multiply-add-squash, with billions of tunable weights"],
              ["Training", "nudging those weights to make outputs match the data"],
            ].map(([term, def]) => (
              <li key={term} className="grid grid-cols-[140px_1fr] gap-4 items-baseline">
                <span className="font-display italic text-[var(--color-sienna)] text-[20px]">
                  {term}
                </span>
                <span className="text-[var(--color-ink-soft)]">{def}</span>
              </li>
            ))}
          </ul>
          <p>
            With these in hand, the rest of the book is a single long
            elaboration: <em>how do the vectors talk to each other?</em> The
            answer is attention, and Chapter II begins there.
          </p>
        </div>

        <div className="mt-16 flex justify-between items-baseline border-t border-[var(--color-rule-strong)] pt-6">
          <Link
            href="/"
            className="font-display italic text-[var(--color-ink-faded)] hover:text-[var(--color-sienna)] transition-colors"
          >
            ‹ frontispiece
          </Link>
          <Link
            href="/transformer"
            className="font-display italic text-[var(--color-sienna)] hover:underline"
          >
            Chapter II — The Transformer →
          </Link>
        </div>
      </section>
    </article>
  );
}
