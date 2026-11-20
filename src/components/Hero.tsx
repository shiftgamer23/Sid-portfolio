"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, MessageSquareText } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/data/content";
import { GithubIcon, LinkedinIcon, Magnetic } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

const trace = [
  { tag: "run", text: "review_crew.start(pr_diff)", tone: "text-muted" },
  { tag: "▸", text: "supervisor  →  route [style, security, coverage]", tone: "text-accent" },
  { tag: "✓", text: "style_agent      findings returned", tone: "text-accent-2" },
  { tag: "✓", text: "security_agent   findings returned", tone: "text-accent-2" },
  { tag: "✓", text: "coverage_agent   findings returned", tone: "text-accent-2" },
  { tag: "▸", text: "supervisor  →  merge + de-duplicate", tone: "text-accent" },
  { tag: "⇢", text: "stream  SSE → client", tone: "text-accent-3" },
];

function AgentTrace() {
  const [n, setN] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setN((v) => (v >= trace.length + 3 ? 0 : v + 1)), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="card w-full max-w-md overflow-hidden shadow-[0_30px_80px_-30px_rgba(139,124,255,0.35)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-dim">agent.trace</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-accent-2" style={{ animation: "pulse-ring 1.6s ease-out infinite" }} />
            <span className="relative h-1.5 w-1.5 rounded-full bg-accent-2" />
          </span>
          live
        </span>
      </div>
      <div className="min-h-[236px] space-y-2 p-4 font-mono text-[12.5px] leading-relaxed">
        {trace.slice(0, n).map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="flex gap-3"
          >
            <span className={`w-5 shrink-0 ${l.tone}`}>{l.tag}</span>
            <span className="text-fg/90">{l.text}</span>
          </motion.div>
        ))}
        {n < trace.length && (
          <div className="flex gap-3">
            <span className="w-5 shrink-0 text-dim">{">"}</span>
            <span className="caret" />
          </div>
        )}
      </div>
      <div className="border-t border-line px-4 py-2 font-mono text-[10px] text-dim">illustrative trace of ReviewCrew</div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center px-5 pb-20 pt-32 md:px-10">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] py-1.5 pl-2.5 pr-4 text-sm text-muted backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-accent-2" style={{ animation: "pulse-ring 1.8s ease-out infinite" }} />
              <span className="relative h-2 w-2 rounded-full bg-accent-2" />
            </span>
            Currently building at <span className="text-fg">A.P. Moller – Maersk</span>
          </motion.div>

          <p className="eyebrow mb-4">{profile.name}</p>
          <h1 className="text-[2.7rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:whitespace-nowrap lg:text-[3.3rem] xl:text-[4.1rem]">
            {profile.headline.map((line, li) => (
              <span key={li} className="block overflow-hidden pb-[0.08em]">
                {line.split(" ").map((word, wi) => {
                  const emphasis = word === "production.";
                  return (
                    <motion.span
                      key={wi}
                      initial={{ y: "110%", rotate: 4 }}
                      animate={{ y: 0, rotate: 0 }}
                      transition={{ duration: 0.95, delay: 0.45 + li * 0.14 + wi * 0.06, ease }}
                      className={`mr-[0.22em] inline-block origin-bottom-left ${emphasis ? "font-display text-gradient" : ""}`}
                    >
                      {word}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
          >
            {profile.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.25, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-[#6c5ce7] px-6 py-3 font-medium text-white shadow-[0_10px_40px_-10px_rgba(139,124,255,0.8)] transition hover:brightness-110"
              >
                View my work
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#assistant"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-6 py-3 font-medium backdrop-blur transition hover:bg-white/[0.08]"
              >
                <MessageSquareText className="h-4 w-4 text-accent-2" /> Ask my assistant
              </a>
            </Magnetic>
            <div className="ml-1 flex items-center gap-1">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-full text-muted transition hover:bg-white/[0.07] hover:text-fg">
                <GithubIcon />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full text-muted transition hover:bg-white/[0.07] hover:text-fg">
                <LinkedinIcon />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="grid h-11 w-11 place-items-center rounded-full text-muted transition hover:bg-white/[0.07] hover:text-fg">
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 1, ease }}
          className="flex justify-center lg:justify-end"
        >
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="w-full max-w-md">
            <AgentTrace />
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#experience"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-dim [@media(min-height:940px)]:flex"
        aria-label="Scroll down"
      >
        <span className="eyebrow">scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-line-strong">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-accent-2"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
