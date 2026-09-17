"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MARK_PATH } from "@/components/ui/Logo";
import type { PointerState } from "@/components/motion/usePointerField";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

/**
 * The hero's signature graphic: the HTP42 mark, with experts joining it.
 *
 * Bubbles surface around the lemniscate, link themselves to a point on it,
 * stay for a while, then let go and fade. That is the business drawn literally:
 * a curated network is not a fixed roster, it is the right people connected for
 * as long as the work lasts, and HTP42 is the constant in the middle.
 *
 * The mark is the real one, `MARK_PATH` from the logo, scaled into this field.
 * It is not a redrawing or an image of the logo, so it can never drift from the
 * brand asset.
 *
 * One animation frame loop drives everything, rather than a tween per element.
 * That is partly cost, and mostly correctness: a link has to land on both its
 * bubble and its anchor on every single frame, and separate tweens cannot
 * promise that. Every value is deterministic trigonometry on elapsed time, so
 * the loop holds no state, never re-renders React, and renders identically on
 * the server and the client.
 *
 * The loop also reads the cursor, which is why `pointer` is a ref rather than a
 * value: a mouse move must never re-render React, it just changes what the next
 * frame draws.
 *
 * It stops when the hero scrolls out of view, which matters on a phone.
 */

const FIELD_W = 460;
const FIELD_H = 380;

/** Where the mark sits in the field, and how much bigger than its own
 * 100 × 55.48 artboard it is drawn. */
const CX = 230;
const CY = 188;
const MARK_W = 100;
const MARK_H = 55.48;
const MARK_SCALE = 2.36;
const MARK_X = CX - (MARK_W * MARK_SCALE) / 2;
const MARK_Y = CY - (MARK_H * MARK_SCALE) / 2;

/** A point on the logo's own artboard, in field coordinates. */
function onMark(x: number, y: number) {
  return { x: MARK_X + x * MARK_SCALE, y: MARK_Y + y * MARK_SCALE };
}

/**
 * Points on the outline of the mark, sampled from the real path rather than
 * guessed, so every link lands exactly on the edge of the logo. Only outer
 * edge points: an anchor on the crossing would make its link cross the mark.
 */
const ANCHORS = [
  onMark(24.93, 0.03), // apex of the large loop
  onMark(2.48, 15.34), // upper left
  onMark(0.03, 26.43), // far left
  onMark(4.86, 42.61), // lower left
  onMark(20.72, 54.17), // under the large loop
  onMark(37.65, 54.26), // under the large loop, inboard
  onMark(79.62, 44.35), // under the small loop
  onMark(96.75, 35.85), // lower right
  onMark(99.93, 25.05), // far right
  onMark(90.64, 8.32), // upper right
  onMark(74.11, 6.45), // over the small loop
  onMark(45.54, 8.83), // over the large loop, inboard
];

/**
 * Each bubble is pushed out from its anchor along the ray from the centre of
 * the mark, so its link runs away from the logo and never over it. Periods are
 * coprime enough that the group never falls into a visible rhythm.
 *
 * Nothing sits to the left of the mark, and that is deliberate rather than an
 * oversight: the graphic overlaps the headline column, so a bubble out there
 * would land on the type. The ring runs over the top, under the large loop and
 * around the right instead. Measured at 1440: the leftmost bubble edge is 805,
 * the headline ends at 770.
 */
const BUBBLES = [
  { anchor: 0, reach: 84, period: 11.5, phase: 0.6, size: 1.0 },
  { anchor: 4, reach: 86, period: 10.9, phase: 6.4, size: 1.04 },
  { anchor: 5, reach: 76, period: 11.8, phase: 2.2, size: 0.94 },
  { anchor: 6, reach: 88, period: 13.4, phase: 9.8, size: 0.9 },
  { anchor: 7, reach: 74, period: 14.3, phase: 4.1, size: 0.86 },
  { anchor: 8, reach: 84, period: 12.2, phase: 1.4, size: 1.0 },
  { anchor: 9, reach: 80, period: 11.1, phase: 8.9, size: 0.9 },
  { anchor: 10, reach: 92, period: 10.4, phase: 7.6, size: 0.96 },
  { anchor: 11, reach: 72, period: 13.9, phase: 3.0, size: 0.92 },
].map((b) => {
  const a = ANCHORS[b.anchor];
  const dx = a.x - CX;
  const dy = a.y - CY;
  const len = Math.hypot(dx, dy) || 1;
  return {
    ...b,
    ax: a.x,
    ay: a.y,
    x: a.x + (dx / len) * b.reach,
    y: a.y + (dy / len) * b.reach,
  };
});

