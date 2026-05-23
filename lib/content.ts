export const TRACKS = [
  {
    slug: "foundations",
    title: "Foundations",
    tagline: "What an LLM actually is — and the math beneath it",
    description:
      "Tokenization, neural networks from scratch, gradient descent, the building blocks every transformer is made of.",
    chapters: [
      "What is an LLM?",
      "Tokenization (BPE)",
      "Neural networks from scratch",
      "Forward & backward pass",
    ],
    color: "var(--color-accent)",
    number: "01",
  },
  {
    slug: "transformer",
    title: "The Transformer",
    tagline: "Attention is all you need — visualized",
    description:
      "Embeddings, queries/keys/values, multi-head attention, position encoding, and the full forward pass of a decoder-only transformer.",
    chapters: ["Embeddings", "Attention mechanism", "Multi-head attention", "Full architecture"],
    color: "var(--color-cyan)",
    number: "02",
  },
  {
    slug: "training",
    title: "Training",
    tagline: "Pretraining, SFT, RLHF — and reasoning models",
    description:
      "How a base model learns from the internet, how SFT turns it into an assistant, and how RL unlocks reasoning.",
    chapters: ["Pretraining", "SFT (supervised fine-tuning)", "RLHF", "Reasoning models & RL"],
    color: "var(--color-amber)",
    number: "03",
  },
  {
    slug: "using-llms",
    title: "Using LLMs",
    tagline: "What they can do, what they can't, why",
    description:
      "Hallucinations and their mitigations, tool use (web search, code), prompt architecture, and the failure modes you need to know.",
    chapters: ["Hallucinations", "Tool use", "Prompt architecture", "Context windows"],
    color: "var(--color-emerald)",
    number: "04",
  },
  {
    slug: "agents",
    title: "Building Agents",
    tagline: "From single agent to multi-agent to AGI",
    description:
      "Build a local agent with Ollama, orchestrate multiple agents in parallel, and what the road to AGI actually looks like.",
    chapters: ["Single agent (local)", "Multi-agent orchestration", "Toward AGI"],
    color: "var(--color-rose)",
    number: "05",
  },
  {
    slug: "pm",
    title: "The AI PM lens",
    tagline: "The 10 frontier AI PM cards",
    description:
      "Multimodal understanding, model economics, inference costs, latency, evaluation, prompt architecture, enterprise risks, AI UX, build-vs-buy, production readiness.",
    chapters: ["The 10 cards", "Systems > Features"],
    color: "var(--color-accent-soft)",
    number: "06",
  },
] as const;

export type Track = (typeof TRACKS)[number];
