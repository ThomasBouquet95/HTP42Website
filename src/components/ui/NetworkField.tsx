"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The hero's signature graphic: a constellation of senior experts, linked into
 * teams. Node positions are fixed at render (no randomness, so hydration is
 * stable), then the whole field breathes: every node drifts on its own slow
 * orbit, the edges are redrawn to follow them, and signals run inward along
 * the spine toward the core.
 *
 * The drift is driven by one animation frame loop rather than fifty independent
 * tweens. That is partly cost, and mostly correctness: an edge has to land on
 * both of its nodes on every single frame, and separate tweens cannot promise
 * that. The loop is deterministic trigonometry on elapsed time, so it needs no
 * state and never re-renders React.
 *
 * It also stops when the hero scrolls out of view, which matters on a phone.
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

/**
 * Signals travel from the first node to the second. All of them run inward,
 * which is the picture we want: expertise converging into one accountable
 * team, rather than instructions being handed down from the middle.
 */
const SIGNALS: { from: number; to: number; period: number; phase: number }[] = [
  { from: 4, to: 1, period: 5.2, phase: 0 },
  { from: 9, to: 2, period: 6.1, phase: 1.7 },
  { from: 13, to: 3, period: 5.6, phase: 3.1 },
  { from: 1, to: 0, period: 4.4, phase: 2.2 },
  { from: 2, to: 0, period: 4.9, phase: 0.9 },
  { from: 3, to: 0, period: 4.6, phase: 3.6 },
  { from: 11, to: 0, period: 5.8, phase: 1.2 },
];

/**
 * Per node drift, derived from the index so it is identical on server and
 * client. Hubs move least: they are the fixed points the picture hangs on.
 */
const DRIFT = NODES.map((n, i) => {
  const anchor = i === 0 ? 0.34 : n.hub ? 0.62 : 1;
  return {
    ax: (4.8 + ((i * 7) % 5) * 1.1) * anchor,
    ay: (4.2 + ((i * 11) % 5) * 1.2) * anchor,
    wx: 0.085 + ((i * 13) % 7) * 0.013,
    wy: 0.071 + ((i * 17) % 7) * 0.011,
    px: (i * 1.7) % (Math.PI * 2),
    py: (i * 2.3) % (Math.PI * 2),
  };
});

/** Seconds the drift takes to reach full amplitude, so it eases in behind the
 * entry animation instead of fighting it. */
const RAMP = 2.6;

