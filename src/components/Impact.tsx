"use client";

import { animate, AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { impact, type ImpactSource } from "@/data/content";
import { Reveal, SectionHeading, SpotCard } from "./ui";

const filters: ("All" | ImpactSource)[] = ["All", "Maersk", "NHPC"];

const badge: Record<ImpactSource, string> = {
  Maersk: "border-accent-2/30 bg-accent-2/10 text-accent-2",
  NHPC: "border-accent/30 bg-accent/10 text-accent",
};

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const c = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => (el.textContent = Math.round(v).toString()) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      0
    </span>
  );
}

/** A single block that splits into independent services, on a loop. */
function SplitVisual() {
  const [split, setSplit] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-60px" });
  useEffect(() => {
    if (!inView) return;
    const first = setTimeout(() => setSplit(true), 500);
    const id = setInterval(() => setSplit((s) => !s), 2800);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [inView]);

  return (
    <div ref={ref} className="relative mt-8 flex h-40 items-center justify-center md:h-48" aria-hidden>
      <motion.div
        animate={{ gap: split ? 14 : 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
        className="grid grid-cols-3"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              borderRadius: split ? 12 : 0,
              backgroundColor: split ? "rgba(61,224,197,0.12)" : "rgba(139,124,255,0.16)",
              borderColor: split ? "rgba(61,224,197,0.55)" : "rgba(139,124,255,0.25)",
              y: split && i % 3 === 1 ? 12 : 0,
            }}
            transition={{ type: "spring", stiffness: 140, damping: 18, delay: split ? i * 0.04 : 0 }}
            className="grid h-14 w-16 place-items-center border md:h-16 md:w-20"
          >
            <motion.span animate={{ opacity: split ? 1 : 0 }} className="h-1.5 w-1.5 rounded-full bg-accent-2" />
          </motion.div>
        ))}
      </motion.div>
      <motion.span
        animate={{ opacity: split ? 0 : 1 }}
        className="pointer-events-none absolute font-mono text-xs uppercase tracking-[0.3em] text-fg/70"
      >
        monolith
      </motion.span>
    </div>
  );
}

export function Impact() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const items = impact.filter((i) => filter === "All" || i.source === filter);
  const count = (f: (typeof filters)[number]) => (f === "All" ? impact.length : impact.filter((i) => i.source === f).length);

  return (
    <section id="impact" className="relative scroll-mt-20 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="02" label="Impact" title="Outcomes, not" accent="just output." />

        <Reveal className="mb-8">
          <div role="tablist" aria-label="Filter impact by source" className="inline-flex flex-wrap gap-1 rounded-full border border-line bg-white/[0.02] p-1">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`relative rounded-full px-4 py-1.5 text-sm transition-colors ${filter === f ? "text-bg" : "text-muted hover:text-fg"}`}
              >
                {filter === f && (
                  <motion.span layoutId="impact-pill" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">
                  {f} <span className="font-mono text-xs opacity-60">{count(f)}</span>
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((it) => (
              <motion.div
                key={it.label}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                className={`min-w-0 ${it.feature ? "sm:col-span-2 lg:row-span-2" : ""}`}
              >
                <SpotCard className={`flex h-full flex-col p-6 md:p-7 ${it.feature ? "md:p-9" : ""}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${badge[it.source]}`}>{it.source}</span>
                    <span className="truncate font-mono text-[11px] text-dim">{it.context}</span>
                  </div>

                  <div className={`mt-6 font-semibold tracking-tight ${it.feature ? "text-4xl md:text-6xl" : it.text ? "text-3xl md:text-4xl" : "text-5xl"}`}>
                    {it.text ? (
                      <span className="font-display font-normal text-gradient">{it.text}</span>
                    ) : (
                      <>
                        {it.prefix && <span className="text-accent-2">{it.prefix}</span>}
                        <Counter to={it.value ?? 0} />
                        {it.suffix && <span className="text-accent-2">{it.suffix}</span>}
                      </>
                    )}
                  </div>
                  <p className={`mt-3 leading-snug text-muted ${it.feature ? "max-w-lg text-lg" : "text-sm"}`}>{it.label}</p>
                  {it.feature && <SplitVisual />}
                </SpotCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
