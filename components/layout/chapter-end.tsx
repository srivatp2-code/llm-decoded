import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * Closing navigation block for chapter pages.
 * Pass next={null} for the final chapter.
 */
export function ChapterEnd({
  next,
}: {
  next: { href: string; label: string } | null;
}) {
  return (
    <section className="max-w-[920px] mx-auto px-6 lg:px-10 py-20">
      <hr className="hairline mb-10" />
      <div className="flex justify-between items-baseline gap-6 flex-wrap">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[14px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          frontispiece
        </Link>
        {next ? (
          <Link
            href={next.href}
            className="group inline-flex items-center gap-2 text-[14px] text-[var(--color-blue-3)] hover:text-[var(--color-text)] transition-colors"
          >
            {next.label}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <span className="font-mono text-[11px] tracking-widest uppercase text-[var(--color-text-muted)]">
            end of book
          </span>
        )}
      </div>
    </section>
  );
}
