"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Copy, CornerDownLeft, FileDown, Hash, Mail, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { nav, profile } from "@/data/content";
import { GithubIcon, LinkedinIcon } from "./ui";

type Cmd = { id: string; label: string; group: string; icon: ReactNode; run: () => void };

export const OPEN_PALETTE = "open-command-palette";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [toast, setToast] = useState("");
  const input = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQ("");
    setSel(0);
  }, []);

  const cmds = useMemo<Cmd[]>(() => {
    const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    const ext = (url: string) => () => window.open(url, "_blank", "noopener");
    return [
      { id: "top", label: "Home", group: "Navigate", icon: <Hash className="h-4 w-4" />, run: go("top") },
      ...nav.map((n) => ({ id: n.id, label: n.label, group: "Navigate", icon: <Hash className="h-4 w-4" />, run: go(n.id) })),
      { id: "education", label: "Education", group: "Navigate", icon: <Hash className="h-4 w-4" />, run: go("education") },
      {
        id: "copy",
        label: "Copy email address",
        group: "Actions",
        icon: <Copy className="h-4 w-4" />,
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(() => {
            setToast("Email copied");
            setTimeout(() => setToast(""), 1800);
          });
        },
      },
      { id: "mail", label: "Send an email", group: "Actions", icon: <Mail className="h-4 w-4" />, run: () => (window.location.href = `mailto:${profile.email}`) },
      { id: "resume", label: "Download resume", group: "Actions", icon: <FileDown className="h-4 w-4" />, run: () => {
          const a = document.createElement("a");
          a.href = profile.resume;
          a.download = profile.resumeName;
          a.click();
        } },
      { id: "gh", label: "Open GitHub", group: "Links", icon: <GithubIcon className="h-4 w-4" />, run: ext(profile.github) },
      { id: "li", label: "Open LinkedIn", group: "Links", icon: <LinkedinIcon className="h-4 w-4" />, run: ext(profile.linkedin) },
    ];
  }, []);

  const list = cmds.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => input.current?.focus(), 30);
  }, [open]);

  const exec = (c?: Cmd) => {
    if (!c) return;
    close();
    setTimeout(c.run, 60);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, list.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") exec(list[sel]);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm"
            onMouseDown={close}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command menu"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-line-strong bg-[#0e0e15]/95 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search className="h-4 w-4 text-dim" />
                <input
                  ref={input}
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setSel(0);
                  }}
                  onKeyDown={onKeyDown}
                  placeholder="Jump to a section or run an action…"
                  aria-label="Search commands"
                  className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-dim"
                />
                <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-dim">ESC</kbd>
              </div>
              <ul className="max-h-[50vh] overflow-y-auto p-2" role="listbox">
                {list.length === 0 && <li className="px-3 py-8 text-center text-sm text-dim">No results</li>}
                {list.map((c, i) => {
                  const header = i === 0 || list[i - 1].group !== c.group ? c.group : null;
                  return (
                    <li key={c.id} role="option" aria-selected={i === sel}>
                      {header && <p className="eyebrow px-3 pb-1.5 pt-3 text-[10px]">{header}</p>}
                      <button
                        onMouseEnter={() => setSel(i)}
                        onClick={() => exec(c)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                          i === sel ? "bg-white/[0.07] text-fg" : "text-muted"
                        }`}
                      >
                        <span className={i === sel ? "text-accent-2" : "text-dim"}>{c.icon}</span>
                        {c.label}
                        {i === sel ? <CornerDownLeft className="ml-auto h-3.5 w-3.5 text-dim" /> : <ArrowRight className="ml-auto h-3.5 w-3.5 opacity-0" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[10px] text-dim">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span className="ml-auto">⌘K / Ctrl K</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full border border-line-strong bg-[#0e0e15] px-4 py-2 text-sm text-accent-2"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
