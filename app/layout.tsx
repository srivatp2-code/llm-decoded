import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { ChapterNav } from "@/components/layout/chapter-nav";

const instrument = Instrument_Serif({
  variable: "--font-display",
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const hand = Caveat({
  variable: "--font-hand",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LLM Decoded — A manuscript on large language models",
  description:
    "What actually happens when you press enter on ChatGPT? An illustrated, interactive manuscript on how large language models work — from tokens to agents.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${inter.variable} ${mono.variable} ${hand.variable}`}
    >
      <body className="min-h-full">
        <ChapterNav />
        {children}
      </body>
    </html>
  );
}
