import { TrackHero } from "@/components/layout/track-hero";
import { Callout } from "@/components/ui/callout";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/primitives";

export const metadata = { title: "The AI PM Lens — LLM Decoded" };

const CARDS = [
  {
    n: "01",
    title: "Multimodal Understanding",
    insight: "AI sees patterns, not pictures.",
    body:
      "How images, text, audio, and video all become machine-readable tokens. The same architecture that processes text now handles every modality — just with different tokenizers up front.",
  },
  {
    n: "02",
    title: "Model Economics",
    insight: "Every token is a business decision.",
    body:
      "The best model isn't always the smartest. It's the best capability-per-dollar tradeoff for your use case. Quality, speed, and cost form a triangle — pick two, design around the third.",
  },
  {
    n: "03",
    title: "Inference Costs",
    insight: "Scale breaks bad AI economics.",
    body:
      "AI PMs now manage inference spend the way infra teams manage cloud bills. A demo that costs cents per user becomes a business that loses dollars per user. Plan for it.",
  },
  {
    n: "04",
    title: "Latency Tradeoffs",
    insight: "UX dies after ~3 seconds.",
    body:
      "Faster, slightly-wrong responses often beat slower, perfectly-correct ones. Streaming, speculative decoding, smaller specialist models — all real tools for buying latency back.",
  },
  {
    n: "05",
    title: "Evaluation Systems",
    insight: "Evals are the new PRDs.",
    body:
      "AI products need continuous evaluation — not just QA testing. You can't ship what you can't measure, and human judgment alone doesn't scale. Build automated evals before you build features.",
  },
  {
    n: "06",
    title: "Prompt Architecture",
    insight: "Context > prompts.",
    body:
      "Prompting is becoming system design, not chat input. Routers, RAG, tools, memory — the prompt is the orchestration of all of these, not just the user's question.",
  },
  {
    n: "07",
    title: "Enterprise AI Risks",
    insight: "Cool demos ≠ deployable systems.",
    body:
      "Reliability, privacy, security, and hallucinations are product problems now, not research curiosities. Every enterprise deal lives or dies on how you've answered each one.",
  },
  {
    n: "08",
    title: "AI UX Intuition",
    insight: "Users need steering wheels.",
    body:
      "AI UX is about trust, confidence, control, and recoverability. Show the work. Make it editable. Make the wrong path undoable. Don't ship magic boxes.",
  },
  {
    n: "09",
    title: "Build vs Buy",
    insight: "Today's moat can become tomorrow's commodity.",
    body:
      "Should you build your own models, fine-tune, or just lean on APIs? The right answer changes every six months. Optimize for being able to swap, not for any specific provider.",
  },
  {
    n: "10",
    title: "Production Readiness",
    insight: "Prototype ≠ enterprise-ready.",
    body:
      "Shipping AI prototypes is easy. Production AI systems are hard — observability, fallback chains, cost controls, model upgrades, regression testing. None of it is glamorous. All of it is necessary.",
  },
];

export default function PMPage() {
  return (
    <article>
      <TrackHero
        number="06"
        title="The AI PM Lens"
        tagline="Ten frontier concepts every product person working on AI needs to internalize. Systems thinking over feature thinking."
        color="var(--color-accent-soft)"
      />

      <section className="px-6 lg:px-8 pb-12 max-w-4xl mx-auto">
        <FadeUp>
          <Callout kind="key" title="The PM shift">
            Traditional PM was roadmaps, prioritization, feature delivery. AI-native PM is evals
            and feedback loops, inference cost management, orchestration, systems thinking,
            production deployment. The deliverable changes from &quot;features shipped&quot; to
            &quot;measurable behavior of a system.&quot;
          </Callout>
        </FadeUp>
      </section>

      <section className="px-6 lg:px-8 pb-24 max-w-6xl mx-auto">
        <Stagger className="grid md:grid-cols-2 gap-5">
          {CARDS.map((card) => (
            <StaggerItem key={card.n}>
              <div className="surface-card p-6 h-full">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-xs text-[var(--color-accent-soft)]">
                    {card.n}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight">{card.title}</h3>
                </div>
                <p className="text-sm font-medium text-[var(--color-cyan)] mb-3 italic">
                  &ldquo;{card.insight}&rdquo;
                </p>
                <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed">
                  {card.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="px-6 lg:px-8 pb-24 max-w-4xl mx-auto">
        <FadeUp>
          <Callout kind="warning">
            If you&apos;re still learning AI through random tutorials, you&apos;re already
            behind. Build a real thing. Ship it to real users. Measure what happens. Repeat.
            That&apos;s the only path.
          </Callout>
        </FadeUp>
      </section>
    </article>
  );
}
