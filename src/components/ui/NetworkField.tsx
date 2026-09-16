"use client";

import { useEffect, useRef, type RefObject } from "react";
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
 * The same loop reads the cursor, which is why `pointer` is a ref rather than a
 * prop with a value: a mouse move must never re-render React, it just changes
 * what the next frame draws. Near the cursor the field leans in, the links it
 * touches brighten, and the nearest experts connect to it. The cursor becomes a
 * node in the network rather than a light shone on it.
 *
 * It also stops when the hero scrolls out of view, which matters on a phone.
 */

export type PointerState = { x: number; y: number; active: boolean };

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

const EDGE_BASE = EDGES.map(([a, b]) => (a === 0 || b === 0 ? 0.34 : 0.15));

const NODE_BASE = NODES.map((n, i) => (i === 0 ? 1 : n.hub ? 0.75 : 0.4));

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

/** How far a node can be pulled toward the cursor, in viewBox units. Hubs and
 * the core resist, for the same reason they drift least. */
const PULL = NODES.map((n, i) => (i === 0 ? 4 : n.hub ? 8 : 15));

/** The cursor's reach, in viewBox units. The field is 460 across, so this is
 * roughly a third of it: enough to feel alive, small enough to stay local. */
const REACH = 155;

/** Links drawn from the cursor to the experts nearest it. */
const LINKS = 3;

/** Seconds the drift takes to reach full amplitude, so it eases in behind the
 * entry animation instead of fighting it. */
const RAMP = 2.6;

