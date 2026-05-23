import { TrackHero, Section } from "@/components/layout/track-hero";
import { Callout } from "@/components/ui/callout";

export const metadata = { title: "Using LLMs — LLM Decoded" };

export default function UsingLLMsPage() {
  return (
    <article>
      <TrackHero
        number="04"
        title="Using LLMs"
        tagline="What they can do, what they can't, and why. The failure modes, the workarounds, the prompt patterns."
        color="var(--color-emerald)"
      />

      <Section number="4.1" title="Hallucinations — and how to mitigate them">
        <p>
          A model hallucinates when it confidently states something that&apos;s false. This
          isn&apos;t a bug in the traditional sense — it&apos;s a direct consequence of the
          training objective. The model is rewarded for fluent, confident-sounding text. If it
          doesn&apos;t know something, it would rather make a plausible answer than say &quot;I
          don&apos;t know.&quot;
        </p>
        <p>Three mitigations have actually worked in modern models:</p>
        <ol className="space-y-2 my-4 pl-4 list-decimal">
          <li>
            <strong>Train it to say &quot;I don&apos;t know.&quot;</strong> Llama&apos;s team
            does this by interrogating the model with questions, checking which ones it gets
            wrong, and adding training examples that teach it to refuse confidently on those.
          </li>
          <li>
            <strong>Tools — give it the ability to look things up.</strong> Web search means the
            model doesn&apos;t need to remember everything in its parameters; it can refresh its
            memory at runtime.
          </li>
          <li>
            <strong>Reasoning models.</strong> Thinking out loud catches more errors than
            answering instantly.
          </li>
        </ol>
        <Callout kind="warning">
          Even with all these, hallucinations still happen. Always check anything load-bearing.
          Always.
        </Callout>
      </Section>

      <Section number="4.2" title="Tool use">
        <p>
          A modern LLM is not just a single model — it&apos;s a model that can call functions.
          Web search, code execution, file reading, database queries, image generation. The model
          decides when to call a tool, what arguments to pass, and how to interpret the result.
        </p>
        <p>
          From the model&apos;s perspective, tools are just special tokens it can emit. When it
          emits <code>&lt;search&gt;...&lt;/search&gt;</code>, the runtime intercepts, runs the
          search, and stuffs the results back into the context window. The model continues from
          there as if the answer had always been there.
        </p>
        <Callout kind="key">
          Think of the context window as the model&apos;s working memory. Knowledge in the
          parameters is &quot;something it read a year ago.&quot; Knowledge in the context is
          &quot;the open browser tab.&quot;
        </Callout>
      </Section>

      <Section number="4.3" title="Prompt architecture">
        <p>
          &quot;Prompt engineering&quot; got a lot of hype, but the durable lessons are simple
          and rooted in how LLMs actually work:
        </p>
        <ul className="space-y-3 my-4 pl-4">
          <li>
            <strong className="text-[var(--color-emerald)]">Give context, not orders.</strong>{" "}
            The model attends to what&apos;s in its context window. Paste the relevant document.
            Don&apos;t rely on it remembering.
          </li>
          <li>
            <strong className="text-[var(--color-emerald)]">Let it think on tokens.</strong> Each
            token gets a fixed amount of compute. Asking for the answer in one token is asking
            for too much computation per token. Asking it to &quot;think step by step&quot; gives
            it more compute by spreading reasoning across tokens.
          </li>
          <li>
            <strong className="text-[var(--color-emerald)]">Few-shot &gt; zero-shot.</strong>{" "}
            Showing 2–3 examples of the format you want is far more effective than describing it
            in words.
          </li>
          <li>
            <strong className="text-[var(--color-emerald)]">Be specific about the failure
              modes you don&apos;t want.</strong> &quot;If you don&apos;t know, say so&quot;
            actually works.
          </li>
        </ul>
        <Callout kind="insight">
          The single best prompt pattern: paste the data, then ask the question. Most prompt
          engineering is just learning that the model can&apos;t read your mind.
        </Callout>
      </Section>

      <Section number="4.4" title="Context windows and their limits">
        <p>
          The context window is how many tokens the model can attend to at once. GPT-4 has 128k,
          Claude has 200k+, Gemini reaches 1M+. Sounds infinite. It isn&apos;t.
        </p>
        <p>
          Attention is quadratic in context length — doubling the context quadruples the cost.
          Models also get measurably worse at long contexts: the &quot;needle in a haystack&quot;
          gets harder as the haystack grows. There&apos;s a famous &quot;lost in the middle&quot;
          effect where models attend strongly to the start and end of context, less to the middle.
        </p>
        <Callout kind="warning">
          For load-bearing prompts: put critical instructions at the top AND repeat them at the
          bottom. Sounds dumb. Works.
        </Callout>
      </Section>

      <Section number="4.5" title="The Swiss-cheese model of LLM capabilities">
        <p>
          A useful mental model from Karpathy: LLMs are like Swiss cheese. Mostly competent, with
          random holes. A model that can write a publishable PhD thesis can fail at counting the
          number of <code>r</code>s in &quot;strawberry.&quot; A model that can solve graduate
          number theory can confidently claim 9.11 is greater than 9.9.
        </p>
        <p>
          These aren&apos;t signs of stupidity. They&apos;re signs that the model&apos;s
          competence is shaped by training data, by tokenization, by the structure of attention —
          none of which align with how a human would distribute competence.
        </p>
        <Callout kind="key">
          Treat LLMs as tools, not oracles. They&apos;re extremely useful, sometimes brilliant,
          and occasionally hilariously wrong on things a 6-year-old could do. Plan for that.
        </Callout>
      </Section>
    </article>
  );
}
