"use client";

import { education } from "@/data/content";
import { Reveal, SectionHeading, SpotCard } from "./ui";

export function Education() {
  return (
    <section id="education" className="relative scroll-mt-20 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="06" label="Education" title="The foundation," accent="and the grades." />
        <div className="grid gap-4 md:grid-cols-3">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.08}>
              <SpotCard className="flex h-full flex-col justify-between p-7">
                <div className="font-display text-6xl text-gradient md:text-7xl">{e.big}</div>
                <div className="mt-10">
                  <p className="font-mono text-xs text-muted">{e.period}</p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug">{e.school}</h3>
                  <p className="mt-1 text-sm text-muted">{e.detail}</p>
                  <p className="mt-1 text-sm text-dim">{e.place}</p>
                </div>
              </SpotCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