export function NetworkField({
  className = "",
  pointer,
}: {
  className?: string;
  pointer?: RefObject<PointerState>;
}) {
  const reduced = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const edgeRefs = useRef<(SVGLineElement | null)[]>([]);
  const signalRefs = useRef<(SVGCircleElement | null)[]>([]);
  const trailRefs = useRef<(SVGLineElement | null)[]>([]);
  const linkRefs = useRef<(SVGLineElement | null)[]>([]);
  const cursorRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (reduced) return;
    const svg = svgRef.current;
    if (!svg) return;

    let frame = 0;
    let running = true;
    const start = performance.now();
    const pos = NODES.map((n) => ({ x: n.x, y: n.y }));
    const lift = NODES.map(() => 0);

    // The cursor, smoothed. It trails the real pointer by a few frames, and
    // that lag is most of what makes the field feel weighted rather than twitchy.
    let sx = 0;
    let sy = 0;
    let placed = false;
    // 0 when the pointer is away, 1 when it is over the hero. Everything the
    // cursor does is multiplied by it, so leaving eases out instead of cutting.
    let influence = 0;

    // Hoisted so the per frame search for the nearest nodes allocates nothing.
    const nearIdx = [-1, -1, -1];
    const nearDist = [0, 0, 0];

    let box: DOMRect | null = null;
    const remeasure = () => {
      box = null;
    };
    window.addEventListener("scroll", remeasure, { passive: true });
    window.addEventListener("resize", remeasure);

    const tick = (now: number) => {
      if (!running) return;
      const t = (now - start) / 1000;
      const ramp = Math.min(1, t / RAMP);
      // ease the amplitude in rather than switching it on
      const amp = ramp * ramp * (3 - 2 * ramp);

      // Where is the cursor, in viewBox units? The graphic is parallaxed and
      // sized by its container, so this has to come from the measured box.
      const p = pointer?.current;
      let over = false;
      if (p?.active) {
        // Cached: reading it every frame would force a layout on every frame,
        // and the box only moves when the page scrolls or resizes.
        if (!box) box = svg.getBoundingClientRect();
        if (box.width > 0 && box.height > 0) {
          const mx = ((p.x - box.left) / box.width) * 460;
          const my = ((p.y - box.top) / box.height) * 460;
          if (!placed) {
            sx = mx;
            sy = my;
            placed = true;
          }
          sx += (mx - sx) * 0.13;
          sy += (my - sy) * 0.13;
          over = true;
        }
      }
      if (!over) placed = false;
      influence += ((over ? 1 : 0) - influence) * 0.07;
      const live = influence > 0.004;

      for (let i = 0; i < NODES.length; i++) {
        const d = DRIFT[i];
        let x = NODES[i].x + Math.sin(t * d.wx * Math.PI * 2 + d.px) * d.ax * amp;
        let y = NODES[i].y + Math.cos(t * d.wy * Math.PI * 2 + d.py) * d.ay * amp;

        // Lean toward the cursor, hardest at the centre of its reach.
        let f = 0;
        if (live) {
          const gx = sx - x;
          const gy = sy - y;
          const dist = Math.hypot(gx, gy);
          if (dist < REACH) {
            f = (1 - dist / REACH) ** 2 * influence;
            const step = (f * PULL[i]) / (dist || 1);
            x += gx * step;
            y += gy * step;
          }
        }
        lift[i] = f;
        pos[i].x = x;
        pos[i].y = y;

        nodeRefs.current[i]?.setAttribute(
          "transform",
          `translate(${(x - NODES[i].x).toFixed(2)} ${(y - NODES[i].y).toFixed(2)})`,
        );
        const dot = dotRefs.current[i];
        if (dot) {
          dot.setAttribute(
            "fill-opacity",
            Math.min(1, NODE_BASE[i] + f * 0.55).toFixed(3),
          );
          dot.setAttribute("r", (NODES[i].r * (1 + f * 0.4)).toFixed(2));
        }
      }

      for (let i = 0; i < EDGES.length; i++) {
        const line = edgeRefs.current[i];
        if (!line) continue;
        const [a, b] = EDGES[i];
        line.setAttribute("x1", pos[a].x.toFixed(2));
        line.setAttribute("y1", pos[a].y.toFixed(2));
        line.setAttribute("x2", pos[b].x.toFixed(2));
        line.setAttribute("y2", pos[b].y.toFixed(2));
        // A link lights up from whichever of its two ends the cursor is near,
        // so the light travels along the graph rather than sitting in a disc.
        const f = Math.max(lift[a], lift[b]);
        line.setAttribute(
          "stroke-opacity",
          Math.min(0.85, EDGE_BASE[i] + f * 0.5).toFixed(3),
        );
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

      // The cursor joins the network: a soft glow where it sits, and a link to
      // each of the nearest experts.
      const glow = cursorRef.current;
      if (glow) {
        glow.setAttribute("cx", sx.toFixed(2));
        glow.setAttribute("cy", sy.toFixed(2));
        glow.setAttribute("opacity", (influence * 0.9).toFixed(3));
      }
      // Top three by a scan, not a sort: this runs on every frame.
      nearIdx[0] = nearIdx[1] = nearIdx[2] = -1;
      nearDist[0] = nearDist[1] = nearDist[2] = Infinity;
      if (live) {
        for (let i = 0; i < pos.length; i++) {
          const d = Math.hypot(sx - pos[i].x, sy - pos[i].y);
          if (d >= REACH) continue;
          if (d < nearDist[0]) {
            nearDist[2] = nearDist[1]; nearIdx[2] = nearIdx[1];
            nearDist[1] = nearDist[0]; nearIdx[1] = nearIdx[0];
            nearDist[0] = d; nearIdx[0] = i;
          } else if (d < nearDist[1]) {
            nearDist[2] = nearDist[1]; nearIdx[2] = nearIdx[1];
            nearDist[1] = d; nearIdx[1] = i;
          } else if (d < nearDist[2]) {
            nearDist[2] = d; nearIdx[2] = i;
          }
        }
      }
      for (let k = 0; k < LINKS; k++) {
        const link = linkRefs.current[k];
        if (!link) continue;
        const i = nearIdx[k];
        if (i < 0) {
          link.setAttribute("opacity", "0");
          continue;
        }
        link.setAttribute("x1", sx.toFixed(2));
        link.setAttribute("y1", sy.toFixed(2));
        link.setAttribute("x2", pos[i].x.toFixed(2));
        link.setAttribute("y2", pos[i].y.toFixed(2));
        link.setAttribute(
          "opacity",
          ((1 - nearDist[k] / REACH) * 0.55 * influence).toFixed(3),
        );
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
      window.removeEventListener("scroll", remeasure);
      window.removeEventListener("resize", remeasure);
    };
  }, [reduced, pointer]);

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
        <radialGradient id="nf-cursor" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#bcdcff" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#4a9dff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#4a9dff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Edges: drawn in, then held, and redrawn each frame to follow the nodes. */}
      <g stroke="#4a9dff" strokeWidth="0.7">
        {EDGES.map(([a, b], i) => {
          const p = NODES[a];
          const q = NODES[b];
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
              strokeOpacity={EDGE_BASE[i]}
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

      {/* The cursor's own links into the network. */}
      {!reduced && (
        <g>
          {Array.from({ length: LINKS }, (_, k) => (
            <line
              key={k}
              ref={(el) => {
                linkRefs.current[k] = el;
              }}
              x1="0"
              y1="0"
              x2="0"
              y2="0"
              stroke="#bcdcff"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0"
            />
          ))}
          <circle
            ref={cursorRef}
            cx="0"
            cy="0"
            r="17"
            fill="url(#nf-cursor)"
            opacity="0"
          />
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
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill={i === 0 ? "url(#nf-core)" : "#4a9dff"}
                fillOpacity={NODE_BASE[i]}
              />
            </g>
          </motion.g>
        ))}
      </g>
    </svg>
  );
}
