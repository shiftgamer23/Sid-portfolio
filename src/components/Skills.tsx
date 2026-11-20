"use client";

import { Bot, Container, Globe, Server, Terminal } from "lucide-react";
import type { ReactNode } from "react";
import { skillGroups } from "@/data/content";
import { Reveal, SectionHeading, SpotCard } from "./ui";

const icons: Record<string, ReactNode> = {
  bot: <Bot className="h-5 w-5" />,
  server: <Server className="h-5 w-5" />,
  container: <Container className="h-5 w-5" />,
  globe: <Globe className="h-5 w-5" />,
  terminal: <Terminal className="h-5 w-5" />,
};

const marquee = Array.from(new Set(skillGroups.flatMap((g) => g.items)));

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="px-5 md:px-10">
        <div className="mx-auto max-w-6xl">
          <SectionHeading index="05" label="Toolbox" title="The stack behind" accent="the systems." />
        </div>
      </div>

      <Reveal className="marquee relative mb-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee-track flex gap-3">
          {[...marquee, ...marquee].map((s, i) => (
            <span key={i} className="chip px-4 py-2 text-sm">
              {s}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="px-5 md:px-10">
       <div className="mx-auto max-w-6xl">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.06} className={g.span}>
              <SpotCard className="h-full p-6 md:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-line-strong bg-white/[0.04] text-accent-2">
                    {icons[g.icon]}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">{g.title}</h3>
                </div>
                <p className="mb-5 text-sm leading-relaxed text-muted">{g.blurb}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </SpotCard>
            </Reveal>
          ))}
        </div>
       </div>
      </div>
    </section>
  );
}