export function NetworkField({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const edgeRefs = useRef<(SVGLineElement | null)[]>([]);
  const signalRefs = useRef<(SVGCircleElement | null)[]>([]);
  const trailRefs = useRef<(SVGLineElement | null)[]>([]);

  useEffect(() => {
    if (reduced) return;
    const svg = svgRef.current;
    if (!svg) return;

    let frame = 0;
    let running = true;
    const start = performance.now();
    const pos = NODES.map((n) => ({ x: n.x, y: n.y }));

    const tick = (now: number) => {
      if (!running) return;
      const t = (now - start) / 1000;
      const ramp = Math.min(1, t / RAMP);
      // ease the amplitude in rather than switching it on
      const amp = ramp * ramp * (3 - 2 * ramp);

      for (let i = 0; i < NODES.length; i++) {
        const d = DRIFT[i];
        const dx = Math.sin(t * d.wx * Math.PI * 2 + d.px) * d.ax * amp;
        const dy = Math.cos(t * d.wy * Math.PI * 2 + d.py) * d.ay * amp;
        pos[i].x = NODES[i].x + dx;
        pos[i].y = NODES[i].y + dy;
        nodeRefs.current[i]?.setAttribute(
          "transform",
          `translate(${dx.toFixed(2)} ${dy.toFixed(2)})`,
        );
      }

      for (let i = 0; i < EDGES.length; i++) {
        const line = edgeRefs.current[i];
        if (!line) continue;
        const [a, b] = EDGES[i];
        line.setAttribute("x1", pos[a].x.toFixed(2));
        line.setAttribute("y1", pos[a].y.toFixed(2));
        line.setAttribute("x2", pos[b].x.toFixed(2));
        line.setAttribute("y2", pos[b].y.toFixed(2));
      }

      for (let i = 0; i < SIGNALS.length; i++) {
        const dot = signalRefs.current[i];
        const trail = trailRefs.current[i];
        if (!dot) continue;
        const s = SIGNALS[i];
        // one signal per period, with a pause between runs
        const cycle = ((t + s.phase) % s.period) / s.period;
        const travel = Math.min(1, cycle / 0.72);
        const from = pos[s.from];
        const to = pos[s.to];
        const at = (u: number) => ({
          x: from.x + (to.x - from.x) * u,
          y: from.y + (to.y - from.y) * u,
        });
        const head = at(travel);
        dot.setAttribute("cx", head.x.toFixed(2));
        dot.setAttribute("cy", head.y.toFixed(2));
        // fade in off the source, out into the target
        const fade =
          cycle > 0.72 ? 0 : Math.sin(Math.PI * travel) ** 0.7 * ramp;
        dot.setAttribute("opacity", fade.toFixed(3));

        // A short trail behind the head. Without it the dot reads as a stray
        // highlight rather than as something travelling.
        if (trail) {
          const tail = at(Math.max(0, travel - 0.16));
          trail.setAttribute("x1", tail.x.toFixed(2));
          trail.setAttribute("y1", tail.y.toFixed(2));
          trail.setAttribute("x2", head.x.toFixed(2));
          trail.setAttribute("y2", head.y.toFixed(2));
          trail.setAttribute("opacity", (fade * 0.55).toFixed(3));
        }
      }

      frame = requestAnimationFrame(tick);
    };

    // Idle while the hero is off screen: this sits at the top of a long page.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !frame) {
          running = true;
          frame = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && frame) {
          running = false;
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "120px" },
    );
    io.observe(svg);

    return () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [reduced]);

  return (
    <svg
      ref={svgRef}
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
        <radialGradient id="nf-signal" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#bcdcff" stopOpacity="1" />
          <stop offset="100%" stopColor="#4a9dff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Edges: drawn in, then held, and redrawn each frame to follow the nodes. */}
      <g stroke="#4a9dff" strokeWidth="0.7">
        {EDGES.map(([a, b], i) => {
          const p = NODES[a];
          const q = NODES[b];
          const isSpine = a === 0 || b === 0;
          return (
            <motion.line
              key={i}
              ref={(el) => {
                edgeRefs.current[i] = el;
              }}
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

      {/* Signals running inward along the spine. */}
      {!reduced && (
        <g>
          {SIGNALS.map((s, i) => (
            <g key={i}>
              <line
                ref={(el) => {
                  trailRefs.current[i] = el;
                }}
                x1={NODES[s.from].x}
                y1={NODES[s.from].y}
                x2={NODES[s.from].x}
                y2={NODES[s.from].y}
                stroke="#bcdcff"
                strokeWidth="1.1"
                strokeLinecap="round"
                opacity="0"
              />
              <circle
                ref={(el) => {
                  signalRefs.current[i] = el;
                }}
                cx={NODES[s.from].x}
                cy={NODES[s.from].y}
                r="4.2"
                fill="url(#nf-signal)"
                opacity="0"
              />
            </g>
          ))}
        </g>
      )}

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
            {/* Inner group carries the drift, so it never fights the entry
                animation's own transform. */}
            <g
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
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
                      stroke="#4a9dff"
                      strokeWidth="0.7"
                      /* An explicit initial: without it the keyframe array has
                         no starting value on first paint and Framer writes
                         r="undefined", which the browser rejects. */
                      initial={{ r: n.r + 9, strokeOpacity: 0.3 }}
                      animate={{
                        r: [n.r + 9, n.r + 22],
                        strokeOpacity: [0.3, 0],
                      }}
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
            </g>
          </motion.g>
        ))}
      </g>
    </svg>
  );
}
