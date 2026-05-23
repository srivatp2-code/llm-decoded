import { TrackHero, Section } from "@/components/layout/track-hero";
import { Callout } from "@/components/ui/callout";
import { AttentionDemo } from "@/components/interactive/attention-demo";

export const metadata = { title: "The Transformer — LLM Decoded" };

export default function TransformerPage() {
  return (
    <article>
      <TrackHero
        number="02"
        title="The Transformer"
        tagline="Attention is all you need — visualized, animated, explained from first principles."
        color="var(--color-cyan)"
      />

      <Section number="2.1" title="Embeddings: from token IDs to vectors">
        <p>
          A tokenizer turns text into a sequence of integers. But integers are meaningless to a
          neural network — they need <em>vectors</em>. The first thing every transformer does is
          look up each token in a giant lookup table, called the <strong>embedding table</strong>.
        </p>
        <p>
          Each row of this table is a vector of numbers — say, 4096 numbers per token in a modern
          model. These numbers are learned during training. After training, similar concepts end
          up with similar vectors: <code>king</code>, <code>queen</code>, and <code>monarch</code>{" "}
          all cluster together in the embedding space. The famous result:
        </p>
        <pre className="text-center">
          {`vec("king") − vec("man") + vec("woman") ≈ vec("queen")`}
        </pre>
        <p>
          This isn&apos;t magic. It&apos;s an emergent property of the fact that words used in
          similar contexts get pushed toward similar regions of the high-dimensional embedding
          space during training.
        </p>
        <Callout kind="key">
          The model doesn&apos;t know what &quot;king&quot; means. It just knows that king-shaped
          vectors tend to appear next to queen-shaped vectors and country-shaped vectors. Meaning
          is geometry.
        </Callout>
      </Section>

      <Section number="2.2" title="Attention: tokens talking to each other">
        <p>
          So now we have a sequence of vectors, one per token. The job of attention is to let
          these vectors <strong>communicate</strong>. Each token should be able to look back at
          previous tokens and pull in information that&apos;s relevant to it.
        </p>
        <p>For each token, the model produces three new vectors:</p>
        <ul className="space-y-2 my-4 pl-4">
          <li>
            <strong className="text-[var(--color-cyan)]">Query</strong> — &quot;what am I looking
            for?&quot;
          </li>
          <li>
            <strong className="text-[var(--color-amber)]">Key</strong> — &quot;what do I
            offer?&quot;
          </li>
          <li>
            <strong className="text-[var(--color-emerald)]">Value</strong> — &quot;what do I
            contribute if you pick me?&quot;
          </li>
        </ul>
        <p>
          To decide how much token <em>i</em> should attend to token <em>j</em>, take the dot
          product of <em>i</em>&apos;s query with <em>j</em>&apos;s key. High dot product →
          high attention. Softmax across all keys gives a probability distribution. Multiply that
          distribution by the values, sum it up, and you have a new vector for token <em>i</em>{" "}
          — its &quot;updated&quot; representation, enriched by everything that came before it.
        </p>

        <AttentionDemo />

        <Callout kind="insight">
          Attention is just a fancy weighted average. The weights come from how well each pair of
          tokens &quot;matches.&quot; That&apos;s it. Everything else in a transformer is
          plumbing.
        </Callout>
      </Section>

      <Section number="2.3" title="Multi-head attention">
        <p>
          One attention operation captures one kind of relationship. But language has many — who
          is the subject? What modifies what? What was said earlier? — so transformers run{" "}
          <strong>many attention heads in parallel</strong>, each with its own Q/K/V matrices,
          and concatenate the results.
        </p>
        <p>
          GPT-3 has 96 heads per layer. Each head learns to specialize during training. Some
          heads attend to the previous word. Some attend to subjects. Some attend to anaphora
          (pronoun resolution). You don&apos;t tell them what to do — they sort themselves out.
        </p>
        <Callout kind="source" title="Karpathy">
          &quot;Different tokens will find different other tokens interesting in different ways.
          Heads are how we give the model multiple independent communication channels.&quot;
        </Callout>
      </Section>

      <Section number="2.4" title="The full architecture">
        <p>
          A transformer block is just two things stacked: <strong>multi-head attention</strong>{" "}
          (the communication step) followed by a <strong>feed-forward network</strong> (the
          &quot;thinking&quot; step, where each token processes what it gathered, on its own).
          Add residual connections so gradients can flow, add layer normalization for stability,
          and you have a block.
        </p>
        <p>
          Then you stack maybe 96 of these blocks on top of each other. Information flows
          upward — tokens communicate, think, communicate, think, dozens of times — and at the
          very top you have a final linear layer that maps each token&apos;s vector back to a
          probability distribution over the vocabulary. Take the last token&apos;s prediction,
          sample, and you&apos;ve generated one new word.
        </p>
        <pre>{`Token IDs
    ↓ embedding lookup
Sequence of vectors
    ↓ × N transformer blocks
    │   ├─ Multi-head attention  (communicate)
    │   └─ Feed-forward          (compute)
Output vectors
    ↓ linear + softmax
Probability over vocabulary
    ↓ sample
Next token`}</pre>
        <Callout kind="key">
          That&apos;s the entire architecture. GPT-4, Claude, Gemini, Llama, DeepSeek — every
          frontier LLM is some flavor of this same pattern. The differences are in scale, in
          training data, and in the post-training stages we cover in the next track.
        </Callout>
      </Section>

      <Section number="2.5" title="Position: how the model knows token order">
        <p>
          One subtle problem: attention is &quot;set-based.&quot; It has no built-in sense of
          order. &quot;dog bites man&quot; and &quot;man bites dog&quot; have the same set of
          tokens, but very different meanings.
        </p>
        <p>
          Transformers fix this with <strong>positional encoding</strong> — adding a position
          signal to each token&apos;s embedding before it enters the first block. Modern models
          use a clever scheme called rotary position embeddings (RoPE) that rotates query/key
          vectors based on their position, so attention scores naturally depend on relative
          distance.
        </p>
        <p>You don&apos;t need to know the math. You just need to know that without positional
          encoding, &quot;The cat sat on the mat&quot; would be indistinguishable from &quot;mat
          the on sat cat the&quot;.
        </p>
      </Section>
    </article>
  );
}
