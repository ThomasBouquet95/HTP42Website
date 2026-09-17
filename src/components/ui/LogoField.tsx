"use client";

import { useEffect, useId, useRef } from "react";
import { motion } from "framer-motion";
import { MARK_PATH } from "@/components/ui/Logo";
import type { PointerState, TapState } from "@/components/motion/usePointerField";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

/**
 * The hero's signature graphic: the HTP42 mark, with a live network around it.
 *
 * Experts surface around the lemniscate, link themselves to a point on it, link
 * to each other, reach further specialists through their own contacts, and then
 * let go and fade. That is the business drawn literally: a curated network is
 * not a fixed roster, it is the right people connected for as long as the work
 * lasts, HTP42 is the constant in the middle, and the reach goes one degree
 * further than the people we hold ourselves.
 *
 * The topology is the point. A ring of spokes into a hub is an org chart; what
 * makes this a network is that the ring is also joined to itself, and that the
 * outer people are reached through the inner ones rather than through us.
 *
 * Click anywhere on the hero and another person joins, wherever you clicked.
 *
 * The mark is the real one, `MARK_PATH` from the logo, scaled into this field.
 * It is not a redrawing or an image of the logo, so it can never drift from the
 * brand asset.
 *
 * One animation frame loop drives everything, rather than a tween per element.
 * That is partly cost, and mostly correctness: a link has to land on both of
 * its ends on every single frame, and separate tweens cannot promise that.
 * Every value is deterministic trigonometry on elapsed time, so the loop holds
 * no state, never re-renders React, and renders identically on the server and
 * the client.
 *
 * The loop also reads the cursor and the clicks, which is why they arrive as
 * refs rather than values: neither must ever re-render React, they just change
 * what the next frame draws.
 *
 * It stops when the hero scrolls out of view, which matters on a phone.
 */

const FIELD_W = 460;
const FIELD_H = 380;
const TAU = Math.PI * 2;

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
 * Listed clockwise from the apex of the large loop, so consecutive entries are
 * neighbours on the ring.
 */
const ANCHORS = [
  onMark(24.93, 0.03), // apex of the large loop
  onMark(45.54, 8.83), // over the large loop, inboard
  onMark(74.11, 6.45), // over the small loop
  onMark(90.64, 8.32), // upper right
  onMark(99.93, 25.05), // far right
  onMark(96.75, 35.85), // lower right
  onMark(79.62, 44.35), // under the small loop
  onMark(37.65, 54.26), // under the large loop, inboard
  onMark(20.72, 54.17), // under the large loop
];

/**
 * The inner ring: the people HTP42 holds itself. Each is pushed out from its
 * anchor along the ray from the centre of the mark, so its link runs away from
 * the logo and never over it, and they are listed in ring order so consecutive
 * entries can be joined to each other.
 *
 * Nothing sits to the left of the mark, and that is deliberate rather than an
 * oversight: the graphic overlaps the headline column, so a person out there
 * would land on the type. The ring runs over the top, down the right and back
 * under the large loop. Measured at 1024, the tightest case: 40px between the
 * leftmost bubble and the headline.
 */
const RING = [
  { anchor: 0, reach: 84, period: 11.5, phase: 0.6, size: 1.0 },
  { anchor: 1, reach: 72, period: 13.9, phase: 3.0, size: 0.92 },
  { anchor: 2, reach: 92, period: 10.4, phase: 7.6, size: 0.96 },
  { anchor: 3, reach: 80, period: 11.1, phase: 8.9, size: 0.9 },
  { anchor: 4, reach: 84, period: 12.2, phase: 1.4, size: 1.0 },
  { anchor: 5, reach: 74, period: 14.3, phase: 4.1, size: 0.86 },
  { anchor: 6, reach: 88, period: 13.4, phase: 9.8, size: 0.9 },
  { anchor: 7, reach: 76, period: 11.8, phase: 2.2, size: 0.94 },
  { anchor: 8, reach: 86, period: 10.9, phase: 6.4, size: 1.04 },
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

/** Ring neighbours, joined to each other. Not a closed loop: the two ends of
 * the arc are on either side of the gap the headline occupies. */
const PEERS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
];