/** Bubble radius before its own size multiplier. */
const R = 16;

/**
 * The cycle, as fractions of a bubble's period: surface, reach out, hold, let
 * go. The gap between the last stop and 1 is the pause before it returns.
 */
const APPEAR = 0.07;
const LINKED = 0.2;
const RELEASE = 0.72;
const GONE = 0.85;

/** One signal runs up each live link on this period, in seconds. */
const SIGNAL = 2.6;

/** The cursor's reach, and how far a bubble leans into it, in field units. */
const REACH = 150;
const LEAN = 11;

/** Seconds the whole field takes to ease in behind the entry animation. */
const RAMP = 2.2;

/** Smoothstep. */
const ease = (u: number) => u * u * (3 - 2 * u);
/** Ramps 0 to 1 over [a, b], flat outside. */
const span = (u: number, a: number, b: number) =>
  u <= a ? 0 : u >= b ? 1 : (u - a) / (b - a);

export function LogoField({
  className = "",
  pointer,
}: {
  className?: string;
  pointer?: React.RefObject<PointerState>;
}) {
  const reduced = useReducedMotionSafe();
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRefs = useRef<(SVGGElement | null)[]>([]);
  const linkRefs = useRef<(SVGLineElement | null)[]>([]);
  const pulseRefs = useRef<(SVGCircleElement | null)[]>([]);
  const landRefs = useRef<(SVGCircleElement | null)[]>([]);
  const markRef = useRef<SVGGElement>(null);
  const haloRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    if (reduced) return;
    const svg = svgRef.current;
    if (!svg) return;

    let frame = 0;
    let running = true;
    const start = performance.now();

    // Below lg the bubbles are display:none, because the graphic sits under
    // the headline there and opaque discs cannot share that space with type.
    // The loop has to know, or it would spend every frame animating nothing.
    const wide = window.matchMedia("(min-width: 64rem)");
    let peopled = wide.matches;
    const onWidth = (e: MediaQueryListEvent) => {
      peopled = e.matches;
    };
    wide.addEventListener("change", onWidth);

    // The cursor, smoothed. It trails the real pointer by a few frames, and
    // that lag is most of what makes the field feel weighted, not twitchy.
    let sx = 0;
    let sy = 0;
    let placed = false;
    let influence = 0;

    // Cached: reading the box every frame forces a layout every frame, and it
    // only moves when the page scrolls or resizes.
    let box: DOMRect | null = null;
    const remeasure = () => {
      box = null;
    };
    window.addEventListener("scroll", remeasure, { passive: true });
    window.addEventListener("resize", remeasure);

    const tick = (now: number) => {
      if (!running) return;
      const t = (now - start) / 1000;
      const ramp = ease(Math.min(1, t / RAMP));

      const p = pointer?.current;
      let over = false;
      if (p?.active) {
        if (!box) box = svg.getBoundingClientRect();
        if (box.width > 0 && box.height > 0) {
          const mx = ((p.x - box.left) / box.width) * FIELD_W;
          const my = ((p.y - box.top) / box.height) * FIELD_H;
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

      // How lit the mark is: a slow breath, plus whatever the cursor adds.
      let markLift = 0;

      for (let i = 0; peopled && i < BUBBLES.length; i++) {
        const b = BUBBLES[i];
        const group = groupRefs.current[i];
        const link = linkRefs.current[i];
        if (!group || !link) continue;

        const u = ((t + b.phase) % b.period) / b.period;

        // Present at all? Everything below is skipped while it is away.
        const alive = u < GONE;
        const show = alive
          ? Math.min(ease(span(u, 0, APPEAR)), 1 - ease(span(u, RELEASE, GONE)))
          : 0;
        if (show <= 0.001) {
          group.setAttribute("opacity", "0");
          link.setAttribute("opacity", "0");
          const dot = pulseRefs.current[i];
          if (dot) dot.setAttribute("opacity", "0");
          const land = landRefs.current[i];
          if (land) land.setAttribute("opacity", "0");
          continue;
        }

        // Lean into the cursor, hardest at the centre of its reach.
        let pull = 0;
        let bx = b.x;
        let by = b.y;
        if (live) {
          const gx = sx - bx;
          const gy = sy - by;
          const dist = Math.hypot(gx, gy);
          if (dist < REACH) {
            pull = (1 - dist / REACH) ** 2 * influence;
            const step = (pull * LEAN) / (dist || 1);
            bx += gx * step;
            by += gy * step;
          }
        }

        // Surface with a little overshoot, so it arrives rather than appears.
        const rise = ease(span(u, 0, APPEAR));
        const scale = b.size * (0.55 + 0.45 * rise + 0.07 * pull);
        group.setAttribute(
          "transform",
          `translate(${bx.toFixed(2)} ${by.toFixed(2)}) scale(${scale.toFixed(3)})`,
        );
        group.setAttribute("opacity", (show * ramp).toFixed(3));

        // The link runs from the edge of the bubble to the edge of the mark,
        // growing out of the bubble and retracting back into it.
        const vx = b.ax - bx;
        const vy = b.ay - by;
        const len = Math.hypot(vx, vy) || 1;
        const ux = vx / len;
        const uy = vy / len;
        const edge = R * scale + 3;
        const x1 = bx + ux * edge;
        const y1 = by + uy * edge;
        const grow = ease(span(u, APPEAR, LINKED));
        const drop = ease(span(u, RELEASE, GONE));
        const run = Math.max(0, grow - drop) * (len - edge);
        link.setAttribute("x1", x1.toFixed(2));
        link.setAttribute("y1", y1.toFixed(2));
        link.setAttribute("x2", (x1 + ux * run).toFixed(2));
        link.setAttribute("y2", (y1 + uy * run).toFixed(2));
        link.setAttribute(
          "opacity",
          (show * ramp * (0.4 + 0.45 * grow + 0.3 * pull)).toFixed(3),
        );

        // While connected, a signal runs up the link into the mark.
        const connected = u > LINKED && u < RELEASE;
        const dot = pulseRefs.current[i];
        const land = landRefs.current[i];
        if (connected) {
          const s = (((t + b.phase * 3) % SIGNAL) / SIGNAL) * 1.35;
          const travel = Math.min(1, s);
          if (dot) {
            dot.setAttribute("cx", (x1 + ux * run * travel).toFixed(2));
            dot.setAttribute("cy", (y1 + uy * run * travel).toFixed(2));
            dot.setAttribute(
              "opacity",
              s > 1 ? "0" : (Math.sin(Math.PI * travel) ** 0.6 * ramp).toFixed(3),
            );
          }
          // It lands on the mark: a short bloom at the anchor.
          const hit = s > 0.92 && s < 1.25 ? 1 - Math.abs(s - 1) / 0.28 : 0;
          if (land) {
            land.setAttribute("opacity", (hit * 0.7 * ramp).toFixed(3));
            land.setAttribute("r", (5 + hit * 9).toFixed(2));
          }
          markLift = Math.max(markLift, hit * 0.5);
        } else {
          if (dot) dot.setAttribute("opacity", "0");
          if (land) land.setAttribute("opacity", "0");
        }
      }

      // The mark breathes, brightens as signals land, and brightens again when
      // the cursor is on it.
      const breath = 1 + Math.sin(t * 0.55) * 0.006;
      const near = live
        ? Math.max(0, 1 - Math.hypot(sx - CX, sy - CY) / 190) * influence
        : 0;
      markRef.current?.setAttribute(
        "transform",
        `translate(${CX} ${CY}) scale(${(breath * (1 + near * 0.012)).toFixed(4)}) translate(${-CX} ${-CY})`,
      );
      haloRef.current?.setAttribute(
        "opacity",
        (ramp * (0.5 + markLift * 0.5 + near * 0.35)).toFixed(3),
      );

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
      wide.removeEventListener("change", onWidth);
      window.removeEventListener("scroll", remeasure);
      window.removeEventListener("resize", remeasure);
    };
  }, [reduced, pointer]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${FIELD_W} ${FIELD_H}`}
      fill="none"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        {/* Deeper than the logo's flat azure. At hero size a flat bright blue
            competes with the headline; this keeps the mark unmistakably the
            brand without making it the loudest thing on the screen. */}
        <linearGradient id="lf-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#62aef2" />
          <stop offset="52%" stopColor="#2578e2" />
          <stop offset="100%" stopColor="#1550ae" />
        </linearGradient>
        <radialGradient id="lf-halo">
          <stop offset="0%" stopColor="#4a9dff" stopOpacity="0.5" />
          <stop offset="55%" stopColor="#2e7fdb" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#2e7fdb" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lf-signal">
          <stop offset="0%" stopColor="#dbeeff" stopOpacity="1" />
          <stop offset="100%" stopColor="#4a9dff" stopOpacity="0" />
        </radialGradient>

      </defs>

      {/* The glow the mark sits in. */}
      <ellipse
        ref={haloRef}
        cx={CX}
        cy={CY}
        rx={190}
        ry={140}
        fill="url(#lf-halo)"
        opacity="0"
      />

      {/* Links, signals and the bloom where each one lands, under the mark so
          they run behind it rather than over it.

          Hidden below lg, with the bubbles: down there the graphic sits behind
          the headline, and the mark alone reads as a watermark where a ring of
          opaque discs would read as a collision. */}
      <g className="hidden lg:block">
        {BUBBLES.map((b, i) => (
          <g key={`l${i}`}>
            <line
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              x1={b.x}
              y1={b.y}
              x2={b.x}
              y2={b.y}
              stroke="#6fb4ff"
              strokeWidth="0.9"
              strokeLinecap="round"
              opacity="0"
            />
            <circle
              ref={(el) => {
                pulseRefs.current[i] = el;
              }}
              r="2.6"
              fill="#dbeeff"
              opacity="0"
            />
            <circle
              ref={(el) => {
                landRefs.current[i] = el;
              }}
              cx={b.ax}
              cy={b.ay}
              r="5"
              fill="url(#lf-signal)"
              opacity="0"
            />
          </g>
        ))}
      </g>

      {/* The mark itself, the real logo path. */}
      <motion.g
        ref={markRef}
        initial={reduced ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      >
        <g transform={`translate(${MARK_X} ${MARK_Y}) scale(${MARK_SCALE})`}>
          <path d={MARK_PATH} fill="url(#lf-mark)" fillRule="evenodd" />
        </g>
      </motion.g>

      {/* The bubbles. */}
      <g className="hidden lg:block">
        {BUBBLES.map((b, i) => (
          <g
            key={`b${i}`}
            data-bubble=""
            ref={(el) => {
              groupRefs.current[i] = el;
            }}
            transform={`translate(${b.x} ${b.y})`}
            opacity="0"
          >
            <circle r={R} fill="#101a2e" fillOpacity="0.82" />
            <circle
              r={R}
              fill="none"
              stroke="#4a9dff"
              strokeOpacity="0.45"
              strokeWidth="1"
            />
            {/* One expert. The same figure in every bubble, deliberately: the
                people in the network are not illustrated individually, and the
                graphic should not pretend otherwise. Inlined rather than a
                <use> of one definition, because a shadow tree has to be
                re-resolved every time the bubble's transform is written, which
                is sixty times a second. */}
            <circle cx="0" cy="-3.4" r="3.5" fill="#bcdcff" fillOpacity="0.92" />
            <path
              d="M -6.6 6.6 A 6.6 6.6 0 0 1 6.6 6.6"
              stroke="#bcdcff"
              strokeOpacity="0.92"
              strokeWidth="2.1"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
