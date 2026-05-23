import { TrackHero, Section } from "@/components/layout/track-hero";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = { title: "Building Agents — LLM Decoded" };

export default function AgentsPage() {
  return (
    <article>
      <TrackHero
        number="05"
        title="Building Agents"
        tagline="From single agent on your laptop, to multi-agent orchestration, to an honest discussion of AGI."
        color="var(--color-rose)"
      />

      <Section number="5.1" title="What is an agent, actually?">
        <p>
          The word &quot;agent&quot; is overloaded. A useful definition: <strong>an agent is an
          LLM in a loop that can take actions, observe the results, and decide what to do
          next.</strong> The loop is the key part. A one-shot prompt is not an agent. An LLM
          that takes a step, looks at what happened, and adapts — that&apos;s an agent.
        </p>
        <Callout kind="key">
          Agent = Model + Tools + Loop + Memory. Strip any of those out and you get something
          weaker. Add more structure and you get something more brittle. The art is in the
          minimal viable amount.
        </Callout>
      </Section>

      <Section number="5.2" title="A single agent, running locally">
        <p>
          You can run a useful agent entirely on your own laptop. No API key, no cloud. The
          recipe:
        </p>
        <ol className="space-y-2 my-4 pl-4 list-decimal">
          <li>
            Install <a href="https://ollama.com">Ollama</a> — it gives you a local server that
            speaks the OpenAI API.
          </li>
          <li>
            Pull a model: <code>ollama pull llama3.2</code> or <code>ollama pull qwen2.5:7b</code>.
            Smaller is faster; 7B–8B parameter models fit on a 16GB MacBook.
          </li>
          <li>Write the loop in ~30 lines of Python.</li>
        </ol>

        <CodeBlock lang="python" filename="agent.py">{`import json
from openai import OpenAI

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

# Define a tool the agent can call
def read_file(path: str) -> str:
    try:
        return open(path).read()
    except Exception as e:
        return f"error: {e}"

TOOLS = {"read_file": read_file}

messages = [{
    "role": "system",
    "content": "You are a helpful agent. Use tools when needed."
}]

while True:
    user = input("you: ").strip()
    if not user: break
    messages.append({"role": "user", "content": user})

    # Agent loop — keep calling the model until it gives a final answer
    while True:
        resp = client.chat.completions.create(
            model="llama3.2",
            messages=messages,
            tools=[{
                "type": "function",
                "function": {
                    "name": "read_file",
                    "description": "Read a file from disk",
                    "parameters": {
                        "type": "object",
                        "properties": {"path": {"type": "string"}},
                        "required": ["path"],
                    },
                },
            }],
        )
        msg = resp.choices[0].message
        messages.append(msg.model_dump())

        if not msg.tool_calls:
            print("agent:", msg.content)
            break

        # Run any tools the model asked for, append results, loop
        for call in msg.tool_calls:
            args = json.loads(call.function.arguments)
            result = TOOLS[call.function.name](**args)
            messages.append({
                "role": "tool",
                "tool_call_id": call.id,
                "content": result,
            })`}</CodeBlock>

        <Callout kind="insight">
          That&apos;s the whole agent. The model decides when to call tools, the runtime executes
          them, the results go back into the conversation. Everything else — memory, planning,
          self-reflection — is patterns layered on top of this loop.
        </Callout>
      </Section>

      <Section number="5.3" title="Multiple agents in parallel">
        <p>
          One agent works on one thing at a time. Multiple agents working in parallel can divide
          and conquer. The simple version:
        </p>
        <ul className="space-y-2 my-4 pl-4">
          <li>
            <strong>Orchestrator + workers</strong> — one agent reads the task, breaks it into
            subtasks, spawns worker agents (in async tasks or separate processes), collects
            their outputs, synthesizes.
          </li>
          <li>
            <strong>Specialized roles</strong> — one agent searches, one summarizes, one writes,
            one critiques. Each agent has a focused system prompt and tool set.
          </li>
          <li>
            <strong>Debate / consensus</strong> — multiple agents independently answer the same
            question, then a judge agent reconciles. Surprisingly effective on hard reasoning.
          </li>
        </ul>

        <CodeBlock lang="python" filename="parallel_agents.py">{`import asyncio
from agent import run_agent  # the loop from §5.2, returning final answer

async def research_topic(topic: str) -> dict:
    # Three workers in parallel: a searcher, a summarizer, a critic
    sources, summary, risks = await asyncio.gather(
        run_agent(f"Find 5 sources on: {topic}", role="researcher"),
        run_agent(f"Write a 3-paragraph summary on: {topic}", role="writer"),
        run_agent(f"List potential gaps or biases on: {topic}", role="critic"),
    )
    # Synthesize
    final = await run_agent(
        f"Combine these into a brief: SOURCES={sources}\\nSUMMARY={summary}\\nRISKS={risks}",
        role="editor",
    )
    return {"brief": final, "sources": sources, "risks": risks}

asyncio.run(research_topic("RLHF vs DPO"))`}</CodeBlock>

        <Callout kind="warning">
          Multi-agent systems compound errors. If each agent is 90% reliable, four in sequence is
          ~65% reliable. Either keep agents loosely coupled (parallel, voting), or invest heavily
          in error recovery between them.
        </Callout>
      </Section>

      <Section number="5.4" title="Toward AGI — what would have to be true">
        <p>
          AGI — artificial general intelligence — has no universally agreed definition. A working
          one: an AI system that can do any intellectual task a competent human can do, reliably,
          without constant supervision.
        </p>
        <p>
          Today&apos;s models are not that. They are spiky — superhuman in some narrow domains,
          subhuman in others. They have no persistent memory between sessions. They don&apos;t
          learn from their mistakes during deployment. They have no robust grasp of their own
          limits. They&apos;re extraordinarily impressive within a single context window and
          surprisingly fragile outside it.
        </p>
        <p>What would need to change?</p>
        <ul className="space-y-2 my-4 pl-4">
          <li>
            <strong>Continual learning</strong> — the ability to update from experience without
            catastrophic forgetting or massive retraining.
          </li>
          <li>
            <strong>Robust reasoning across modalities</strong> — not just text, but vision,
            audio, physical interaction, all integrated.
          </li>
          <li>
            <strong>Agency over hours and days</strong> — sustained goal-directed behavior with
            self-correction, not just minutes of work before getting lost.
          </li>
          <li>
            <strong>Calibrated uncertainty</strong> — knowing what it doesn&apos;t know,
            reliably.
          </li>
          <li>
            <strong>Sample-efficient learning</strong> — figuring out a new domain from a few
            examples, not 100 billion tokens.
          </li>
        </ul>
        <Callout kind="key">
          We&apos;re probably closer than skeptics think and further than hypesters claim. Either
          way, the practical thing you can do today is master the systems we already have. The
          pipeline you just learned — tokenize, embed, attend, train, fine-tune, deploy as
          agents — is the same pipeline that future systems will be built on, even when
          they&apos;re much more capable.
        </Callout>
      </Section>

      <Section number="5.5" title="What to build next">
        <p>You have the foundation. Practical next steps:</p>
        <ul className="space-y-2 my-4 pl-4">
          <li>
            Build a personal research agent — give it web search and a document corpus, have it
            answer questions and cite sources.
          </li>
          <li>
            Build a code agent — let it read files, run tests, and iterate on a small codebase.
            Claude Code is essentially this, polished.
          </li>
          <li>
            Build an eval harness for whatever agent you build. Without evals you cannot tell
            if a prompt change helped or hurt.
          </li>
          <li>
            Read &quot;Sparks of Artificial General Intelligence&quot; (Bubeck et al.) and the
            DeepSeek-R1 paper. Both are real.
          </li>
        </ul>
        <p>
          The field changes fast. The fundamentals don&apos;t. You know them now. Go build.
        </p>
      </Section>
    </article>
  );
}
