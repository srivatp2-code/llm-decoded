import type { Metadata } from "next";
import { Geist, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/layout/top-nav";

const display = Geist({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LLM Decoded — Inside the machine behind ChatGPT",
  description:
    "A cinematic walkthrough of how large language models actually work — from tokens to agents.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
