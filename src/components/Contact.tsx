"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Check, Copy, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { profile } from "@/data/content";
import { GithubIcon, LinkedinIcon, Magnetic, Reveal, SectionHeading, SpotCard } from "./ui";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  // Opens the visitor's mail client. Swap for a POST to the backend /contact endpoint once it is deployed.
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Hello from ${f.get("name")}`);
    const body = encodeURIComponent(`${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full rounded-xl border border-line bg-black/30 px-4 py-3 text-[15px] outline-none transition placeholder:text-dim focus:border-accent focus:bg-black/50";

  return (
    <section id="contact" className="relative scroll-mt-20 px-5 pb-10 pt-24 md:px-10 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="07" label="Contact" title="Let's build" accent="something." />

        <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <SpotCard className="flex h-full flex-col justify-between gap-10 p-7 md:p-10">
              <div>
                <p className="max-w-md text-xl leading-relaxed text-muted">
                  Have a problem worth solving, or just want to talk shop? My inbox is open.
                </p>
                <button
                  onClick={copy}
                  className="group relative mt-8 flex w-full items-center justify-between gap-4 rounded-2xl border border-line-strong bg-white/[0.03] px-5 py-4 text-left transition hover:bg-white/[0.07]"
                >
                  <span className="font-mono text-sm sm:text-lg">{profile.email}</span>
                  <span className="relative grid h-8 w-8 shrink-0 place-items-center">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={copied ? "ok" : "copy"}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className={copied ? "text-accent-2" : "text-muted"}
                      >
                        {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </button>
                <p className="mt-2 h-5 text-xs text-accent-2" aria-live="polite">
                  {copied ? "Email copied to clipboard" : ""}
                </p>
                <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
                  {[
                    ["Currently", "AIML Intern, Maersk"],
                    ["Based in", profile.location],
                    ["Graduating", "B.Tech CSE, 2026"],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-[#0b0b11] px-4 py-3.5">
                      <dt className="eyebrow text-[10px]">{k}</dt>
                      <dd className="mt-1 text-sm text-fg">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="flex flex-wrap gap-3">
                <Magnetic>
                  <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm transition hover:bg-white/[0.07]">
                    <GithubIcon className="h-4 w-4" /> GitHub <ArrowUpRight className="h-3.5 w-3.5 text-muted" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm transition hover:bg-white/[0.07]">
                    <LinkedinIcon className="h-4 w-4" /> LinkedIn <ArrowUpRight className="h-3.5 w-3.5 text-muted" />
                  </a>
                </Magnetic>
              </div>
            </SpotCard>
          </Reveal>

          <Reveal delay={0.1}>
            <SpotCard className="h-full p-7 md:p-10">
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="eyebrow mb-2 block">Name</label>
                  <input id="name" name="name" required placeholder="Ada Lovelace" className={field} />
                </div>
                <div>
                  <label htmlFor="email" className="eyebrow mb-2 block">Email</label>
                  <input id="email" name="email" type="email" required placeholder="ada@company.com" className={field} />
                </div>
                <div>
                  <label htmlFor="message" className="eyebrow mb-2 block">Message</label>
                  <textarea id="message" name="message" required rows={5} placeholder="What are you working on?" className={`${field} resize-none`} />
                </div>
                <button type="submit" className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 font-medium text-bg transition hover:bg-white">
                  Send message <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </form>
            </SpotCard>
          </Reveal>
        </div>

        <footer className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-line py-8 text-sm text-dim sm:flex-row">
          <p>© 2026 {profile.name}. Built with Next.js and Framer Motion.</p>
          <div className="flex items-center gap-1">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-white/[0.06] hover:text-fg">
              <GithubIcon className="h-4 w-4" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-white/[0.06] hover:text-fg">
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>
          <a href="#top" className="inline-flex items-center gap-2 transition hover:text-fg">
            Back to top <ArrowUp className="h-4 w-4" />
          </a>
        </footer>
      </div>
    </section>
  );
}
