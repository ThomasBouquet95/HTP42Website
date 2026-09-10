"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { nav, site } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 380,
    damping: 40,
    restDelta: 0.0005,
  });

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Close the panel on navigation, and lock the page behind it.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Transparent over the dark hero; frosted paper once the page moves.
  const light = scrolled;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
          light
            ? "border-b border-white/10 bg-ink/70 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell">
          <div className="flex h-16 items-center justify-between md:h-20">
            <Logo onDark />

            <nav
              aria-label="Primary"
              className="hidden items-center gap-8 lg:flex"
            >
              {nav.map((item) => {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`link-nav text-[0.875rem] font-medium tracking-[-0.008em] transition-colors duration-400 ${
                      active
                        ? "text-azure"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="hidden h-10 items-center rounded-full bg-white px-5 text-[0.8125rem] font-medium tracking-[-0.008em] text-ink transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:bg-azure hover:text-white sm:inline-flex"
              >
                Start a conversation
              </Link>

              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className="inline-flex size-10 items-center justify-center rounded-full text-white transition-colors duration-400 hover:bg-white/10 lg:hidden"
              >
                <Menu className="size-5" strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </div>

        {/* Reading progress — a single brand hairline along the header edge. */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-azure"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-ink lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="shell flex h-16 items-center justify-between md:h-20">
              <Logo onDark />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
              >
                <X className="size-5" strokeWidth={1.6} />
              </button>
            </div>

            <div className="shell mt-10">
              <nav aria-label="Mobile" className="flex flex-col">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.08 + i * 0.055,
                      ease: EASE,
                    }}
                    className="border-b border-white/10"
                  >
                    <Link
                      href={item.href}
                      className="flex items-baseline gap-4 py-5 text-[1.75rem] font-medium tracking-[-0.028em] text-white"
                    >
                      <span className="eyebrow tnum text-white/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.42, ease: EASE }}
                className="mt-12"
              >
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-[1.0625rem] font-medium text-azure"
                >
                  {site.contact.email}
                </a>
                <p className="mt-2 text-sm text-white/60">
                  {site.contact.hq}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
