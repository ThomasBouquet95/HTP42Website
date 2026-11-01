"use client";

import { useEffect, useState } from "react";

/**
 * Which section of the one page is currently being read, for the navigation to
 * mark. Takes the ids in document order.
 *
 * Not an IntersectionObserver vote: with sections of wildly different heights
 * the tall ones win every ratio test, and the short one you are actually
 * looking at never lights up. This asks the simpler question instead — which
 * section has most recently passed under the header — which is what a reader
 * means by "where am I".
 *
 * Returns null above the first section, so the hero carries no highlight.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (ids.length === 0) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      // A little below the header, so a heading counts as reached when it
      // arrives rather than when it leaves.
      const line = 140;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = id;
      }
      // The foot of the page can never scroll the last section past the line,
      // so claim it once there is nothing left to scroll.
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        const last = [...ids].reverse().find((id) => document.getElementById(id));
        if (last) current = last;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids]);

  return active;
}
