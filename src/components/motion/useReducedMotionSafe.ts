"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * `prefers-reduced-motion`, but safe to branch your markup on.
 *
 * Framer's own hook answers truthfully on the client's very first render and
 * falsely on the server, where there is no such preference to read. Any
 * component that renders different markup for the two cases therefore hands
 * React a tree that does not match the HTML it is hydrating, and React's
 * recovery from that is to keep the server's DOM node. The node keeps the
 * server's inline styles with it, which is how a reduced motion visitor ended
 * up with a headline whose every line was still parked at translateY(105%),
 * inside a mask, invisible. The whole hero was blank.
 *
 * Worse, it was silent: the mismatch only bites when nothing else in the tree
 * mismatches first, because one thrown hydration error makes React re-render
 * the root from scratch and quietly launders every stale style away with it.
 *
 * So: report no preference until after mount, which is what the server said,
 * and let the real answer arrive as an ordinary re-render that React applies
 * properly. The cost is one frame of animated markup for a visitor who asked
 * for none. The alternative was a blank page.
 */
export function useReducedMotionSafe(): boolean {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && reduced === true;
}