/**
 * The outer degree: specialists reached through someone on the ring rather
 * than through us. They are smaller and dimmer because they are further out,
 * and they only exist while the person who introduced them is connected.
 */
const SATELLITES = [
  { via: 0, x: 155, y: 40, size: 0.6 },
  { via: 2, x: 287, y: 36, size: 0.54 },
  { via: 3, x: 443, y: 120, size: 0.56 },
  { via: 6, x: 330, y: 322, size: 0.55 },
  { via: 8, x: 120, y: 352, size: 0.6 },
];

/** How many clicks can be in flight at once. */
const GUESTS = 4;

/** Bubble radius before its own size multiplier. */
const R = 16;

/**
 * The cycle, as fractions of a period: surface, reach out, hold, let go. The
 * gap between the last stop and 1 is the pause before the slot fills again.
 */
const APPEAR = 0.07;
const LINKED = 0.2;
const RELEASE = 0.72;
const GONE = 0.85;

/** Seconds between signals on a link. */
const SIGNAL = 2.6;
const PEER_SIGNAL = 4.3;

/** Seconds a clicked person stays. */
const GUEST_LIFE = 7;

/** The cursor's reach, and how far a bubble leans into it, in field units. */
const REACH = 150;
const LEAN = 11;

/** Seconds the whole field takes to ease in behind the entry animation. */
const RAMP = 2.2;

/**
 * The centreline of the mark, as the two ellipses a lemniscate is built from,
 * meeting at the crossing. Fitted to the middle of the stroke rather than
 * guessed: at angle 0 the left ellipse is exactly the crossing point, at 180
 * it is the middle of the stroke at the far left edge, and top and bottom sit
 * mid stroke there too. Same for the right, which is the smaller loop.
 *
 * Light travelling this path, clipped to the mark, reads as colour moving
 * around the infinity rather than a sheen passing over it. The travelling
 * light is far wider than the stroke, so the fit only has to be close.
 */
const LOOP_L = { cx: 31.4, cy: 26.5, rx: 25.6, ry: 22.3 };
const LOOP_R = { cx: 75.7, cy: 26.5, rx: 18.7, ry: 14.25 };
/** Share of the trip spent on the larger loop, in proportion to its perimeter,
 * so the light does not race around the small one. */
const SPLIT = 0.59;
/** Seconds for one full circuit. */
const FLOW = 7.4;

function flowPoint(u: number, out: { x: number; y: number }) {
  let x: number;
  let y: number;
  if (u < SPLIT) {
    const a = (u / SPLIT) * TAU;
    x = LOOP_L.cx + Math.cos(a) * LOOP_L.rx;
    y = LOOP_L.cy + Math.sin(a) * LOOP_L.ry;
  } else {
    // the other way round the smaller loop, which is what makes the path
    // cross itself instead of tracing a peanut
    const a = Math.PI - ((u - SPLIT) / (1 - SPLIT)) * TAU;
    x = LOOP_R.cx + Math.cos(a) * LOOP_R.rx;
    y = LOOP_R.cy + Math.sin(a) * LOOP_R.ry;
  }
  out.x = MARK_X + x * MARK_SCALE;
  out.y = MARK_Y + y * MARK_SCALE;
}

/** Per bubble drift, derived from the index so it is identical on the server
 * and the client. Without it the ring is a diagram pinned to the page. */
const DRIFT = (i: number) => ({
  ax: 4.5 + ((i * 7) % 4) * 1.3,
  ay: 3.8 + ((i * 5) % 4) * 1.2,
  wx: 0.062 + ((i * 13) % 7) * 0.009,
  wy: 0.051 + ((i * 17) % 7) * 0.008,
  px: (i * 1.7) % TAU,
  py: (i * 2.3) % TAU,
});

/**
 * Faint dots behind everything, fixed. They are not people and they are not
 * links: they are the sense that the picture is a detail of something larger.
 */
