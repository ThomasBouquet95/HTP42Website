"use client";

import { useEffect, useRef, type RefObject } from "react";

/** Where the cursor is, in client coordinates, and whether it is on the
 * tracked element at all. Read inside an animation frame, never rendered. */
export type PointerState = { x: number; y: number; active: boolean };

/** The last click, and a running count of them. A consumer keeps the count it
 * has already acted on, which is how it tells a new click from the same one
 * seen again on the next frame. */
export type TapState = { x: number; y: number; n: number };

/**
 * Tracks the cursor over one element and publishes it two ways:
 *
 *  - as `--pointer-x` / `--pointer-y` / `--pointer-on` custom properties, plus
 *    `--pointer-w` for the tracked element's width, so CSS layers can position
 *    a light and match the page's column pitch with no JavaScript of their
 *    own, and
 *  - as a ref, for canvas or SVG work that needs the value inside its own
 *    animation frame.
 *
 * Neither path re-renders React. A pointer move is sixty events a second; if it
 * went through state the whole hero would re-render sixty times a second.
 *
 * The custom properties go on `styleRef` rather than on the tracked element,
 * because custom properties inherit: setting one on a section recalculates the
 * style of everything inside it, sixty times a second. Point `styleRef` at a
 * small decorative wrapper and the recalculation is confined to it.
 *
 * It attaches nothing at all on touch devices and under reduced motion: there
 * is no hover there to respond to, and the listener would only cost battery.
 */
export function usePointerField<
  T extends HTMLElement,
  S extends HTMLElement = HTMLDivElement,
>(
  enabled = true,
): {
  ref: RefObject<T | null>;
  styleRef: RefObject<S | null>;
  pointer: RefObject<PointerState>;
  taps: RefObject<TapState>;
} {
  const ref = useRef<T>(null);
  const styleRef = useRef<S>(null);
  const pointer = useRef<PointerState>({ x: 0, y: 0, active: false });
  const taps = useRef<TapState>({ x: 0, y: 0, n: 0 });

  useEffect(() => {
    const el = ref.current;
    const target = styleRef.current ?? ref.current;
    if (!el || !target || !enabled) return;
    // The light that follows the cursor needs a cursor. A tap does not, so the
    // click listener below is attached either way: this check only gates the
    // move tracking.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let frame = 0;
    let x = 0;
    let y = 0;
    let on = false;

    const measure = () => {
      target.style.setProperty("--pointer-w", `${el.clientWidth}px`);
    };
    measure();
    window.addEventListener("resize", measure);

    // Writing styles is the expensive half, so it happens once per frame at
    // most rather than once per event.
    const write = () => {
      frame = 0;
      target.style.setProperty("--pointer-x", `${x.toFixed(1)}px`);
      target.style.setProperty("--pointer-y", `${y.toFixed(1)}px`);
      target.style.setProperty("--pointer-on", on ? "1" : "0");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const box = el.getBoundingClientRect();
      x = e.clientX - box.left;
      y = e.clientY - box.top;
      on = true;
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
      pointer.current.active = true;
      schedule();
    };
    const onLeave = () => {
      on = false;
      pointer.current.active = false;
      schedule();
    };

    // A click is a person joining the network. Clicks that were aimed at
    // something — a button, a link, the text you were selecting — are not.
    const onClick = (e: MouseEvent) => {
      const hit = e.target as Element | null;
      if (hit?.closest("a, button, input, textarea, select, [role='button']")) return;
      if ((window.getSelection()?.toString().length ?? 0) > 0) return;
      taps.current.x = e.clientX;
      taps.current.y = e.clientY;
      taps.current.n += 1;
    };

    el.addEventListener("click", onClick);
    if (fine) {
      el.addEventListener("pointermove", onMove, { passive: true });
      el.addEventListener("pointerleave", onLeave);
      // A pointer can also leave by the window losing focus, which fires no
      // pointerleave on some platforms.
      window.addEventListener("blur", onLeave);
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("click", onClick);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [enabled]);

  return { ref, styleRef, pointer, taps };
}
