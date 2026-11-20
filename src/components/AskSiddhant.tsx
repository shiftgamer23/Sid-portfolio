"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, Database, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { knowledge, suggestions } from "@/data/content";
import { Reveal, SectionHeading, SpotCard } from "./ui";

type Msg = { role: "user" | "bot"; text: string; sources?: string[]; ms?: number };

const API = process.env.NEXT_PUBLIC_API_URL; // e.g. https://your-api.onrender.com

const now = () => performance.now();
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Keyword retrieval over the resume knowledge base. Used until the RAG backend is live. */
function retrieveLocal(q: string) {
  const words = q.toLowerCase().split(/[^a-z0-9.+#]+/).filter((w) => w.length >= 3);
  const match = (w: string, kw: string) =>
    w === kw || (w.length >= 4 && kw.startsWith(w)) || (kw.length >= 4 && w.startsWith(kw.slice(0, 5)));
  const scored = knowledge
    .map((k) => ({ k, score: k.keywords.filter((kw) => words.some((w) => match(w, kw))).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  if (!scored.length) return [];
  const top = scored[0].score;
  return scored.filter((x, i) => i === 0 || (i < 2 && x.score >= 2 && x.score >= top * 0.7)).map((x) => x.k);
}

async function askBackend(q: string, onToken: (t: string) => void): Promise<string[] | null> {
  if (!API) return null;
  try {
    // Contract: POST /ask {question} -> text/plain stream; sources in the `x-sources` header (comma separated).
    const res = await fetch(`${API}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: q }),
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok || !res.body) return null;
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      onToken(dec.decode(value, { stream: true }));
    }
    return (res.headers.get("x-sources") ?? "").split(",").filter(Boolean);
  } catch {
    return null;
  }
}

export function AskSiddhant() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  const last = [...msgs].reverse().find((m) => m.role === "bot");

  async function ask(q: string) {
    const question = q.trim();
    if (!question || busy) return;
    setBusy(true);
    setInput("");
    setMsgs((m) => [...m, { role: "user", text: question }, { role: "bot", text: "" }]);
    const t0 = now();
    const patch = (fn: (m: Msg) => Msg) => setMsgs((all) => all.map((m, i) => (i === all.length - 1 ? fn(m) : m)));

    let first = 0;
    const remote = await askBackend(question, (tok) => {
      if (!first) first = Math.round(now() - t0);
      patch((m) => ({ ...m, text: m.text + tok }));
    });
    if (remote) {
      patch((m) => ({ ...m, sources: remote, ms: first }));
    } else {
      await sleep(300);
      first = Math.round(now() - t0);
      const hits = retrieveLocal(question);
      const answer = hits.length
        ? hits.map((h) => h.text).join("\n\n")
        : "I only know what's in Siddhant's resume and projects. Try asking about his work at Maersk or NHPC, the projects, his stack, or how to reach him.";
      for (let i = 0; i < answer.length; i += 3) {
        patch((m) => ({ ...m, text: answer.slice(0, i + 3) }));
        await sleep(12);
      }
      patch((m) => ({ ...m, sources: hits.map((h) => h.source), ms: first }));
    }
    setBusy(false);
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <section id="assistant" className="relative scroll-mt-20 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="04" label="Ask me anything" title="Skip the scrolling." accent="just ask." />

        <Reveal>
          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <SpotCard className="flex h-[520px] flex-col">
              <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
                <Sparkles className="h-4 w-4 text-accent-2" />
                <span className="text-sm font-medium">Ask Siddhant</span>
                <span className="ml-auto rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                  {API ? "live rag" : "demo mode"}
                </span>
              </div>

              <div ref={box} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                {msgs.length === 0 && (
                  <div className="grid h-full place-items-center text-center">
                    <div>
                      <p className="text-lg text-fg">Ask about my work, projects or stack.</p>
                      <p className="mt-2 text-sm text-muted">Answers are grounded in my resume and project write-ups.</p>
                    </div>
                  </div>
                )}
                <AnimatePresence initial={false}>
                  {msgs.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                    >
                      <div
                        className={`max-w-[88%] whitespace-pre-line rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
                          m.role === "user" ? "bg-gradient-to-br from-accent to-[#6c5ce7] text-white" : "border border-line bg-white/[0.04] text-fg/90"
                        }`}
                      >
                        {m.text || <span className="caret" />}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="border-t border-line p-4">
                <div className="mb-3 flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button key={s} onClick={() => ask(s)} disabled={busy} className="chip cursor-pointer disabled:opacity-40">
                      {s}
                    </button>
                  ))}
                </div>
                <form onSubmit={submit} className="flex items-center gap-2 rounded-full border border-line-strong bg-black/30 py-1.5 pl-5 pr-1.5 focus-within:border-accent">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask something…"
                    aria-label="Ask a question"
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-dim"
                  />
                  <button
                    type="submit"
                    disabled={busy || !input.trim()}
                    aria-label="Send"
                    className="grid h-9 w-9 place-items-center rounded-full bg-fg text-bg transition disabled:opacity-30"
                  >
                    <CornerDownLeft className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </SpotCard>

            <SpotCard className="p-6">
              <div className="mb-5 flex items-center gap-2">
                <Database className="h-4 w-4 text-accent" />
                <h3 className="text-sm font-medium">Under the hood</h3>
              </div>
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="eyebrow mb-2">Retrieved from</dt>
                  <dd className="flex flex-wrap gap-2">
                    {last?.sources?.length ? (
                      last.sources.map((s) => (
                        <span key={s} className="chip border-accent-2/40 text-accent-2">
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-dim">Ask a question to see the sources.</span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2">Time to first token</dt>
                  <dd className="font-mono text-2xl">{last?.ms ? `${last.ms} ms` : "—"}</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2">Pipeline</dt>
                  <dd className="space-y-2 text-muted">
                    {["Question", "Retrieve chunks", "Grounded answer", "Stream to browser"].map((s, i) => (
                      <div key={s} className="flex items-center gap-3">
                        <span className="grid h-5 w-5 place-items-center rounded-full border border-line-strong font-mono text-[10px]">{i + 1}</span>
                        {s}
                      </div>
                    ))}
                  </dd>
                </div>
              </dl>
              {!API && (
                <p className="mt-6 rounded-xl border border-line bg-white/[0.02] p-3 text-xs leading-relaxed text-dim">
                  Running on in-browser keyword retrieval. Set NEXT_PUBLIC_API_URL to switch to the deployed RAG backend.
                </p>
              )}
            </SpotCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
