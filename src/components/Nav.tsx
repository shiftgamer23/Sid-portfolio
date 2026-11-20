"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Command, Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { nav, profile } from "@/data/content";
import { OPEN_PALETTE } from "./CommandPalette";

export function Nav() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    const top = document.getElementById("top");
    if (top) io.observe(top);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-3"
      />
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <nav
          className={`flex w-full max-w-4xl items-center justify-between rounded-full border px-2 py-2 pl-5 backdrop-blur-xl transition-all duration-300 ${
            scrolled ? "border-line-strong bg-bg/70 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]" : "border-line bg-bg/30"
          }`}
          aria-label="Primary"
        >
          <a href="#top" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-accent to-accent-2 text-[11px] text-bg">
              S
            </span>
            <span className="hidden sm:inline">siddhant</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className={`relative block rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    active === n.id ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {active === n.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.07]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{n.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE))}
              aria-label="Open command menu"
              className="hidden items-center gap-1.5 rounded-full border border-line px-2.5 py-1.5 font-mono text-[11px] text-muted transition hover:border-line-strong hover:text-fg lg:flex"
            >
              <Command className="h-3 w-3" />K
            </button>
            <a
              href={profile.resume}
              download={profile.resumeName}
              className="flex items-center gap-1.5 rounded-full bg-fg px-4 py-1.5 text-sm font-medium text-bg transition hover:bg-white"
            >
              <Download className="h-3.5 w-3.5" /> Resume
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="grid h-8 w-8 place-items-center rounded-full text-muted hover:text-fg md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              className="absolute top-16 w-[calc(100%-2rem)] max-w-4xl rounded-3xl border border-line-strong bg-bg/90 p-3 backdrop-blur-xl md:hidden"
            >
              {nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-muted hover:bg-white/5 hover:text-fg"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setOpen(false);
                    window.dispatchEvent(new Event(OPEN_PALETTE));
                  }}
                  className="flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-left text-muted hover:bg-white/5 hover:text-fg"
                >
                  <Command className="h-4 w-4" /> Quick actions
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
