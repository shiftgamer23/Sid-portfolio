"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { MapPin } from "lucide-react";
import { useRef } from "react";
import { experience } from "@/data/content";
import { Reveal, SectionHeading, SpotCard } from "./ui";

/** Renders **highlighted** segments of a bullet. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") ? (
          <strong key={i} className="font-medium text-fg">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.3 });

  return (
    <section id="experience" className="relative scroll-mt-20 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" label="Experience" title="Where I've shipped" accent="real systems." />

        <div ref={ref} className="relative pl-8 md:pl-14">
          {/* track + scroll-driven fill */}
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-line md:left-[15px]" />
          <motion.div
            style={{ scaleY }}
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3 md:left-[15px]"
          />

          <div className="space-y-12 md:space-y-16">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={0.05} className="relative">
                {/* node */}
                <span className="absolute -left-8 top-8 grid h-4 w-4 place-items-center md:-left-14 md:h-[34px] md:w-[34px]">
                  <span className="relative h-3 w-3 rounded-full border-2 border-accent-2 bg-bg md:h-4 md:w-4">
                    {job.current && (
                      <span className="absolute inset-[-2px] rounded-full bg-accent-2" style={{ animation: "pulse-ring 2s ease-out infinite" }} />
                    )}
                  </span>
                </span>

                <SpotCard className="p-6 md:p-9">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-line-strong bg-gradient-to-br from-accent/25 to-accent-2/10 font-display text-2xl text-fg md:h-14 md:w-14 md:text-3xl">
                        {job.mono}
                      </span>
                      <div>
                        <p className="eyebrow mb-1.5 text-accent">{job.role}</p>
                        <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{job.company}</h3>
                      </div>
                    </div>
                    <div className="sm:text-right">
                      <p className="inline-flex items-center gap-2 font-mono text-sm text-fg">
                        {job.current && <span className="rounded-full bg-accent-2/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent-2">Now</span>}
                        {job.period}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted sm:justify-end">
                        <MapPin className="h-3.5 w-3.5" /> {job.location}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-7 space-y-3.5">
                    {job.points.map((p, pi) => (
                      <motion.li
                        key={pi}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: pi * 0.06 }}
                        className="flex gap-3 leading-relaxed text-muted"
                      >
                        <span className="mt-[0.62em] h-1 w-1 shrink-0 rounded-full bg-accent-2" />
                        <span><Rich text={p} /></span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {job.tags.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="sr-only">Entry {i + 1} of {experience.length}</span>
                </SpotCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
