"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Field } from "@/content/registry";
import { signOut } from "@/app/admin/actions";

/**
 * The content editor: the real site in a preview, with its text open for
 * editing, and an export of everything that changed.
 *
 * Nothing publishes from here. Edits are a draft held in this browser, and the
 * export is a file handed back to a developer who applies it. That keeps the
 * repository the single source of truth for the site's copy, and it means the
 * editor needs no database and no second environment variable.
 *
 * Fields are located in the preview by matching their exact text, once per
 * page load, which is why no component needed annotating for this to work. The
 * element holding each one is then tagged with its content path, so a click
 * resolves to an exact field rather than being guessed from text at click
 * time. That matters because the moment a reader clicks a card rather than the
 * sentence inside it, the element's text is several fields concatenated and
 * matches nothing.
 *
 * The consequence of matching by text is that it is best effort: a sentence
 * broken across an italic accent is not found in the page. Those fields stay
 * fully editable from the panel search, they just do not highlight, and the
 * export is keyed by content path either way, so what a developer receives is
 * never ambiguous.
 */

const DRAFT_KEY = "htp42-content-draft-v1";

/** Marks the element in the preview that holds a given field. */
const PATH_ATTR = "data-htp42-path";
/** Marks the one currently selected, so it is obvious which is which. */
const ACTIVE_ATTR = "data-htp42-active";

const PAGES = [
  { label: "Home", path: "/" },
  { label: "Expertise", path: "/expertise" },
  { label: "The Network", path: "/network" },
  { label: "Client Impact", path: "/impact" },
  { label: "Perspectives", path: "/perspectives" },
  { label: "Contact", path: "/contact" },
];

const WIDTHS = [
  { label: "Desktop", value: 1440 },
  { label: "Tablet", value: 820 },
  { label: "Phone", value: 390 },
];

type Draft = Record<string, string>;

