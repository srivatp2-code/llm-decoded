import Link from "next/link";
import { TRACKS } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-cyan)]" />
              <span className="font-semibold">LLM Decoded</span>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] max-w-sm">
              An interactive course on large language models — from tokenization to multi-agent
              systems. Built on the work of Andrej Karpathy and 3Blue1Brown.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
              Tracks
            </h4>
            <ul className="space-y-2">
              {TRACKS.slice(0, 3).map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/${t.slug}`}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  >
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
              &nbsp;
            </h4>
            <ul className="space-y-2">
              {TRACKS.slice(3).map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/${t.slug}`}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  >
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row gap-3 justify-between text-xs text-[var(--color-text-muted)]">
          <p>Adapted with deep gratitude from Karpathy&apos;s lectures and 3Blue1Brown&apos;s visualizations.</p>
          <p>Open source education.</p>
        </div>
      </div>
    </footer>
  );
}
