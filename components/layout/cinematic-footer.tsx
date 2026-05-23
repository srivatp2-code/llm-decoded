import Link from "next/link";

export function CinematicFooter() {
  return (
    <footer className="relative border-t border-[var(--color-line)] cinematic-bg-section">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-12 mb-16">
          <div>
            <div className="display-md mb-3">DECODED</div>
            <p className="text-[15px] text-[var(--color-text-soft)] max-w-[380px] leading-relaxed">
              An interactive course on the machinery of large language
              models — built on the lectures of Andrej Karpathy and the
              visualizations of 3Blue1Brown.
            </p>
          </div>
          <div>
            <h4 className="eyebrow mb-4">Chapters</h4>
            <ul className="space-y-2.5 text-[14px]">
              {["foundations", "transformer", "training"].map((s) => (
                <li key={s}>
                  <Link
                    href={`/${s}`}
                    className="text-[var(--color-text-soft)] hover:text-[var(--color-text)] capitalize"
                  >
                    {s.replace("-", " ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="eyebrow mb-4 invisible">·</h4>
            <ul className="space-y-2.5 text-[14px]">
              {["using-llms", "agents", "pm"].map((s) => (
                <li key={s}>
                  <Link
                    href={`/${s}`}
                    className="text-[var(--color-text-soft)] hover:text-[var(--color-text)] capitalize"
                  >
                    {s === "pm" ? "PM lens" : s.replace("-", " ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--color-line)] flex flex-col md:flex-row justify-between items-baseline gap-3 text-[12px] text-[var(--color-text-muted)]">
          <p>© 2026 — written with respect for those who built this field.</p>
          <p className="font-mono">v3 · cinematic</p>
        </div>
      </div>
    </footer>
  );
}
