"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import type { DiagramEdge, DiagramNode } from "@/data/content";

const W = 170;
const H = 58;

const tones = {
  accent: { stroke: "#8b7cff", fill: "rgba(139,124,255,0.12)" },
  mint: { stroke: "#3de0c5", fill: "rgba(61,224,197,0.10)" },
  pink: { stroke: "#ff7ab8", fill: "rgba(255,122,184,0.10)" },
  neutral: { stroke: "rgba(255,255,255,0.28)", fill: "rgba(255,255,255,0.04)" },
};

type Side = "l" | "r" | "t" | "b";

function anchor(n: DiagramNode, side: Side) {
  switch (side) {
    case "l":
      return { x: n.x, y: n.y + H / 2 };
    case "r":
      return { x: n.x + W, y: n.y + H / 2 };
    case "t":
      return { x: n.x + W / 2, y: n.y };
    case "b":
      return { x: n.x + W / 2, y: n.y + H };
  }
}

function pathFor(a: { x: number; y: number }, b: { x: number; y: number }, vertical: boolean) {
  if (vertical) {
    const m = (a.y + b.y) / 2;
    return `M${a.x},${a.y} C${a.x},${m} ${b.x},${m} ${b.x},${b.y}`;
  }
  const m = (a.x + b.x) / 2;
  return `M${a.x},${a.y} C${m},${a.y} ${m},${b.y} ${b.x},${b.y}`;
}

export function FlowDiagram({
  width,
  height,
  nodes,
  edges,
}: {
  width: number;
  height: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}) {
  const uid = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<string | null>(null);
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  const touches = (e: DiagramEdge) => hover !== null && (e.from === hover || e.to === hover);

  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-black/30 [scrollbar-width:thin]">
      <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[760px]" role="img" aria-label="Architecture diagram">
        <defs>
          <pattern id={`dots-${uid}`} width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.06)" />
          </pattern>
        </defs>
        <rect width={width} height={height} fill={`url(#dots-${uid})`} />

        {edges.map((e, i) => {
          const a = byId[e.from];
          const b = byId[e.to];
          const vertical = e.fromSide === "b" || e.fromSide === "t";
          const d = pathFor(anchor(a, e.fromSide ?? "r"), anchor(b, e.toSide ?? "l"), vertical);
          const lit = touches(e);
          return (
            <g key={i} style={{ transition: "opacity .3s", opacity: hover && !lit ? 0.25 : 1 }}>
              <path d={d} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={1.5} />
              <path
                d={d}
                fill="none"
                stroke={lit ? "#3de0c5" : "rgba(139,124,255,0.75)"}
                strokeWidth={lit ? 2 : 1.4}
                className="flow-line"
              />
              {!reduce && !e.dashed && (
                <circle r={3.2} fill="#3de0c5">
                  <animateMotion dur={`${2.6 + (i % 3) * 0.5}s`} repeatCount="indefinite" path={d} begin={`${(i % 4) * 0.4}s`} />
                </circle>
              )}
            </g>
          );
        })}

        {nodes.map((n, i) => {
          const t = tones[n.tone ?? "neutral"];
          const active = hover === n.id;
          return (
            <motion.g
              key={n.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "default" }}
            >
              <rect
                x={n.x}
                y={n.y}
                width={W}
                height={H}
                rx={14}
                fill={t.fill}
                stroke={t.stroke}
                strokeWidth={active ? 2 : 1.2}
                style={{ transition: "all .25s", filter: active ? `drop-shadow(0 0 14px ${t.stroke})` : "none" }}
              />
              <text
                x={n.x + W / 2}
                y={n.y + (n.sub ? 25 : 34)}
                textAnchor="middle"
                fill="#ececf1"
                fontSize={14}
                fontWeight={600}
                style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
              >
                {n.label}
              </text>
              {n.sub && (
                <text
                  x={n.x + W / 2}
                  y={n.y + 43}
                  textAnchor="middle"
                  fill="#9a9aab"
                  fontSize={10.5}
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  {n.sub}
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