export function Editor({ fields }: { fields: Field[] }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [draft, setDraft] = useState<Draft>({});
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(PAGES[0].path);
  const [width, setWidth] = useState(WIDTHS[0].value);
  const [query, setQuery] = useState("");
  const [onPage, setOnPage] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string | null>(null);
  const [focusTick, setFocusTick] = useState(0);
  const [miss, setMiss] = useState(false);
  const [copied, setCopied] = useState(false);

  const byPath = useMemo(
    () => new Map(fields.map((f) => [f.path, f])),
    [fields],
  );

  /** The text currently shown for a field: the draft if edited, else original. */
  const current = useCallback(
    (path: string) => draft[path] ?? String(byPath.get(path)?.value ?? ""),
    [draft, byPath],
  );

  // Restore the draft before the first preview scan, so reopening the editor
  // shows the work in progress rather than the published text.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (raw) setDraft(JSON.parse(raw));
    } catch {
      // A blocked or full localStorage should not stop the editor opening.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // Nothing to do: the draft simply will not survive a refresh.
    }
  }, [draft, loaded]);

  const changes = useMemo(
    () =>
      fields
        .filter((f) => draft[f.path] !== undefined)
        .filter((f) => draft[f.path] !== String(f.value)),
    [fields, draft],
  );

  /** Every text node in the preview, so text can be found and replaced. */
  const textNodes = useCallback((): Text[] => {
    const doc = frame.current?.contentDocument;
    if (!doc?.body) return [];
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
    const out: Text[] = [];
    let node = walker.nextNode();
    while (node) {
      const text = node.nodeValue ?? "";
      if (text.trim().length > 1) out.push(node as Text);
      node = walker.nextNode();
    }
    return out;
  }, []);

  /**
   * Where each field's text sits in the preview.
   *
   * Resolved once per page load and then reused. Searching by text on every
   * keystroke does not work: after the first character the node holds neither
   * the original nor the finished new value, so the field stops being found,
   * drops out of the panel, and the input you are typing into unmounts.
   *
   * `template` is the node's full original text, so a field that is only part
   * of a longer run can be rewritten from the original every time rather than
   * from whatever the last keystroke left behind.
   */
  const anchors = useRef<
    Map<string, { node: Text; template: string; original: string }[]>
  >(new Map());

  /** How many elements we tagged last scan, and a guard so our own writes to
   *  the preview do not look like the page changing underneath us. */
  const tagCount = useRef(0);
  const suppress = useRef(false);

  /** Write the draft into the nodes already resolved for this page. */
  const applyDraft = useCallback(() => {
    suppress.current = true;
    for (const [path, list] of anchors.current) {
      const shown = current(path);
      for (const { node, template, original } of list) {
        const next =
          template === original ? shown : template.replace(original, shown);
        if (node.nodeValue !== next) node.nodeValue = next;
      }
    }
    window.setTimeout(() => {
      suppress.current = false;
    }, 0);
  }, [current]);

  /** Resolve every field to its nodes in the freshly loaded preview. */
  const scanPreview = useCallback(() => {
    const nodes = textNodes();
    if (nodes.length === 0) return;
    suppress.current = true;

    const exact = new Map<string, Text[]>();
    for (const node of nodes) {
      const key = (node.nodeValue ?? "").trim();
      const list = exact.get(key);
      if (list) list.push(node);
      else exact.set(key, [node]);
    }
    const corpus = nodes.map((n) => n.nodeValue).join(" ");

    const found = new Map<
      string,
      { node: Text; template: string; original: string }[]
    >();
    for (const field of fields) {
      const original = String(field.value);
      if (original.length < 2) continue;

      // The page may already be showing a draft value, so accept either.
      const shown = current(field.path);
      const hit = exact.get(original) ?? exact.get(shown);
      if (hit) {
        found.set(
          field.path,
          hit.map((node) => ({
            node,
            template: node.nodeValue ?? "",
            original: (node.nodeValue ?? "").trim(),
          })),
        );
        continue;
      }
      // Part of a longer run of text.
      if (original.length >= 12 && corpus.includes(original)) {
        const node = nodes.find((n) => n.nodeValue?.includes(original));
        if (node) {
          found.set(field.path, [
            { node, template: node.nodeValue ?? "", original },
          ]);
        }
      }
    }

    // Tag the element that holds each field, so a click resolves to an exact
    // path instead of being matched by its text at click time. Text matching
    // fails the moment a reader clicks a card rather than the sentence inside
    // it, because the element's text is then several fields concatenated.
    for (const [path, list] of found) {
      for (const { node } of list) {
        const el = node.parentElement;
        if (el && !el.hasAttribute(PATH_ATTR)) el.setAttribute(PATH_ATTR, path);
      }
    }

    anchors.current = found;
    tagCount.current =
      frame.current?.contentDocument?.querySelectorAll(`[${PATH_ATTR}]`)
        .length ?? 0;
    setOnPage(new Set(found.keys()));
    applyDraft();
    // Release on the next task, after the mutations we just made have been
    // delivered to the observer.
    window.setTimeout(() => {
      suppress.current = false;
    }, 0);
  }, [fields, current, textNodes, applyDraft]);

  /** Clicking text in the preview jumps to the field that produced it. */
  const wirePreview = useCallback(() => {
    const doc = frame.current?.contentDocument as
      | (Document & { __htp42Wired?: boolean })
      | undefined;
    if (!doc || doc.__htp42Wired) return;
    doc.__htp42Wired = true;

    // Make it visible which text can be edited. Without this the preview looks
    // like an ordinary page and there is nothing to suggest clicking it does
    // anything.
    const style = doc.createElement("style");
    style.textContent = `
      [${PATH_ATTR}] { cursor: text; }
      [${PATH_ATTR}]:hover {
        outline: 2px solid rgba(20, 80, 200, 0.45);
        outline-offset: 3px;
        border-radius: 2px;
        background-color: rgba(20, 80, 200, 0.06);
      }
      [${ACTIVE_ATTR}] {
        outline: 2px solid rgba(20, 80, 200, 0.9) !important;
        outline-offset: 3px;
        border-radius: 2px;
        background-color: rgba(20, 80, 200, 0.1) !important;
      }
    `;
    doc.head.appendChild(style);

    doc.addEventListener(
      "click",
      (event) => {
        const target = event.target as HTMLElement | null;
        if (!target) return;
        // Resolve only by tag, never by guessing from text. Clicking the
        // padding of a card used to fall through to a fuzzy text match and
        // land on whichever field happened to appear first inside it, which
        // is worse than doing nothing.
        const tagged = target.closest?.(`[${PATH_ATTR}]`);
        let path = tagged?.getAttribute(PATH_ATTR) ?? null;
        if (!path) {
          // A container holding exactly one field is unambiguous, so allow it.
          const inside = target.querySelectorAll?.(`[${PATH_ATTR}]`);
          if (inside?.length === 1) {
            path = inside[0].getAttribute(PATH_ATTR);
          }
        }

        if (!path) {
          // A dead click reads as a broken feature, so say what happened.
          if (target.textContent?.trim()) {
            setMiss(true);
            window.setTimeout(() => setMiss(false), 2600);
          }
          return;
        }
        // Only swallow the click when it resolved to a field, so links and
        // buttons elsewhere in the preview still behave normally.
        event.preventDefault();
        event.stopPropagation();
        setQuery("");
        setSelected(path);
        setFocusTick((n) => n + 1);
      },
      true,
    );
  }, []);

  /** Kept in a ref so the load listener always runs the latest scan. */
  const onLoadRef = useRef<() => void>(() => {});
  onLoadRef.current = () => {
    wirePreview();
    scanPreview();
  };

  /**
   * Wire and sync the preview. A native load listener rather than React's
   * onLoad: the iframe often finishes loading before hydration attaches the
   * prop, so onLoad is missed and nothing is ever wired. This also covers the
   * already loaded case and any navigation the reader does inside the preview.
   */
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    /**
     * Nothing may touch the previewed page until its own React has hydrated.
     * Tagging an element beforehand puts an attribute in the tree that was not
     * in the server HTML, which React reports as a hydration mismatch and may
     * repair by throwing the subtree away, taking the tag with it.
     *
     * Rather than guess at how long hydration takes, wait for the page to go
     * quiet. Hydration is itself a burst of DOM changes, so a short spell with
     * none means it has finished. The same observer then keeps watch: the page
     * re-renders parts of itself as you scroll, and if our tags are ever lost
     * we put them back. Only childList is observed, so our own attribute and
     * text writes do not wake it.
     */
    let settled = false;
    let timer = 0;

    const afterQuiet = () => {
      const doc = el.contentDocument;
      if (!doc) return;
      if (!settled) {
        settled = true;
        onLoadRef.current();
        return;
      }
      const tagged = doc.querySelectorAll(`[${PATH_ATTR}]`).length;
      if (tagged < tagCount.current) onLoadRef.current();
    };

    const nudge = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(afterQuiet, 350);
    };

    const observer = new MutationObserver(() => {
      if (suppress.current) return;
      nudge();
    });

    const start = () => {
      settled = false;
      const body = el.contentDocument?.body;
      if (body) observer.observe(body, { childList: true, subtree: true });
      // A page that never mutates would otherwise never be scanned.
      nudge();
    };

    el.addEventListener("load", start);
    if (el.contentDocument?.readyState !== "loading") start();

    return () => {
      el.removeEventListener("load", start);
      observer.disconnect();
      window.clearTimeout(timer);
    };
    // Only the page matters here. Depending on the callbacks would re-attach
    // and re-scan on every keystroke, because they close over the draft.
  }, [page]);

  // Every keystroke only writes into nodes already resolved, so typing stays
  // cheap and the panel does not re-order underneath the cursor.
  useEffect(() => {
    if (loaded) applyDraft();
  }, [draft, loaded, applyDraft]);

  // Selecting from the preview brings the matching field into view and focuses
  // it. The tick is what distinguishes "the reader clicked the page" from
  // "the reader is already typing in this field", so typing is never
  // interrupted by a scroll.
  useEffect(() => {
    if (!selected || focusTick === 0) return;
    const el = document.getElementById(`field-${selected}`);
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
    (el as HTMLInputElement | HTMLTextAreaElement | null)?.focus();
  }, [selected, focusTick]);

  // Mark the selected element in the preview, and bring it into view when the
  // selection came from the panel rather than from the page.
  useEffect(() => {
    const doc = frame.current?.contentDocument;
    if (!doc) return;
    doc
      .querySelectorAll(`[${ACTIVE_ATTR}]`)
      .forEach((el) => el.removeAttribute(ACTIVE_ATTR));
    if (!selected) return;
    const el = doc.querySelector(`[${PATH_ATTR}="${selected}"]`);
    if (!el) return;
    el.setAttribute(ACTIVE_ATTR, "true");
    const rect = el.getBoundingClientRect();
    const view = doc.documentElement.clientHeight;
    if (rect.top < 0 || rect.bottom > view) {
      el.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [selected, onPage]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = q ? fields : fields.filter((f) => onPage.has(f.path));
    if (!q) return pool;
    return pool.filter(
      (f) =>
        current(f.path).toLowerCase().includes(q) ||
        f.label.toLowerCase().includes(q) ||
        f.context.toLowerCase().includes(q),
    );
  }, [fields, query, onPage, current]);

  const groups = useMemo(() => {
    const map = new Map<string, Field[]>();
    for (const field of visible) {
      const list = map.get(field.context);
      if (list) list.push(field);
      else map.set(field.context, [field]);
    }
    return [...map.entries()];
  }, [visible]);

  const exportPayload = useMemo(
    () => ({
      site: "htp42.com",
      generatedAt: new Date().toISOString(),
      note: "Text changes from the HTP42 content editor. Apply each change at the given content path.",
      changeCount: changes.length,
      changes: changes.map((f) => ({
        path: f.path,
        where: `${f.context} - ${f.label}`,
        before: String(f.value),
        after: draft[f.path],
      })),
    }),
    [changes, draft],
  );

  const download = () => {
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `htp42-text-changes-${stamp}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(exportPayload, null, 2),
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const discard = () => {
    if (!window.confirm("Discard every change in this draft?")) return;
    setDraft({});
  };

  return (
    <div className="flex h-dvh flex-col">
      <header className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-ink/12 bg-paper px-4 py-3">
        <div className="flex items-baseline gap-2.5">
          <span className="eyebrow text-ink-300">HTP42</span>
          <span className="text-sm font-medium">Content editor</span>
        </div>

        <nav className="flex flex-wrap items-center gap-1" aria-label="Pages">
          {PAGES.map((p) => (
            <button
              key={p.path}
              type="button"
              onClick={() => setPage(p.path)}
              aria-current={page === p.path ? "page" : undefined}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                page === p.path
                  ? "bg-ink text-white"
                  : "text-ink-400 hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {p.label}
            </button>
          ))}
        </nav>

        <div
          className="flex items-center gap-1"
          role="group"
          aria-label="Preview width"
        >
          {WIDTHS.map((w) => (
            <button
              key={w.value}
              type="button"
              onClick={() => setWidth(w.value)}
              aria-pressed={width === w.value}
              className={`rounded-full px-2.5 py-1.5 text-xs transition-colors ${
                width === w.value
                  ? "bg-brand-soft text-brand"
                  : "text-ink-300 hover:text-ink"
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <span className="tnum text-xs text-ink-400">
            {changes.length === 0
              ? "No changes"
              : `${changes.length} change${changes.length === 1 ? "" : "s"}`}
          </span>
          {changes.length > 0 ? (
            <>
              <button
                type="button"
                onClick={discard}
                className="text-xs font-medium text-ink-400 hover:text-ink"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={copy}
                className="rounded-full border border-ink/20 px-3.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-brand hover:text-brand"
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                type="button"
                onClick={download}
                className="rounded-full bg-ink px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand"
              >
                Export
              </button>
            </>
          ) : null}
          <form action={signOut}>
            <button
              type="submit"
              className="text-xs font-medium text-ink-300 hover:text-ink"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <div className="min-h-0 flex-1 overflow-auto bg-ink/5 p-4">
          <div
            className="mx-auto h-full bg-paper shadow-sm"
            style={{ maxWidth: width }}
          >
            <iframe
              ref={frame}
              src={page}
              title="Site preview"
              className="h-full w-full border-0"
            />
          </div>
        </div>

        <aside className="flex min-h-0 w-full flex-col border-t border-ink/12 bg-paper lg:w-[26rem] lg:border-t-0 lg:border-l">
          <div className="border-b border-ink/10 px-4 py-3">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search all text on the site"
              aria-label="Search all text"
              className="w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/25"
            />
            <p className="mt-2 text-xs text-ink-400">
              {miss ? (
                <span className="text-amber-700">
                  That text is not editable yet. Hover the preview to see what
                  is.
                </span>
              ) : query ? (
                `${visible.length} of ${fields.length} fields`
              ) : (
                `${visible.length} editable on this page. Click any highlighted text to edit it.`
              )}
            </p>
          </div>

          <div className="min-h-0 flex-1 overflow-auto px-4 pb-10">
            {groups.map(([context, list]) => (
              <section key={context} className="mt-5">
                <h2 className="eyebrow sticky top-0 bg-paper py-2 text-ink-300">
                  {context}
                </h2>
                {list.map((field) => {
                  const value = current(field.path);
                  const isChanged = value !== String(field.value);
                  return (
                    <div
                      key={field.path}
                      className="border-t border-ink/[0.07] py-3.5"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <label
                          htmlFor={`field-${field.path}`}
                          className="text-xs font-medium text-ink"
                        >
                          {field.label}
                          {isChanged ? (
                            <span className="ml-2 font-normal text-brand">
                              changed
                            </span>
                          ) : null}
                        </label>
                        {isChanged ? (
                          <button
                            type="button"
                            onClick={() =>
                              setDraft((d) => {
                                const next = { ...d };
                                delete next[field.path];
                                return next;
                              })
                            }
                            className="shrink-0 text-xs text-ink-300 hover:text-brand"
                          >
                            Revert
                          </button>
                        ) : null}
                      </div>

                      {field.kind === "textarea" ? (
                        <textarea
                          id={`field-${field.path}`}
                          value={value}
                          onFocus={() => setSelected(field.path)}
                          rows={Math.min(9, Math.ceil(value.length / 44) + 1)}
                          onChange={(event) =>
                            setDraft((d) => ({
                              ...d,
                              [field.path]: event.target.value,
                            }))
                          }
                          className={`mt-2 w-full rounded-md border bg-paper px-3 py-2 text-sm leading-relaxed outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/25 ${
                            isChanged ? "border-brand/50" : "border-ink/15"
                          }`}
                        />
                      ) : (
                        <input
                          id={`field-${field.path}`}
                          type={field.kind === "number" ? "number" : "text"}
                          value={value}
                          onFocus={() => setSelected(field.path)}
                          onChange={(event) =>
                            setDraft((d) => ({
                              ...d,
                              [field.path]: event.target.value,
                            }))
                          }
                          className={`mt-2 w-full rounded-md border bg-paper px-3 py-2 text-sm outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/25 ${
                            isChanged ? "border-brand/50" : "border-ink/15"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </section>
            ))}

            {groups.length === 0 ? (
              <p className="mt-6 text-sm text-ink-400">
                {query
                  ? "Nothing matches that search."
                  : "No editable text found on this page yet. Give the preview a moment, or search for the words you want to change."}
              </p>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}
