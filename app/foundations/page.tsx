import { TrackHero, Section } from "@/components/layout/track-hero";
import { Callout } from "@/components/ui/callout";
import { TokenizerDemo } from "@/components/interactive/tokenizer-demo";

export const metadata = { title: "Foundations — LLM Decoded" };

export default function FoundationsPage() {
  return (
    <article>
      <TrackHero
        number="01"
        title="Foundations"
        tagline="Before transformers, before attention — start here. What an LLM actually is, and the math beneath it."
        color="var(--color-accent)"
      />

      <Section number="1.1" title="What is an LLM, really?">
        <p>
          A large language model is a giant mathematical function. You give it some text, and it
          tells you the probability of every possible next word. That&apos;s the entire job
          description.
        </p>
        <p>
          When you chat with ChatGPT, what&apos;s actually happening is that your message gets
          chopped into chunks called <strong>tokens</strong>, those tokens get fed into a neural
          network with around 100 billion knobs, and the network outputs a probability
          distribution over its ~100,000-token vocabulary. The system picks one (usually randomly,
          biased by probability), appends it to the conversation, and runs the whole thing again.
          A response of 200 words means 200 trips through the network.
        </p>
        <Callout kind="key">
          The whole magic trick: predict the next token. Do it well enough on enough data, and an
          entire personality emerges from the statistics.
        </Callout>
        <p>
          The model has no memory between conversations. It doesn&apos;t &quot;know&quot; you.
          Every chat starts fresh — what feels like memory is the entire conversation getting
          re-fed into the model each time you hit enter. The model is a stateless function. You
          could think of it as a savant that wakes up, reads the entire conversation in one gulp,
          says one word, and goes back to sleep — over and over.
        </p>
      </Section>

      <Section number="1.2" title="Tokens: how text becomes numbers">
        <p>
          Neural networks operate on numbers, not characters. So the first step in any LLM
          pipeline is <strong>tokenization</strong> — chopping text into discrete chunks and
          mapping each chunk to an integer.
        </p>
        <p>
          You might guess tokens are words. They&apos;re not. They&apos;re sub-word fragments,
          learned from data. The word <code>tokenization</code> in GPT-4 is actually two tokens:{" "}
          <code>token</code> and <code>ization</code>. The word <code>egg</code> at the start of a
          sentence is two tokens, but <code> egg</code> (with a leading space, mid-sentence) is
          one. Capitalization matters. Punctuation matters. Even the surrounding context can
          change tokenization.
        </p>

        <TokenizerDemo />

        <Callout kind="insight" title="Why this matters">
          Almost every weird LLM behavior — bad at spelling, bad at counting letters, worse at
          non-English languages, terrible at simple arithmetic — traces back to tokenization. The
          model never sees characters. It sees these chunks.
        </Callout>

        <p>
          The algorithm that produces these tokens is called <strong>byte pair encoding</strong>{" "}
          (BPE). You start with raw bytes (256 possible values), and you repeatedly look for the
          most-frequent adjacent pair and merge them into a new token. After ~100,000 merges, you
          have a vocabulary that&apos;s densely packed for whatever data you trained the
          tokenizer on. GPT-4 has 100,277 tokens. Llama 3 has 128,000.
        </p>
      </Section>

      <Section number="1.3" title="Neural networks from scratch">
        <p>
          Forget &quot;deep learning&quot; for a second. A neural network is, at its core, a long
          chain of additions and multiplications. You take numbers, multiply by weights, add bias,
          run through a non-linear squashing function, repeat. Stack a few hundred of these and
          you have a transformer. Stack a few hundred billion knobs across those layers and you
          have GPT-4.
        </p>
        <p>
          The trick is not the architecture. The trick is <strong>finding the right values</strong>{" "}
          for those billions of knobs. That&apos;s what training is: a process for discovering, by
          trial and error, which knob settings make the network&apos;s outputs match the training
          data.
        </p>
        <Callout kind="source" title="Karpathy">
          &quot;Neural networks are just mathematical expressions. They take input data as input,
          they take the weights of the network as input, and the output are your predictions or
          the loss function. Training is just finding good settings of those knobs.&quot;
        </Callout>
      </Section>

      <Section number="1.4" title="The forward & backward pass">
        <p>
          Two operations dominate everything. The <strong>forward pass</strong>: feed input
          through the network, compute the output, compare to the target, measure the error. The{" "}
          <strong>backward pass</strong>: propagate the error backward through the network using
          the chain rule from calculus, computing how each weight contributed to the error.
        </p>
        <p>
          Then you nudge every weight a tiny bit in the direction that reduces the error. Do this
          a few million times across a few trillion tokens, and your random initial weights slowly
          turn into a useful model. This is <strong>gradient descent</strong>, and despite the
          fancy name, it&apos;s really just: try, measure how wrong you are, adjust, try again.
        </p>
        <Callout kind="warning">
          The math is simple — chain rule, basic calculus. What&apos;s mind-boggling is the scale.
          Training GPT-3 required ~10^23 floating-point operations. If you could do a billion
          per second, it would take 100 million years. We use thousands of GPUs working in
          parallel to bring that down to weeks.
        </Callout>
      </Section>

      <Section number="1.5" title="What you should take away">
        <p>You now know the core ingredients:</p>
        <ul className="space-y-2 my-4 pl-4">
          <li>
            <strong className="text-[var(--color-accent-soft)]">Tokens</strong> — sub-word chunks,
            the atoms a model sees
          </li>
          <li>
            <strong className="text-[var(--color-accent-soft)]">Embeddings</strong> — each token
            ID maps to a learned vector of numbers
          </li>
          <li>
            <strong className="text-[var(--color-accent-soft)]">Neural network</strong> — a giant
            function with billions of tunable knobs
          </li>
          <li>
            <strong className="text-[var(--color-accent-soft)]">Forward pass</strong> — compute
            the prediction
          </li>
          <li>
            <strong className="text-[var(--color-accent-soft)]">Backward pass</strong> — figure
            out how to improve the knobs
          </li>
          <li>
            <strong className="text-[var(--color-accent-soft)]">Gradient descent</strong> — nudge
            the knobs, repeat a few trillion times
          </li>
        </ul>
        <p>
          Next: how those numbers actually <em>talk to each other</em> through the most important
          invention in modern AI — attention.
        </p>
      </Section>
    </article>
  );
}