const DUST = Array.from({ length: 26 }, (_, i) => {
  const a = (i * 2.39996) % TAU; // golden angle, so they never band
  const r = 118 + ((i * 53) % 130);
  return {
    x: CX + Math.cos(a) * r * 1.34,
    y: CY + Math.sin(a) * r * 0.96,
    r: 0.8 + ((i * 7) % 3) * 0.5,
    o: 0.1 + ((i * 11) % 5) * 0.035,
  };
}).filter((d) => d.x > 96 && d.x < FIELD_W - 6 && d.y > 6 && d.y < FIELD_H - 6);

/** Smoothstep. */
const ease = (u: number) => u * u * (3 - 2 * u);
/** Ramps 0 to 1 over [a, b], flat outside. */
const span = (u: number, a: number, b: number) =>
  u <= a ? 0 : u >= b ? 1 : (u - a) / (b - a);

type Link = { x0: number; y0: number; x1: number; y1: number };

/**
 * A link between two points, trimmed at both ends so it starts and stops clear
 * of whatever it joins rather than running under it.
 */
function span2(
  x0: number, y0: number, x1: number, y1: number,
  from: number, to: number, out: Link,
) {
  const vx = x1 - x0;
  const vy = y1 - y0;
  const len = Math.hypot(vx, vy) || 1;
  const ux = vx / len;
  const uy = vy / len;
  out.x0 = x0 + ux * from;
  out.y0 = y0 + uy * from;
  out.x1 = x1 - ux * to;
  out.y1 = y1 - uy * to;
}

const path = (l: Link) =>
  `M${l.x0.toFixed(1)} ${l.y0.toFixed(1)}L${l.x1.toFixed(1)} ${l.y1.toFixed(1)}`;

/** A point along a link, computed rather than queried: asking the DOM for it
 * would force a layout for every signal on every frame. */
function at(l: Link, t: number, p: { x: number; y: number }) {
  p.x = l.x0 + (l.x1 - l.x0) * t;
  p.y = l.y0 + (l.y1 - l.y0) * t;
}

/** Where a clicked person can stand: inside the field, clear of the headline
 * column, and never on top of the logo. */
function place(x: number, y: number, out: { x: number; y: number }) {
  let px = Math.min(Math.max(x, 96), FIELD_W - 24);
  let py = Math.min(Math.max(y, 26), FIELD_H - 26);
  const rx = (MARK_W * MARK_SCALE) / 2 + 28;
  const ry = (MARK_H * MARK_SCALE) / 2 + 28;
  const dx = px - CX;
  const dy = py - CY;
  const t = Math.hypot(dx / rx, dy / ry);
  if (t < 1) {
    const k = t < 0.05 ? 1 : 1 / t;
    px = CX + dx * k;
    py = CY + dy * k;
  }
  out.x = Math.min(Math.max(px, 96), FIELD_W - 24);
  out.y = Math.min(Math.max(py, 26), FIELD_H - 26);
}

