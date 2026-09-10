"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The hero's signature graphic: a constellation of senior experts, linked into
 * teams. Node positions are fixed (no randomness at render, so hydration is
 * stable) and drift only in opacity and scale — enough to feel alive, never
 * enough to distract from the headline.
 */

type Node = { x: number; y: number; r: number; hub?: boolean };

// Laid out by hand on a 460×460 field: three loose clusters plus connectors.
const NODES: Node[] = [
  { x: 232, y: 228, r: 7.5, hub: true },
  { x: 138, y: 132, r: 5, hub: true },
  { x: 336, y: 148, r: 5, hub: true },
  { x: 196, y: 344, r: 5, hub: true },
  { x: 74, y: 66, r: 2.6 },
  { x: 196, y: 58, r: 3.2 },
  { x: 66, y: 196, r: 3.2 },
  { x: 118, y: 254, r: 2.6 },
  { x: 286, y: 62, r: 2.6 },
  { x: 404, y: 96, r: 3.2 },
  { x: 412, y: 216, r: 2.6 },
  { x: 348, y: 288, r: 3.2 },
  { x: 300, y: 396, r: 2.6 },
  { x: 108, y: 404, r: 3.2 },
  { x: 42, y: 320, r: 2.6 },
  { x: 386, y: 372, r: 2.2 },
  { x: 246, y: 122, r: 2.2 },
  { x: 160, y: 210, r: 2.2 },
];

// Explicit edges — a curated graph reads far better than a distance threshold.
const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 16], [0, 17], [0, 11],
  [1, 4], [1, 5], [1, 6], [1, 7], [1, 16], [1, 17],
  [2, 5], [2, 8], [2, 9], [2, 10], [2, 16],
  [3, 7], [3, 12], [3, 13], [3, 11], [3, 17],
  [6, 14], [13, 14], [11, 15], [12, 15], [10, 11], [9, 10],
];

export function NetworkField({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 460 460"
      fill="none"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <radialGradient id="nf-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4a9dff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#4a9dff" stopOpacity="0.15" />
        </radialGradient>
      </defs>

      {/* Edges: drawn in, then held. */}
      <g stroke="#4a9dff" strokeWidth="0.7">
        {EDGES.map(([a, b], i) => {
          const p = NODES[a];
          const q = NODES[b];
          const isSpine = a === 0 || b === 0;
          return (
            <motion.line
              key={i}
              x1={p.x}
              y1={p.y}
              x2={q.x}
              y2={q.y}
              strokeOpacity={isSpine ? 0.34 : 0.15}
              initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
              animate={reduced ? undefined : { pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.4,
                delay: 0.5 + i * 0.035,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          );
        })}
      </g>

      {/* Nodes */}
      <g>
        {NODES.map((n, i) => (
          <motion.g
            key={i}
            initial={reduced ? undefined : { opacity: 0, scale: 0.4 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.35 + i * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            {n.hub && (
              <>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r + 9}
                  stroke="#4a9dff"
                  strokeOpacity="0.18"
                  strokeWidth="0.7"
                />
                {!reduced && (
                  <motion.circle
                    cx={n.x}
                    cy={n.y}
                    r={n.r + 9}
                    stroke="#4a9dff"
                    strokeWidth="0.7"
                    animate={{ r: [n.r + 9, n.r + 22], strokeOpacity: [0.3, 0] }}
                    transition={{
                      duration: 3.6,
                      repeat: Infinity,
                      delay: i * 0.9,
                      ease: "easeOut",
                    }}
                  />
                )}
              </>
            )}
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill={i === 0 ? "url(#nf-core)" : "#4a9dff"}
              fillOpacity={i === 0 ? 1 : n.hub ? 0.75 : 0.4}
            />
          </motion.g>
        ))}
      </g>
    </svg>
  );
}
