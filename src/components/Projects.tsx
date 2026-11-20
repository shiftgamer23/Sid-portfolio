"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Workflow } from "lucide-react";
import { useState } from "react";
import { profile, projects } from "@/data/content";
import { FlowDiagram } from "./FlowDiagram";
import { GithubIcon, Reveal, SectionHeading, SpotCard } from "./ui";

function ProjectCard({ p }: { p: (typeof projects)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal>
      <SpotCard className="p-6 md:p-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow mb-3 flex items-center gap-2">
              <span className="text-accent-2">{p.index}</span> {p.kicker}
            </p>
            <h3 className="text-3xl font-semibold tracking-tight md:text-5xl">{p.title}</h3>
          </div>
          <div className="flex shrink-0 gap-2">
            {p.github && (
              <a href={p.github} target="_blank" rel="noreferrer" aria-label={`${p.title} on GitHub`} className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition hover:border-line-strong hover:text-fg">
                <GithubIcon />
              </a>
            )}
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer" aria-label={`${p.title} live demo`} className="grid h-11 w-11 place-items-center rounded-full bg-fg text-bg transition hover:scale-105">
                <ArrowUpRight className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{p.summary}</p>

        <div className="mt-8 grid grid-cols-3 gap-3 md:max-w-2xl">
          {p.metrics.map((m) => (
            <div key={m.v} className="min-w-0 rounded-2xl border border-line bg-white/[0.02] px-3 py-4 sm:px-4">
              <div className="font-mono text-xl font-semibold text-gradient-soft sm:text-2xl md:text-3xl">{m.k}</div>
              <div className="mt-1 text-xs leading-snug text-muted">{m.v}</div>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="group mt-9 inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-white/[0.03] px-5 py-2.5 text-sm font-medium transition hover:bg-white/[0.08]"
        >
          <Workflow className="h-4 w-4 text-accent-2" />
          {open ? "Hide architecture" : "Explore architecture"}
          <ChevronDown className={`h-4 w-4 text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-8">
                <FlowDiagram {...p.diagram} />
                <p className="mt-3 text-xs text-dim">Hover a node to trace its connections. Scroll sideways on small screens.</p>
                <ul className="mt-6 grid gap-3 md:grid-cols-2">
                  {p.notes.map((n, i) => (
                    <li key={i} className="rounded-2xl border border-line bg-white/[0.02] p-4 text-sm leading-relaxed text-muted">
                      <span className="mb-2 block font-mono text-xs text-accent-2">0{i + 1}</span>
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SpotCard>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-20 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" label="Selected projects" title="Systems I designed" accent="end to end." />
        <div className="space-y-8">
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
        <Reveal className="mt-10 flex justify-center">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-white/[0.03] px-5 py-2.5 text-sm transition hover:bg-white/[0.08]"
          >
            <GithubIcon className="h-4 w-4" /> More work on GitHub
            <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