export function LogoField({
  className = "",
  compact = false,
  pointer,
  taps,
}: {
  className?: string;
  /** Just the mark and the light going round it, cropped to its own box. Used
   * on phones, where the graphic sits above the headline at logo size and a
   * network of people would be too small to read. */
  compact?: boolean;
  pointer?: React.RefObject<PointerState>;
  taps?: React.RefObject<TapState>;
}) {
  const reduced = useReducedMotionSafe();
  const svgRef = useRef<SVGSVGElement>(null);
  /* The hero renders this twice, one for phones and one from lg up, and the
   * one that is not in use is display:none. Shared ids would mean the visible
   * copy painting with a gradient that lives inside a hidden subtree, which
   * paints as nothing at all. So every id is per instance. */
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `lf-${name}-${uid}`;

  const ringRefs = useRef<(SVGGElement | null)[]>([]);
  const spokeRefs = useRef<(SVGPathElement | null)[]>([]);
  const pulseRefs = useRef<(SVGCircleElement | null)[]>([]);
  const landRefs = useRef<(SVGCircleElement | null)[]>([]);
  const haloRefs = useRef<(SVGCircleElement | null)[]>([]);
  const peerRefs = useRef<(SVGPathElement | null)[]>([]);
  const peerDotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const satRefs = useRef<(SVGGElement | null)[]>([]);
  const satLinkRefs = useRef<(SVGPathElement | null)[]>([]);
  const guestRefs = useRef<(SVGGElement | null)[]>([]);
  const guestLinkRefs = useRef<(SVGPathElement | null)[]>([]);
  const guestHaloRefs = useRef<(SVGCircleElement | null)[]>([]);
  const markRef = useRef<SVGGElement>(null);
  const glowRef = useRef<SVGEllipseElement>(null);
  const flowRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    if (reduced) return;
    const svg = svgRef.current;
    if (!svg) return;

    let frame = 0;
    let running = true;
    const start = performance.now();

    // Below lg the network is display:none, because the graphic sits under the
    // headline there and opaque discs cannot share that space with type. The
    // loop has to know, or it would spend every frame animating nothing.
    const wide = window.matchMedia("(min-width: 64rem)");
    let peopled = !compact && wide.matches;
    const onWidth = (e: MediaQueryListEvent) => {
      peopled = !compact && e.matches;
    };
    wide.addEventListener("change", onWidth);

    // Live state, all of it scratch space reused every frame so the loop
    // allocates nothing.
    const pos = RING.map((b) => ({ x: b.x, y: b.y, s: 1, show: 0, lift: 0 }));
    const link: Link = { x0: 0, y0: 0, x1: 0, y1: 0 };
    const dot = { x: 0, y: 0 };
    const spot = { x: 0, y: 0 };
    const guests = Array.from({ length: GUESTS }, () => ({
      x: 0, y: 0, born: -1e9, anchor: 0,
    }));
    let seen = 0;
    let next = 0;

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

      // A click puts someone new on the field, where you clicked.
      const tap = taps?.current;
      if (peopled && tap && tap.n > seen) {
        seen = tap.n;
        if (!box) box = svg.getBoundingClientRect();
        if (box.width > 0 && box.height > 0) {
          place(
            ((tap.x - box.left) / box.width) * FIELD_W,
            ((tap.y - box.top) / box.height) * FIELD_H,
            spot,
          );
          const g = guests[next];
          next = (next + 1) % GUESTS;
          g.x = spot.x;
          g.y = spot.y;
          g.born = t;
          // introduced to the nearest point on the mark
          let best = 0;
          let bestD = Infinity;
          for (let i = 0; i < ANCHORS.length; i++) {
            const d = Math.hypot(ANCHORS[i].x - g.x, ANCHORS[i].y - g.y);
            if (d < bestD) {
              bestD = d;
              best = i;
            }
          }
          g.anchor = best;
        }
      }

      let markLift = 0;

      // ---- the ring ----------------------------------------------------
      for (let i = 0; peopled && i < RING.length; i++) {
        const b = RING[i];
        const group = ringRefs.current[i];
        const spoke = spokeRefs.current[i];
        const state = pos[i];
        if (!group || !spoke) continue;

        const u = ((t + b.phase) % b.period) / b.period;
        const show =
          u < GONE
            ? Math.min(ease(span(u, 0, APPEAR)), 1 - ease(span(u, RELEASE, GONE)))
            : 0;
        state.show = show;

        if (show <= 0.001) {
          group.setAttribute("opacity", "0");
          spoke.setAttribute("opacity", "0");
          pulseRefs.current[i]?.setAttribute("opacity", "0");
          landRefs.current[i]?.setAttribute("opacity", "0");
          haloRefs.current[i]?.setAttribute("opacity", "0");
          continue;
        }

        // drift, so the ring is never quite where it was
        const d = DRIFT(i);
        let bx = b.x + Math.sin(t * d.wx * TAU + d.px) * d.ax * ramp;
        let by = b.y + Math.cos(t * d.wy * TAU + d.py) * d.ay * ramp;

        // lean into the cursor, hardest at the centre of its reach
        let pull = 0;
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
        state.x = bx;
        state.y = by;
        state.lift = pull;

        const rise = ease(span(u, 0, APPEAR));
        const scale = b.size * (0.55 + 0.45 * rise + 0.07 * pull);
        state.s = scale;
        group.setAttribute(
          "transform",
          `translate(${bx.toFixed(1)} ${by.toFixed(1)}) scale(${scale.toFixed(3)})`,
        );
        group.setAttribute("opacity", (show * ramp).toFixed(3));

        // the ring that expands once as they arrive
        const halo = haloRefs.current[i];
        if (halo) {
          const a = span(u, 0, APPEAR * 2.4);
          if (a > 0 && a < 1) {
            halo.setAttribute("cx", bx.toFixed(1));
            halo.setAttribute("cy", by.toFixed(1));
            halo.setAttribute("r", (R * scale * (1 + a * 1.5)).toFixed(1));
            halo.setAttribute("opacity", ((1 - a) * 0.5 * ramp).toFixed(3));
          } else {
            halo.setAttribute("opacity", "0");
          }
        }

        // the link into the mark
        const grow = ease(span(u, APPEAR, LINKED));
        const drop = ease(span(u, RELEASE, GONE));
        span2(bx, by, b.ax, b.ay, R * scale + 4, 2, link);
        spoke.setAttribute("d", path(link));
        spoke.setAttribute("stroke-dasharray", `${Math.max(0, grow - drop)} 1`);
        spoke.setAttribute("stroke-dashoffset", `${-drop}`);
        spoke.setAttribute(
          "opacity",
          (show * ramp * (0.45 + 0.35 * grow + 0.3 * pull)).toFixed(3),
        );

        // while connected, a signal runs up the link into the mark
        const connected = u > LINKED && u < RELEASE;
        const sig = pulseRefs.current[i];
        const land = landRefs.current[i];
        if (connected) {
          const s = (((t + b.phase * 3) % SIGNAL) / SIGNAL) * 1.35;
          const travel = Math.min(1, s);
          if (sig) {
            at(link, travel, dot);
            sig.setAttribute("cx", dot.x.toFixed(1));
            sig.setAttribute("cy", dot.y.toFixed(1));
            sig.setAttribute(
              "opacity",
              s > 1 ? "0" : (Math.sin(Math.PI * travel) ** 0.6 * ramp).toFixed(3),
            );
          }
          const hit = s > 0.92 && s < 1.25 ? 1 - Math.abs(s - 1) / 0.28 : 0;
          if (land) {
            land.setAttribute("opacity", (hit * 0.75 * ramp).toFixed(3));
            land.setAttribute("r", (4 + hit * 10).toFixed(1));
          }
          markLift = Math.max(markLift, hit * 0.5);
        } else {
          sig?.setAttribute("opacity", "0");
          land?.setAttribute("opacity", "0");
        }
      }

      // ---- the ring joined to itself -----------------------------------
      for (let i = 0; peopled && i < PEERS.length; i++) {
        const [a, c] = PEERS[i];
        const el = peerRefs.current[i];
        if (!el) continue;
        const A = pos[a];
        const B = pos[c];
        const both = A.show * B.show;
        if (both <= 0.004) {
          el.setAttribute("opacity", "0");
          peerDotRefs.current[i]?.setAttribute("opacity", "0");
          continue;
        }
        span2(A.x, A.y, B.x, B.y, R * A.s + 3, R * B.s + 3, link);
        el.setAttribute("d", path(link));
        el.setAttribute(
          "opacity",
          (both * ramp * (0.3 + 0.4 * Math.max(A.lift, B.lift))).toFixed(3),
        );
        const pd = peerDotRefs.current[i];
        if (pd) {
          const s = (((t + i * 1.9) % PEER_SIGNAL) / PEER_SIGNAL) * 1.8;
          if (s > 1) {
            pd.setAttribute("opacity", "0");
          } else {
            at(link, i % 2 ? 1 - s : s, dot);
            pd.setAttribute("cx", dot.x.toFixed(1));
            pd.setAttribute("cy", dot.y.toFixed(1));
            pd.setAttribute(
              "opacity",
              (Math.sin(Math.PI * s) ** 0.7 * both * ramp * 0.9).toFixed(3),
            );
          }
        }
      }

      // ---- one degree further out ---------------------------------------
      for (let i = 0; peopled && i < SATELLITES.length; i++) {
        const s = SATELLITES[i];
        const group = satRefs.current[i];
        const el = satLinkRefs.current[i];
        if (!group || !el) continue;
        const host = RING[s.via];
        const hu = ((t + host.phase) % host.period) / host.period;
        // they exist only while the person who introduced them is connected
        const v = span(hu, 0.34, 0.66);
        const show =
          hu > 0.33 && hu < 0.67
            ? Math.min(ease(span(v, 0, 0.16)), 1 - ease(span(v, 0.82, 1)))
            : 0;
        if (show <= 0.004) {
          group.setAttribute("opacity", "0");
          el.setAttribute("opacity", "0");
          continue;
        }
        const d = DRIFT(i + 40);
        const bx = s.x + Math.sin(t * d.wx * TAU + d.px) * d.ax * 0.8;
        const by = s.y + Math.cos(t * d.wy * TAU + d.py) * d.ay * 0.8;
        const scale = s.size * (0.6 + 0.4 * ease(span(v, 0, 0.16)));
        group.setAttribute(
          "transform",
          `translate(${bx.toFixed(1)} ${by.toFixed(1)}) scale(${scale.toFixed(3)})`,
        );
        group.setAttribute("opacity", (show * ramp * 0.9).toFixed(3));
        const H = pos[s.via];
        span2(bx, by, H.x, H.y, R * scale + 3, R * H.s + 3, link);
        el.setAttribute("d", path(link));
        el.setAttribute("opacity", (show * ramp * 0.42).toFixed(3));
      }

      // ---- whoever was just clicked into being ---------------------------
      for (let i = 0; peopled && i < GUESTS; i++) {
        const g = guests[i];
        const group = guestRefs.current[i];
        const el = guestLinkRefs.current[i];
        if (!group || !el) continue;
        const age = (t - g.born) / GUEST_LIFE;
        if (g.born < -1e8 || age < 0 || age > 1) {
          group.setAttribute("opacity", "0");
          el.setAttribute("opacity", "0");
          guestHaloRefs.current[i]?.setAttribute("opacity", "0");
          continue;
        }
        const rise = ease(span(age, 0, 0.1));
        const show = Math.min(rise, 1 - ease(span(age, 0.82, 1)));
        // arrives with a little overshoot: it should feel like a response
        const bounce = 1 + Math.sin(Math.min(1, age / 0.22) * Math.PI) * 0.16;
        const scale = 0.9 * (0.4 + 0.6 * rise) * bounce;
        group.setAttribute(
          "transform",
          `translate(${g.x.toFixed(1)} ${g.y.toFixed(1)}) scale(${scale.toFixed(3)})`,
        );
        group.setAttribute("opacity", show.toFixed(3));
        const halo = guestHaloRefs.current[i];
        if (halo) {
          const a = span(age, 0, 0.26);
          halo.setAttribute("cx", g.x.toFixed(1));
          halo.setAttribute("cy", g.y.toFixed(1));
          halo.setAttribute("r", (R * scale * (1 + a * 2.1)).toFixed(1));
          halo.setAttribute("opacity", a < 1 ? ((1 - a) * 0.6).toFixed(3) : "0");
        }
        const a = ANCHORS[g.anchor];
        const grow = ease(span(age, 0.08, 0.26));
        const goes = ease(span(age, 0.82, 1));
        span2(g.x, g.y, a.x, a.y, R * scale + 4, 2, link);
        el.setAttribute("d", path(link));
        el.setAttribute("stroke-dasharray", `${Math.max(0, grow - goes)} 1`);
        el.setAttribute("stroke-dashoffset", `${-goes}`);
        el.setAttribute("opacity", (show * 0.8).toFixed(3));
        markLift = Math.max(markLift, rise * (1 - ease(span(age, 0.3, 0.6))) * 0.4);
      }

      // Light going round the loop, for ever, which is the whole point of the
      // shape. Two of them, half a circuit apart, so the mark is never dark.
      for (let i = 0; i < 2; i++) {
        const el = flowRefs.current[i];
        if (!el) continue;
        flowPoint(((t / FLOW + i * 0.5) % 1), dot);
        el.setAttribute("cx", dot.x.toFixed(1));
        el.setAttribute("cy", dot.y.toFixed(1));
        el.setAttribute("opacity", (ramp * (i ? 0.6 : 0.85)).toFixed(3));
      }

      // The mark brightens as signals land, and again under the cursor.
      const near = live
        ? Math.max(0, 1 - Math.hypot(sx - CX, sy - CY) / 190) * influence
        : 0;
      glowRef.current?.setAttribute(
        "opacity",
        (ramp * (0.45 + markLift * 0.45 + near * 0.3)).toFixed(3),
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
  }, [reduced, compact, pointer, taps]);

  /** One expert. The same figure every time, deliberately: the people in the
   * network are not illustrated individually and the graphic should not
   * pretend otherwise. Inlined rather than a <use> of one definition, because
   * a shadow tree has to be re-resolved every time the transform above it is
   * written, which is sixty times a second. */
  const person = (key: string, dim = false) => (
    <g key={key}>
      <circle r={R} fill={`url(#${id("glass")})`} />
      <circle
        r={R}
        fill="none"
        stroke="#4a9dff"
        strokeOpacity={dim ? 0.34 : 0.5}
        strokeWidth="1"
      />
      <circle
        cx="0"
        cy="-3.4"
        r="3.5"
        fill="#cfe6ff"
        fillOpacity={dim ? 0.7 : 0.94}
      />
      <path
        d="M -6.6 6.6 A 6.6 6.6 0 0 1 6.6 6.6"
        stroke="#cfe6ff"
        strokeOpacity={dim ? 0.7 : 0.94}
        strokeWidth="2.1"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );

  return (
    <svg
      ref={svgRef}
      viewBox={
        compact
          ? `${MARK_X - 9} ${MARK_Y - 9} ${MARK_W * MARK_SCALE + 18} ${MARK_H * MARK_SCALE + 18}`
          : `0 0 ${FIELD_W} ${FIELD_H}`
      }
      fill="none"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        {/* Deeper than the logo's flat azure. At hero size a flat bright blue
            competes with the headline; this keeps the mark unmistakably the
            brand without making it the loudest thing on the screen. Shallow on
            purpose: a strong diagonal gradient has a bright end of its own,
            and the eye reads that as the highlight instead of the one that is
            actually travelling. */}
        <linearGradient id={id("mark")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3583e4" />
          <stop offset="55%" stopColor="#2670d2" />
          <stop offset="100%" stopColor="#1a58ad" />
        </linearGradient>
        <radialGradient id={id("halo")}>
          <stop offset="0%" stopColor="#4a9dff" stopOpacity="0.5" />
          <stop offset="55%" stopColor="#2e7fdb" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#2e7fdb" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("glass")} cx="38%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#24395c" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0c1424" stopOpacity="0.95" />
        </radialGradient>
        <radialGradient id={id("flow")}>
          <stop offset="0%" stopColor="#dcefff" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#7cc0ff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#4a9dff" stopOpacity="0" />
        </radialGradient>
        {/* The mark as a stencil, so the travelling light is only ever seen
            inside the logo. */}
        <clipPath id={id("inside")} clipRule="evenodd">
          <path
            d={MARK_PATH}
            clipRule="evenodd"
            transform={`translate(${MARK_X} ${MARK_Y}) scale(${MARK_SCALE})`}
          />
        </clipPath>
      </defs>

      {/* The sense that this is a detail of something larger. */}
      <g className={compact ? "hidden" : "hidden lg:block"}>
        {DUST.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill="#8ec5ff"
            opacity={d.o}
          />
        ))}
      </g>

      {/* The glow the mark sits in. */}
      {!compact && (
      <ellipse
        ref={glowRef}
        cx={CX}
        cy={CY}
        rx={190}
        ry={140}
        fill={`url(#${id("halo")})`}
        opacity="0"
      />
      )}

      {/* Every link, under the mark so they run behind it rather than over it.

          Hidden below lg, with the people: down there the graphic sits behind
          the headline, and the mark alone reads as a watermark where a network
          of opaque discs would read as a collision. */}
      <g
        className={compact ? "hidden" : "hidden lg:block"}
        fill="none"
        strokeLinecap="round"
      >
        {/* ring to ring */}
        {PEERS.map((_, i) => (
          <path
            key={`p${i}`}
            ref={(el) => {
              peerRefs.current[i] = el;
            }}
            stroke="#6fb4ff"
            strokeWidth="0.7"
            opacity="0"
          />
        ))}
        {/* the outer degree, to whoever introduced them */}
        {SATELLITES.map((_, i) => (
          <path
            key={`s${i}`}
            ref={(el) => {
              satLinkRefs.current[i] = el;
            }}
            stroke="#6fb4ff"
            strokeWidth="0.6"
            strokeDasharray="2 3"
            opacity="0"
          />
        ))}
        {/* ring to mark */}
        {RING.map((_, i) => (
          <path
            key={`r${i}`}
            ref={(el) => {
              spokeRefs.current[i] = el;
            }}
            pathLength="1"
            stroke="#7cbcff"
            strokeWidth="0.95"
            opacity="0"
          />
        ))}
        {/* whoever was clicked into being */}
        {Array.from({ length: GUESTS }, (_, i) => (
          <path
            key={`g${i}`}
            ref={(el) => {
              guestLinkRefs.current[i] = el;
            }}
            pathLength="1"
            stroke="#a8d4ff"
            strokeWidth="1.05"
            opacity="0"
          />
        ))}
      </g>

      {/* Signals, and the bloom where each one lands. */}
      <g className={compact ? "hidden" : "hidden lg:block"}>
        {RING.map((b, i) => (
          <g key={`sg${i}`}>
            <circle
              ref={(el) => {
                pulseRefs.current[i] = el;
              }}
              r="2.6"
              fill="#e2f0ff"
              opacity="0"
            />
            <circle
              ref={(el) => {
                landRefs.current[i] = el;
              }}
              cx={b.ax}
              cy={b.ay}
              r="4"
              fill={`url(#${id("halo")})`}
              opacity="0"
            />
            <circle
              ref={(el) => {
                haloRefs.current[i] = el;
              }}
              fill="none"
              stroke="#8ec5ff"
              strokeWidth="0.8"
              opacity="0"
            />
          </g>
        ))}
        {PEERS.map((_, i) => (
          <circle
            key={`pd${i}`}
            ref={(el) => {
              peerDotRefs.current[i] = el;
            }}
            r="1.9"
            fill="#cfe6ff"
            opacity="0"
          />
        ))}
        {Array.from({ length: GUESTS }, (_, i) => (
          <circle
            key={`gh${i}`}
            ref={(el) => {
              guestHaloRefs.current[i] = el;
            }}
            fill="none"
            stroke="#a8d4ff"
            strokeWidth="0.9"
            opacity="0"
          />
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
          <path d={MARK_PATH} fill={`url(#${id("mark")})`} fillRule="evenodd" />
        </g>
        {/* and the light running round it */}
        <g clipPath={`url(#${id("inside")})`}>
          {[0, 1].map((i) => (
            <circle
              key={i}
              ref={(el) => {
                flowRefs.current[i] = el;
              }}
              r={i ? 52 : 68}
              fill={`url(#${id("flow")})`}
              opacity="0"
            />
          ))}
        </g>
      </motion.g>

      {/* The people. */}
      <g className={compact ? "hidden" : "hidden lg:block"}>
        {SATELLITES.map((s, i) => (
          <g
            key={`sat${i}`}
            data-bubble=""
            ref={(el) => {
              satRefs.current[i] = el;
            }}
            transform={`translate(${s.x} ${s.y}) scale(${s.size})`}
            opacity="0"
          >
            {person(`sf${i}`, true)}
          </g>
        ))}
        {RING.map((b, i) => (
          <g
            key={`ring${i}`}
            data-bubble=""
            ref={(el) => {
              ringRefs.current[i] = el;
            }}
            transform={`translate(${b.x} ${b.y})`}
            opacity="0"
          >
            {person(`rf${i}`)}
          </g>
        ))}
        {Array.from({ length: GUESTS }, (_, i) => (
          <g
            key={`gu${i}`}
            ref={(el) => {
              guestRefs.current[i] = el;
            }}
            opacity="0"
          >
            {person(`gf${i}`)}
          </g>
        ))}
      </g>
    </svg>
  );
}
