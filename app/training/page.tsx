import { TrackHero, Section } from "@/components/layout/track-hero";
import { Callout } from "@/components/ui/callout";
import { TemperatureDemo } from "@/components/interactive/temperature-demo";
import { ChapterEnd } from "@/components/layout/chapter-end";
import { CinematicFooter } from "@/components/layout/cinematic-footer";

export const metadata = { title: "Training — LLM Decoded" };

export default function TrainingPage() {
  return (
    <article>
      <TrackHero
        number="03"
        title="Training"
        tagline="How a base model learns from the internet, how SFT turns it into an assistant, and how RL unlocks reasoning."
        color="var(--color-amber)"
      />

      <Section number="3.1" title="Pretraining: reading the internet">
        <p>
          The first and most expensive stage. Take all of the public internet — maybe 15 trillion
          tokens worth — and train your model to predict the next token over and over. That&apos;s
          it. No labeled data, no instructions, just &quot;what word comes next.&quot;
        </p>
        <p>
          Through this absurdly simple objective, the model learns grammar, syntax, world facts,
          reasoning patterns, code style, mathematical operations, and even basic theory of mind —
          because all of those things are required to predict text the internet was written by
          humans who possessed them.
        </p>
        <Callout kind="insight">
          Pretraining is lossy compression of the internet into a neural network. After
          pretraining, the model is a &quot;document completer.&quot; You feed it &quot;In 1776,
          the United States&quot; and it completes the sentence with statistically plausible
          continuations. It is not yet an assistant.
        </Callout>
        <p>
          To get a sense of scale: GPT-3 pretraining used ~3 × 10^23 floating-point operations
          across thousands of A100 GPUs running for weeks. Cost: ~$5M in compute alone. GPT-4 is
          estimated at $50–100M. Frontier labs train models on data centers that cost billions of
          dollars to build.
        </p>
      </Section>

      <Section number="3.2" title="Sampling: how the model picks words">
        <p>
          After pretraining, the model can output a probability distribution over the next token.
          But how does it actually <em>pick</em> one? You have options:
        </p>
        <ul className="space-y-2 my-4 pl-4">
          <li>
            <strong>Greedy</strong> — always pick the most likely token. Deterministic, but
            repetitive and dull.
          </li>
          <li>
            <strong>Sampling</strong> — randomly pick a token weighted by its probability. More
            creative but also more error-prone.
          </li>
          <li>
            <strong>Temperature</strong> — a knob (0–2+) that flattens or sharpens the
            distribution before sampling. Low temp → near-greedy. High temp → near-uniform.
          </li>
          <li>
            <strong>Top-k / top-p</strong> — only sample from the top k tokens or the top
            cumulative p probability mass, to avoid weird tail tokens.
          </li>
        </ul>

        <TemperatureDemo />

        <Callout kind="key">
          This is why ChatGPT gives different answers to the same prompt. The model itself is
          deterministic — the sampling is what makes outputs feel alive.
        </Callout>
      </Section>

      <Section number="3.3" title="SFT: turning a completer into an assistant">
        <p>
          A pretrained base model is not what you talk to. If you ask it &quot;What&apos;s the
          capital of France?&quot; it might respond with more questions, because in its training
          data, questions are usually followed by more questions (like in a quiz).
        </p>
        <p>
          To turn it into an assistant, you do <strong>Supervised Fine-Tuning (SFT)</strong>. A
          team of human labelers writes thousands of example conversations — each one showing
          what a good assistant response looks like for some query. You then fine-tune the
          pretrained model on these conversations. The model imitates the labelers.
        </p>
        <Callout kind="source" title="Karpathy">
          &quot;When you ask ChatGPT a question, you&apos;re getting a statistical simulation of
          a human data labeler. Not magic. Not a personality. A trained imitation of helpful
          humans following labeling instructions.&quot;
        </Callout>
        <p>
          The SFT dataset is small — maybe ~100k high-quality conversations — but its effect is
          enormous. It dramatically shifts the model&apos;s behavior from &quot;document
          completer&quot; to &quot;helpful assistant.&quot;
        </p>
      </Section>

      <Section number="3.4" title="RLHF: teaching the model what humans prefer">
        <p>
          SFT gets you most of the way, but humans are bad at writing ideal responses from
          scratch. They&apos;re much better at <em>comparing</em> two responses and saying which
          is better. That&apos;s the insight behind <strong>RLHF</strong> — Reinforcement Learning
          from Human Feedback.
        </p>
        <p>How it works:</p>
        <ol className="space-y-2 my-4 pl-4 list-decimal">
          <li>For a prompt, generate several candidate responses from the model.</li>
          <li>Humans rank the responses from best to worst.</li>
          <li>Train a small &quot;reward model&quot; that learns to predict human preferences.</li>
          <li>
            Use reinforcement learning to nudge the main model to produce responses that score
            higher according to the reward model.
          </li>
        </ol>
        <Callout kind="warning">
          RLHF is the step that makes models feel polite, helpful, and aligned. It&apos;s also
          where most of the &quot;safety&quot; behavior comes from. But the reward model is
          itself a neural network — it can be gamed, and aggressive RL can make models &quot;hack
          the reward&quot; in ways that please the model but disappoint humans.
        </Callout>
      </Section>

      <Section number="3.5" title="Reasoning models: RL at scale">
        <p>
          The newest twist (2024+): instead of RL on human preferences for general response
          quality, do RL on <em>verifiable problems</em> — math, code, logic — where the answer
          is checkable. Let the model write out long chains of reasoning, reward it when it gets
          the right answer, and watch what happens.
        </p>
        <p>
          What happens is remarkable: the model spontaneously learns to think out loud, try
          multiple approaches, catch its own mistakes, and self-correct. DeepSeek-R1, OpenAI o1
          and o3, Claude&apos;s extended thinking, Gemini thinking — they all work this way.
        </p>
        <Callout kind="key">
          This is qualitatively different from imitation. The model isn&apos;t copying how a
          human thinks anymore. It&apos;s discovering its own reasoning strategies through trial
          and error — sometimes strategies no human would have used.
        </Callout>
        <p>
          The downside: reasoning models are slow and expensive. They generate thousands of
          internal tokens before committing to an answer. But on hard problems, the accuracy
          gains are dramatic — from 13% to 83% on competition math, in some cases.
        </p>
      </Section>

      <ChapterEnd next={{ href: "/using-llms", label: "Chapter 04 — Using LLMs" }} />
      <CinematicFooter />
    </article>
  );
}
